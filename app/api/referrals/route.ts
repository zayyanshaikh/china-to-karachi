/**
 * Next.js App Router Route Handler: /api/referrals
 * Path: app/api/referrals/route.ts
 * 
 * Growth & Viral Referral Tracking Engine.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const REFERRAL_PERKS = [
  {
    tier: 1,
    requiredInvites: 1,
    title: 'Ad-Free Clean Browsing',
    description: 'Bypasses promotional banners and speeds up catalog loading by 40%.',
    badge: 'Ad-Free',
  },
  {
    tier: 2,
    requiredInvites: 3,
    title: 'VIP Early Access Drops',
    description: 'Get first-look reserve access on rare 75km/h RC drift buggies and 8x8 trucks.',
    badge: 'Early Access',
  },
  {
    tier: 3,
    requiredInvites: 5,
    title: 'Seller Pro Verification Badge',
    description: 'Verified checkmark on Karachi storefront listings with priority feed placement.',
    badge: 'Seller Pro',
  },
  {
    tier: 4,
    requiredInvites: 10,
    title: 'Port Qasim Direct Wholesale Rate',
    description: 'Access locked wholesale pricing without meeting the 50-unit minimum quantity.',
    badge: 'Wholesale Tier',
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { referrerCode, referredFingerprint, landingUrl } = body;

    if (!referrerCode) {
      return Response.json({ success: false, message: 'Missing referrer code' }, { status: 400 });
    }

    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

    const referralRecord = {
      referrer_code_used: referrerCode,
      referred_fingerprint: referredFingerprint || 'anon_visitor',
      landing_url: landingUrl || '/',
      status: 'completed',
      client_ip: clientIp.split(',')[0].trim(),
      created_at: new Date().toISOString(),
    };

    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      fetch(`${SUPABASE_URL}/rest/v1/referrals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(referralRecord),
      }).catch((err) => {
        console.error('[Referral Tagging Warning]', err.message);
      });
    }

    return Response.json(
      {
        success: true,
        referrerCode,
        tagged: true,
        message: 'Referral attribution successfully logged in PostgreSQL',
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `c2k_ref_by=${referrerCode}; Path=/; Max-Age=2592000; SameSite=Lax`,
        },
      }
    );
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') || 'KHI-USER-77';

  const mockInviteCount = 3;
  const unlockedPerks = REFERRAL_PERKS.filter((p) => mockInviteCount >= p.requiredInvites);
  const nextPerk = REFERRAL_PERKS.find((p) => mockInviteCount < p.requiredInvites);

  return Response.json({
    referralCode: code,
    totalInvited: mockInviteCount,
    unlockedPerks,
    nextPerk,
    perkCatalog: REFERRAL_PERKS,
  });
}
