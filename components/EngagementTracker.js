'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * components/EngagementTracker.js
 * 
 * Client Component for Silent Click-to-Earn Tracking.
 * Runs completely in the background without UI lag or user-visible popups.
 * Tracks:
 * - Direct clicks on products
 * - Viewport scroll depth
 * - Active mouse movements
 * - Time spent on page / modal inspection
 */

// Helper to generate or read persistent anonymous visitor fingerprint
function getVisitorFingerprint() {
  if (typeof window === 'undefined') return 'anon_server';
  let fp = localStorage.getItem('c2k_visitor_fp');
  if (!fp) {
    fp = 'khi_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
    localStorage.setItem('c2k_visitor_fp', fp);
  }
  return fp;
}

export default function EngagementTracker({ activeProductId = null, productTitle = null, pricePkr = 0 }) {
  const totalDwellSecondsRef = useRef(0);
  const modalDwellSecondsRef = useRef(0);
  const maxScrollDepthRef = useRef(0);
  const mouseMovesCountRef = useRef(0);
  const modalPingSentRef = useRef(false);

  // Non-blocking telemetry dispatcher using navigator.sendBeacon with fetch fallback
  const sendSilentPing = useCallback((payload) => {
    try {
      const body = JSON.stringify(payload);
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon('/api/track-engagement', blob);
      } else {
        fetch('/api/track-engagement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => {
          // Stealth failure tolerance: never display errors to casual user
        });
      }
    } catch {
      // Completely silent catch
    }
  }, []);

  // Reset modal dwell when active product changes
  useEffect(() => {
    modalDwellSecondsRef.current = 0;
    modalPingSentRef.current = false;
  }, [activeProductId]);

  // Master 1-second engagement clock
  useEffect(() => {
    const timer = setInterval(() => {
      totalDwellSecondsRef.current += 1;

      // 5-Second Modal Dwell Rule:
      // If a viewer inspects a product modal for >= 5s, silently log high-intent engagement
      if (activeProductId && !modalPingSentRef.current) {
        modalDwellSecondsRef.current += 1;

        if (modalDwellSecondsRef.current >= 5) {
          modalPingSentRef.current = true;
          sendSilentPing({
            visitorFingerprint: getVisitorFingerprint(),
            productId: activeProductId,
            productTitle: productTitle || 'Imported Gadget',
            interactionType: 'modal_dwell_5s',
            timeSpentSeconds: modalDwellSecondsRef.current,
            scrollDepthPercentage: maxScrollDepthRef.current,
            pricePkr: pricePkr,
          });
        }
      }

      // Passive Ad & Dwell Impression:
      // Fires every 25 seconds of active user browsing (requires human mouse movements)
      if (totalDwellSecondsRef.current > 0 && totalDwellSecondsRef.current % 25 === 0 && mouseMovesCountRef.current > 5) {
        sendSilentPing({
          visitorFingerprint: getVisitorFingerprint(),
          interactionType: 'scroll_dwell',
          timeSpentSeconds: 25,
          scrollDepthPercentage: maxScrollDepthRef.current,
        });
        mouseMovesCountRef.current = 0; // reset window burst
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeProductId, productTitle, pricePkr, sendSilentPing]);

  // Track max scroll depth without blocking the main rendering thread
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = Math.round((window.scrollY / scrollHeight) * 100);
        if (pct > maxScrollDepthRef.current) {
          maxScrollDepthRef.current = pct;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor mouse movements to differentiate human activity from automated bots
  useEffect(() => {
    let throttleTimeout = null;
    const handleMouseMove = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          mouseMovesCountRef.current += 1;
          throttleTimeout = null;
        }, 300);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Renderless background telemetry worker
  return null;
}
