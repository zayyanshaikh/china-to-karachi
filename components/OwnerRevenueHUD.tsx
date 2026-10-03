'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Activity, 
  DollarSign, 
  MousePointerClick, 
  Cookie, 
  Clock, 
  ShieldCheck, 
  Play
} from 'lucide-react';
import { UserSessionEvent, OwnerRevenueRecord } from '../types';
import { getStoredSessions, getStoredRevenue, logTelemetryEvent } from '../services/telemetry';

interface OwnerRevenueHUDProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshTelemetry: () => void;
}

export const OwnerRevenueHUD = ({ isOpen, onClose, onRefreshTelemetry }: OwnerRevenueHUDProps) => {
  const [sessions, setSessions] = useState<UserSessionEvent[]>([]);
  const [revenues, setRevenues] = useState<OwnerRevenueRecord[]>([]);

  const loadData = () => {
    setSessions(getStoredSessions());
    setRevenues(getStoredRevenue());
  };

  useEffect(() => {
    loadData();
    const handleEvent = () => loadData();
    window.addEventListener('c2k_telemetry_logged', handleEvent);
    return () => window.removeEventListener('c2k_telemetry_logged', handleEvent);
  }, [isOpen]);

  if (!isOpen) return null;

  const totalRevenuePkr = revenues.reduce((acc, curr) => acc + curr.amountPkr, 0);
  const totalClicks = sessions.filter((s) => s.interactionType === 'click' || s.interactionType === 'affiliate_hop').length;
  const cookieCount = sessions.filter((s) => s.affiliateCookieTriggered).length;
  const estUsd = (totalRevenuePkr / 278).toFixed(2);

  const handleSimulateVisitor = () => {
    logTelemetryEvent({
      productId: 'prod-sim-' + Date.now(),
      productTitle: 'Simulated KHI Buyer Click: 1/14 Brushless Buggy',
      pricePkr: 16500,
      interactionType: 'click',
      affiliateLink: 'https://www.aliexpress.com/item/simulated.html',
    });
    loadData();
    onRefreshTelemetry();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 z-10 my-8 overflow-hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    Owner Monetization &amp; Telemetry HUD
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                    Secret Engine Active
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Tracking casual viewers, hidden affiliate link attribution, and commission accumulation.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Est. Owner Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono">
                ₨ {totalRevenuePkr.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                ≈ ${estUsd} USD
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Direct Clicks</span>
                <MousePointerClick className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-xl font-extrabold text-cyan-400 font-mono">
                {totalClicks}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Product Interactions
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Cookies Triggered</span>
                <Cookie className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl font-extrabold text-purple-400 font-mono">
                {cookieCount}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                AliExpress / Amazon / Daraz
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Logged Sessions</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-extrabold text-amber-400 font-mono">
                {sessions.length}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                In `user_sessions`
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 mb-6">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-cyan-300">Live Simulation:</span> Test the hidden telemetry buffer without disrupting casual browsing.
            </div>
            <button
              onClick={handleSimulateVisitor}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              <span>Simulate Visitor Event</span>
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Recent `user_sessions` Telemetry Buffer
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">Auto-refreshes on every click</span>
            </div>

            <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/90 text-xs font-mono">
              {sessions.length === 0 ? (
                <div className="py-8 text-center text-slate-500">
                  No session logs yet. Click on any product in the feed to trigger earnings!
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 sticky top-0">
                    <tr>
                      <th className="py-2 px-3">Visitor ID</th>
                      <th className="py-2 px-3">Product / Interaction</th>
                      <th className="py-2 px-3">Partner Network</th>
                      <th className="py-2 px-3">Cookie Fired</th>
                      <th className="py-2 px-3 text-right">Est. Earned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {sessions.slice(0, 10).map((sess) => (
                      <tr key={sess.id} className="hover:bg-slate-900/50">
                        <td className="py-2 px-3 text-slate-400 truncate max-w-[100px]">
                          {sess.visitorFingerprint}
                        </td>
                        <td className="py-2 px-3 text-slate-200 truncate max-w-[200px]">
                          <span className={`inline-block mr-1.5 px-1 py-0.2 rounded text-[10px] ${
                            sess.interactionType === 'click' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {sess.interactionType}
                          </span>
                          {sess.productTitle}
                        </td>
                        <td className="py-2 px-3 text-purple-300">
                          {sess.affiliateNetwork}
                        </td>
                        <td className="py-2 px-3">
                          {sess.affiliateCookieTriggered ? (
                            <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                              <ShieldCheck className="w-3 h-3" /> Fired
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Dwell only</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-400">
                          +₨ {sess.estRevenuePkr.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OwnerRevenueHUD;
