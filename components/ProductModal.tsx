'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  ShoppingCart, 
  Truck, 
  Layers, 
  Flame 
} from 'lucide-react';
import { Product } from '../types';
import { logTelemetryEvent } from '../services/telemetry';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onTelemetryLogged?: () => void;
}

export const ProductModal = ({
  product,
  onClose,
  onAddToCart,
  onTelemetryLogged,
}: ProductModalProps) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.directImageUrl];

  const handleExternalSourceClick = () => {
    logTelemetryEvent({
      productId: product.id,
      productTitle: product.title,
      pricePkr: product.pricePkr,
      interactionType: 'affiliate_hop',
      affiliateLink: product.affiliateLink,
    });
    if (onTelemetryLogged) onTelemetryLogged();
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const marginPkr = product.pricePkr - product.chinaWholesalePkr;
  const marginPercent = Math.round((marginPkr / product.chinaWholesalePkr) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-950/40 overflow-hidden z-10 my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-12 gap-0">
            {/* Gallery Left Half */}
            <div className="md:col-span-6 bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={images[activeImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs text-cyan-300 font-mono flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>Port Qasim Cleared Batch</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === i
                          ? 'border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Seller Trust Verification */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div>
                  <span className="text-slate-500">Imported By:</span>
                  <div className="font-semibold text-slate-200">{product.sellerName}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Origin:</span>
                  <div className="font-mono text-cyan-400">{product.originCity}</div>
                </div>
              </div>
            </div>

            {/* Product Details Right Half */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                    {product.category.replace('_', ' ')}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-emerald-400 font-medium">Ready Stock in Karachi</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 leading-snug">
                  {product.title}
                </h2>

                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Breakdown */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Karachi Retail COD:</span>
                      <div className="text-2xl font-extrabold text-cyan-400 font-mono">
                        ₨ {product.pricePkr.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">China Factory Cost:</span>
                      <div className="text-sm font-semibold text-emerald-400 font-mono">
                        ₨ {product.chinaWholesalePkr.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                    <span>Retailer Markup Margin:</span>
                    <span className="font-mono text-purple-300 font-bold">
                      +₨ {marginPkr.toLocaleString()} ({marginPercent}%)
                    </span>
                  </div>
                </div>

                {/* Specifications List */}
                <div className="mt-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Technical Specs
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {Object.entries(product.specs).map(([label, val]) => (
                      <div key={label} className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/60">
                        <span className="text-slate-400 block text-[10px] uppercase">{label}</span>
                        <span className="text-slate-200 font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
                  <Truck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>
                    Delivers to Clifton, DHA, Gulshan, Saddar, Nazimabad in{' '}
                    <strong>{product.deliveryKarachiDays} day</strong> via COD.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Order in Karachi (COD)</span>
                  </button>

                  <button
                    onClick={handleExternalSourceClick}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>China Factory Direct</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>

                <p className="text-[11px] text-center text-slate-500">
                  Imported with full commercial declaration. Returns accepted within 7 days at Karachi Saddar hub.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
