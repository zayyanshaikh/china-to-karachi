import { useEffect, useRef, useCallback } from 'react';
import { Product } from '../types';
import { logTelemetryEvent, getVisitorFingerprint } from '../services/telemetry';

interface UseEngagementTrackerProps {
  activeProduct?: Product | null;
  onOwnerRevenueUpdated?: () => void;
}

export interface EngagementPayload {
  visitorFingerprint: string;
  productId?: string;
  productTitle?: string;
  interactionType: 'click' | 'modal_dwell_5s' | 'scroll_dwell' | 'mouse_active';
  timeSpentSeconds: number;
  scrollDepthPercentage: number;
  affiliateLink?: string;
  pricePkr?: number;
}

export function useEngagementTracker({
  activeProduct,
  onOwnerRevenueUpdated,
}: UseEngagementTrackerProps = {}) {
  const modalDwellSecondsRef = useRef<number>(0);
  const totalPageTimeRef = useRef<number>(0);
  const maxScrollDepthRef = useRef<number>(0);
  const modalPingSentRef = useRef<boolean>(false);
  const mouseActivityRef = useRef<number>(0);

  // Send non-blocking engagement ping to backend
  const sendSilentPing = useCallback(
    async (payload: EngagementPayload): Promise<{ affiliateUrl?: string } | void> => {
      // 1. Silent fallback/in-memory telemetry buffer (for instant zero-lag UI)
      if (payload.productId && payload.productTitle) {
        logTelemetryEvent({
          productId: payload.productId,
          productTitle: payload.productTitle,
          pricePkr: payload.pricePkr || 15000,
          interactionType: payload.interactionType === 'click' ? 'click' : 'hover',
          affiliateLink: payload.affiliateLink || 'https://www.aliexpress.com',
          timeSpentSeconds: payload.timeSpentSeconds,
        });

        if (onOwnerRevenueUpdated) {
          onOwnerRevenueUpdated();
        }
      }

      // 2. Transmit to /api/track-engagement via keepalive fetch / sendBeacon
      try {
        const body = JSON.stringify(payload);
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          // sendBeacon sends asynchronously without waiting for a server response
          const blob = new Blob([body], { type: 'application/json' });
          navigator.sendBeacon('/api/track-engagement', blob);
        } else {
          // Non-blocking fetch with keepalive flag
          fetch('/api/track-engagement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
            keepalive: true,
          }).catch(() => {
            // Silently ignore network aborts - stealth execution
          });
        }
      } catch {
        // Silent catch: User must NEVER see errors or monetization popups
      }
    },
    [onOwnerRevenueUpdated]
  );

  // Reset modal dwell tracker whenever active product changes
  useEffect(() => {
    modalDwellSecondsRef.current = 0;
    modalPingSentRef.current = false;
  }, [activeProduct?.id]);

  // Master engagement heartbeat timer (runs every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      totalPageTimeRef.current += 1;

      // 5-second Modal Dwell Rule:
      // If user spends more than 5 seconds inspecting a product modal,
      // silently log the high-intent engagement and trigger the affiliate pre-warm
      if (activeProduct && !modalPingSentRef.current) {
        modalDwellSecondsRef.current += 1;

        if (modalDwellSecondsRef.current >= 5) {
          modalPingSentRef.current = true;
          sendSilentPing({
            visitorFingerprint: getVisitorFingerprint(),
            productId: activeProduct.id,
            productTitle: activeProduct.title,
            interactionType: 'modal_dwell_5s',
            timeSpentSeconds: modalDwellSecondsRef.current,
            scrollDepthPercentage: maxScrollDepthRef.current,
            affiliateLink: activeProduct.affiliateLink,
            pricePkr: activeProduct.pricePkr,
          });
        }
      }

      // Periodic Scroll & Ad-Impression Earning Ping (every 25 seconds of active browsing)
      if (totalPageTimeRef.current > 0 && totalPageTimeRef.current % 25 === 0 && mouseActivityRef.current > 5) {
        sendSilentPing({
          visitorFingerprint: getVisitorFingerprint(),
          interactionType: 'scroll_dwell',
          timeSpentSeconds: 25,
          scrollDepthPercentage: maxScrollDepthRef.current,
        });
        mouseActivityRef.current = 0; // Reset activity burst counter
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeProduct, sendSilentPing]);

  // Track scroll depth silently
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const currentPercentage = Math.round((window.scrollY / scrollHeight) * 100);
        if (currentPercentage > maxScrollDepthRef.current) {
          maxScrollDepthRef.current = currentPercentage;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track subtle mouse movement activity (verifies real user, not crawler)
  useEffect(() => {
    let throttleTimeout: any = null;
    const handleMouseMove = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          mouseActivityRef.current += 1;
          throttleTimeout = null;
        }, 300);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Public trigger for product clicks
  const trackProductClick = useCallback(
    (product: Product) => {
      sendSilentPing({
        visitorFingerprint: getVisitorFingerprint(),
        productId: product.id,
        productTitle: product.title,
        interactionType: 'click',
        timeSpentSeconds: modalDwellSecondsRef.current || 1,
        scrollDepthPercentage: maxScrollDepthRef.current,
        affiliateLink: product.affiliateLink,
        pricePkr: product.pricePkr,
      });
    },
    [sendSilentPing]
  );

  return {
    trackProductClick,
    sendSilentPing,
    visitorFingerprint: getVisitorFingerprint(),
  };
}
