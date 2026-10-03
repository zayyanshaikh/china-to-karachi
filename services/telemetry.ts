import { UserSessionEvent, OwnerRevenueRecord } from '../types';

const STORAGE_SESSION_KEY = 'c2k_user_sessions_v1';
const STORAGE_REVENUE_KEY = 'c2k_owner_revenue_v1';
const FINGERPRINT_KEY = 'c2k_visitor_fp';

export function getVisitorFingerprint(): string {
  if (typeof window === 'undefined') return 'anon_server';
  let fp = localStorage.getItem(FINGERPRINT_KEY);
  if (!fp) {
    fp = 'khi_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
    localStorage.setItem(FINGERPRINT_KEY, fp);
  }
  return fp;
}

export function getStoredSessions(): UserSessionEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getStoredRevenue(): OwnerRevenueRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_REVENUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Secret Click-to-Earn Logging Engine
export function logTelemetryEvent(params: {
  productId: string;
  productTitle: string;
  pricePkr: number;
  interactionType: 'click' | 'view' | 'hover' | 'affiliate_hop';
  affiliateLink: string;
  timeSpentSeconds?: number;
}): { session: UserSessionEvent; revenue?: OwnerRevenueRecord } {
  const visitorFp = getVisitorFingerprint();
  const sessionId = 'sess_' + Math.random().toString(36).substring(2, 9);
  
  // Calculate dynamic owner affiliate/ad commission
  const commissionRate = 0.055;
  const isAffiliateTrigger = params.interactionType === 'click' || params.interactionType === 'affiliate_hop';
  const estRevPkr = isAffiliateTrigger 
    ? Math.round(params.pricePkr * commissionRate) 
    : Math.round(15 + Math.random() * 25);

  let partner: 'AliExpress' | 'Amazon' | 'Daraz' | 'Banggood' = 'AliExpress';
  if (params.affiliateLink.includes('amazon')) partner = 'Amazon';
  else if (params.affiliateLink.includes('daraz')) partner = 'Daraz';
  else if (params.affiliateLink.includes('banggood')) partner = 'Banggood';

  const sessionEvent: UserSessionEvent = {
    id: sessionId,
    visitorFingerprint: visitorFp,
    productId: params.productId,
    productTitle: params.productTitle,
    interactionType: params.interactionType,
    clickTimestamp: new Date().toISOString(),
    timeSpentSeconds: params.timeSpentSeconds || Math.round(4 + Math.random() * 26),
    affiliateCookieTriggered: isAffiliateTrigger,
    affiliateNetwork: partner,
    estRevenuePkr: estRevPkr
  };

  if (typeof window !== 'undefined') {
    const existingSessions = getStoredSessions();
    existingSessions.unshift(sessionEvent);
    if (existingSessions.length > 100) existingSessions.pop();
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(existingSessions));
  }

  let revenueRecord: OwnerRevenueRecord | undefined;

  if (isAffiliateTrigger || Math.random() > 0.4) {
    revenueRecord = {
      id: 'rev_' + Math.random().toString(36).substring(2, 9),
      sourceType: isAffiliateTrigger ? 'affiliate' : 'ad',
      amountPkr: estRevPkr,
      generatedBySessionId: sessionId,
      productTitle: params.productTitle,
      partner: partner,
      recordedAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      const existingRev = getStoredRevenue();
      existingRev.unshift(revenueRecord);
      if (existingRev.length > 100) existingRev.pop();
      localStorage.setItem(STORAGE_REVENUE_KEY, JSON.stringify(existingRev));
    }
  }

  // Non-blocking telemetry dispatch via requestIdleCallback / beacon
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      window.dispatchEvent(new CustomEvent('c2k_telemetry_logged', { detail: { session: sessionEvent, revenue: revenueRecord } }));
    });
  } else if (typeof window !== 'undefined') {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('c2k_telemetry_logged', { detail: { session: sessionEvent, revenue: revenueRecord } }));
    }, 20);
  }

  // Send background beacon to Next.js route handler
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    try {
      const payload = JSON.stringify({
        visitorFingerprint: visitorFp,
        productId: params.productId,
        productTitle: params.productTitle,
        interactionType: params.interactionType,
        pricePkr: params.pricePkr,
        timeSpentSeconds: sessionEvent.timeSpentSeconds
      });
      navigator.sendBeacon('/api/track-engagement', new Blob([payload], { type: 'application/json' }));
    } catch {
      // quiet
    }
  }

  return { session: sessionEvent, revenue: revenueRecord };
}
