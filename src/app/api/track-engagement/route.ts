/**
 * Next.js App Router (or Web-Standard Node.js) Route Handler: /api/track-engagement
 * 
 * Silent Click-to-Earn & Telemetry Backend Engine.
 * Logs dwell time and clicks directly into Supabase (PostgreSQL),
 * injects affiliate cookie tracking tokens, and calculates owner revenue.
 * 
 * Fully compatible with Next.js 13/14/15 App Router (`app/api/track-engagement/route.ts`).
 */

// Supabase REST endpoint configurations or direct pg query client
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface TrackRequestBody {
  visitorFingerprint: string;
  productId?: string;
  productTitle?: string;
  interactionType: 'click' | 'modal_dwell_5s' | 'scroll_dwell' | 'mouse_active';
  timeSpentSeconds?: number;
  scrollDepthPercentage?: number;
  affiliateLink?: string;
  pricePkr?: number;
}

export async function POST(req: Request) {
  try {
    let body: TrackRequestBody;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      // Handles navigator.sendBeacon raw text/blob
      const text = await req.text();
      body = JSON.parse(text);
    }

    const {
      visitorFingerprint,
      productId,
      productTitle,
      interactionType,
      timeSpentSeconds = 1,
      affiliateLink,
      pricePkr = 0,
    } = body;

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. Calculate Owner Monetization Revenue
    let estOwnerRevenuePkr = 0;
    let sourceType: 'affiliate' | 'ad' = 'ad';
    let affiliateUrlToReturn: string | null = null;
    let affiliateCookieTriggered = false;

    if (interactionType === 'click' || interactionType === 'modal_dwell_5s') {
      // High-Intent Product Engagement: 5.5% Estimated Affiliate Commission on imported hardware
      sourceType = 'affiliate';
      estOwnerRevenuePkr = pricePkr > 0 ? Math.round(pricePkr * 0.055) : 850;
      affiliateCookieTriggered = true;

      if (affiliateLink) {
        // Wrap with Owner Attribution Sub-ID / Click Tag
        const separator = affiliateLink.includes('?') ? '&' : '?';
        affiliateUrlToReturn = `${affiliateLink}${separator}sub_id=${visitorFingerprint}&ref=c2k_karachi_hub`;
      }
    } else if (interactionType === 'scroll_dwell') {
      // Passive Ad & Dwell Impression: eCPM micro-revenue (~15 to 45 PKR per active 25s window)
      sourceType = 'ad';
      estOwnerRevenuePkr = Math.max(15, Math.round((timeSpentSeconds / 10) * 12));
    }

    // 2. Prepare Database Records for Supabase
    const sessionRecord = {
      visitor_fingerprint: visitorFingerprint || 'anon_khi',
      product_id: productId || null,
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
      product_id: productId || null,
      metadata: {
        product_title: productTitle || 'General Catalog Dwell',
        client_ip: clientIp.split(',')[0].trim(),
        user_agent: userAgent,
      },
      recorded_at: new Date().toISOString(),
    };

    // 3. Non-Blocking Async Ingestion into Supabase PostgreSQL (if credentials configured)
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      // Asynchronously batch into Supabase REST without holding up the client response
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
        // Silently log on server, never bubble to client
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
          console.error('[Revenue Logging Warning]', err.message);
        });
      }
    }

    // 4. Return Stealth Response (Web-standard Response.json)
    // User sees zero "You earned money" notification.
    // If an affiliate URL was generated, the frontend can prefetch or route it invisibly.
    return Response.json(
      {
        success: true,
        affiliateUrl: affiliateUrlToReturn,
        logged: true,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          // Drop first-party session affiliate attribution cookie silently
          'Set-Cookie': `c2k_ref_att=${visitorFingerprint}; Path=/; Max-Age=2592000; SameSite=Lax`,
        },
      }
    );
  } catch (error: any) {
    // Return quiet 200 with fallback so the user interface never stutters or throws errors
    return Response.json({ success: false, silent: true }, { status: 200 });
  }
}
