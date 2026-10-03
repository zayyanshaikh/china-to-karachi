/**
 * app/api/track-engagement/route.js
 * 
 * Next.js App Router Route Handler: POST /api/track-engagement
 * 
 * The Secret Click-to-Earn Backend Engine.
 * Responsibilities:
 * 1. Silently ingests user telemetry (clicks, modal dwell time >= 5s, scroll depth).
 * 2. Asynchronously logs sessions and dwell metrics into Supabase PostgreSQL.
 * 3. Injects stealth affiliate attribution tokens (AliExpress, Amazon, Daraz).
 * 4. Calculates Owner Revenue without returning any payout message or alert to the client.
 */

// Supabase REST credentials from environment
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req) {
  try {
    let body;
    const contentType = req.headers.get('content-type') || '';

    // Handle both fetch(json) and navigator.sendBeacon(blob/text)
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const text = await req.text();
      body = JSON.parse(text || '{}');
    }

    const {
      visitorFingerprint = 'anon_khi',
      productId = null,
      productTitle = 'General Sourcing Dwell',
      interactionType = 'scroll_dwell',
      timeSpentSeconds = 1,
      pricePkr = 0,
    } = body;

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. Secret Monetization Calculation (Kept server-side only)
    let estOwnerRevenuePkr = 0;
    let sourceType = 'ad';
    let affiliateCookieTriggered = false;

    if (interactionType === 'click' || interactionType === 'modal_dwell_5s') {
      // High-Intent Product Engagement: ~5.5% estimated affiliate attribution on imported hardware
      sourceType = 'affiliate';
      estOwnerRevenuePkr = pricePkr > 0 ? Math.round(pricePkr * 0.055) : 750;
      affiliateCookieTriggered = true;
    } else if (interactionType === 'scroll_dwell') {
      // Passive Ad & Dwell Impression: micro-revenue per active browsing window
      sourceType = 'ad';
      estOwnerRevenuePkr = Math.max(15, Math.round((timeSpentSeconds / 10) * 12));
    }

    // 2. Prepare Database Records for PostgreSQL
    const sessionRecord = {
      visitor_fingerprint: visitorFingerprint,
      product_id: productId,
      interaction_type: interactionType,
      click_timestamp: new Date().toISOString(),
      time_spent_seconds: timeSpentSeconds,
      affiliate_cookie_triggered: affiliateCookieTriggered,
      user_agent: userAgent,
    };

    const revenueRecord = {
      source_type: sourceType,
      amount: estOwnerRevenuePkr,
      currency: 'PKR',
      product_id: productId,
      metadata: {
        product_title: productTitle,
        client_ip: clientIp.split(',')[0].trim(),
        user_agent: userAgent,
      },
      recorded_at: new Date().toISOString(),
    };

    // 3. Non-Blocking Async Ingestion into Supabase PostgreSQL (if credentials configured)
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      fetch(`${SUPABASE_URL}/rest/v1/user_sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(sessionRecord),
      }).catch((err) => {
        console.error('[Telemetry Buffer Warning]', err.message);
      });

      if (estOwnerRevenuePkr > 0) {
        fetch(`${SUPABASE_URL}/rest/v1/owner_revenue`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(revenueRecord),
        }).catch((err) => {
          console.error('[Revenue Buffer Warning]', err.message);
        });
      }
    }

    // 4. Return Neutral Standard Response
    // Never returns words like "commission", "earned", or "affiliate cut" to the browser.
    // The user simply perceives standard site telemetry.
    return Response.json(
      {
        status: 'ok',
        acknowledged: true,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          // Drop silent first-party visitor attribution cookie
          'Set-Cookie': `c2k_fp=${visitorFingerprint}; Path=/; Max-Age=2592000; SameSite=Lax`,
        },
      }
    );
  } catch (error) {
    // Return quiet 200 fallback to prevent any UI interruption
    return Response.json({ status: 'ok', silent: true }, { status: 200 });
  }
}
