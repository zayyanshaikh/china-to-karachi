'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ExternalLink, Zap, Truck, ShieldCheck, X } from 'lucide-react';

export default function ProductCard({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isRippling, setIsRippling] = useState(false);

  // The Hidden Click-to-Earn Trigger:
  // 1. Logs click to /api/track-engagement via non-blocking sendBeacon
  // 2. Secretly opens/prewarms the target affiliate link in a separate background tab
  // 3. Displays the full inspection modal to the viewer
  const handleCardClick = () => {
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 300);

    // 1. Silent Telemetry Ping to /api/track-engagement
    try {
      const payload = JSON.stringify({
        visitorFingerprint: localStorage.getItem('c2k_visitor_fp') || 'anon_khi',
        productId: product.id,
        productTitle: product.title,
        interactionType: 'click',
        pricePkr: product.pricePkr,
        timeSpentSeconds: 2,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track-engagement', new Blob([payload], { type: 'application/json' }));
      } else {
        fetch('/api/track-engagement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Silent catch
    }

    // 2. Open Hidden Affiliate Link in new background tab to drop the tracking cookie
    if (product.affiliateLink) {
      try {
        window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
      } catch {
        // Suppress browser popup blockers silently
      }
    }

    // 3. Open rich modal for Karachi buyer
    setModalOpen(true);
  };

  const marginPkr = product.pricePkr - product.wholesaleCostPkr;
  const marginPercent = Math.round((marginPkr / product.wholesaleCostPkr) * 100);

  return (
    <>
      <motion.article
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        onClick={handleCardClick}
        className={`group relative rounded-2xl border bg-slate-900/80 hover:bg-slate-900 border-slate-800/80 hover:border-cyan-500/50 backdrop-blur-xl flex flex-col justify-between overflow-hidden cursor-pointer transition-shadow hover:shadow-[0_0_28px_rgba(6,182,212,0.18)] ${
          isRippling ? 'ring-2 ring-cyan-400' : ''
        }`}
      >
        {/* Card Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-cyan-300">
              {product.badge}
            </div>
          )}

          {/* Live Viewers count */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/90 text-[10px] text-slate-300 font-mono">
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>{(product.views / 10).toFixed(0)} viewing in KHI</span>
          </div>

          <div className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/80 text-slate-300 group-hover:text-cyan-400 border border-slate-800">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="font-mono text-purple-400 font-medium">
                {product.categoryName}
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-emerald-400" />
                <span>{product.deliveryDays}d COD Karachi</span>
              </span>
            </div>

            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>

            {/* Specs preview */}
            <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-slate-400 font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
              {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
                <div key={k} className="truncate">
                  <span className="text-slate-500 uppercase">{k}:</span> {v}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400">Karachi COD</span>
                <div className="text-base font-extrabold text-cyan-400 font-mono">
                  ₨ {product.pricePkr.toLocaleString()}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500">China Factory Cost</span>
                <div className="text-xs font-semibold text-emerald-400 font-mono">
                  ₨ {product.wholesaleCostPkr.toLocaleString()}
                  <span className="text-purple-300 text-[10px] ml-1">
                    (+{marginPercent}%)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspect Import Specs</span>
            </button>
          </div>
        </div>
      </motion.article>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl z-10 my-8 space-y-4"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
                  <span>{product.categoryName}</span>
                  <span>&middot;</span>
                  <span className="text-cyan-400">Origin: {product.origin}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {product.title}
                </h3>
              </div>

              {/* Full Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block">{key}</span>
                    <span className="text-slate-200 font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  Delivers across Clifton, DHA, Gulshan, Saddar, and Nazimabad in {product.deliveryDays} day via Cash on Delivery.
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">Karachi Price</span>
                  <div className="text-xl font-extrabold text-cyan-400 font-mono">
                    ₨ {product.pricePkr.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert('Order confirmed for Karachi Cash on Delivery! Rider dispatched from Saddar hub.');
                    setModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  Order via Karachi COD
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
