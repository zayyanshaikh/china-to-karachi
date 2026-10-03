'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Eye, 
  ShoppingCart, 
  ExternalLink, 
  Truck, 
  Zap,
  ArrowUpDown
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { logTelemetryEvent } from '../services/telemetry';

interface ProductFeedProps {
  products: Product[];
  activeCategory: ProductCategory | 'All';
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onTelemetryLogged?: () => void;
}

export const ProductFeed = ({
  products,
  activeCategory,
  searchQuery,
  onSelectProduct,
  onAddToCart,
  onTelemetryLogged,
}: ProductFeedProps) => {
  const [sortBy, setSortBy] = useState<'engagement' | 'price_asc' | 'price_desc' | 'margin'>('engagement');
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'engagement':
        list.sort((a, b) => b.engagementScore - a.engagementScore);
        break;
      case 'price_asc':
        list.sort((a, b) => a.pricePkr - b.pricePkr);
        break;
      case 'price_desc':
        list.sort((a, b) => b.pricePkr - a.pricePkr);
        break;
      case 'margin':
        list.sort(
          (a, b) =>
            (b.pricePkr - b.chinaWholesalePkr) / b.pricePkr -
            (a.pricePkr - a.chinaWholesalePkr) / a.pricePkr
        );
        break;
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleProductCardClick = (product: Product) => {
    setClickedCardId(product.id);
    setTimeout(() => setClickedCardId(null), 400);

    logTelemetryEvent({
      productId: product.id,
      productTitle: product.title,
      pricePkr: product.pricePkr,
      interactionType: 'click',
      affiliateLink: product.affiliateLink,
    });
    if (onTelemetryLogged) onTelemetryLogged();

    try {
      window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    } catch {
      // quiet
    }

    onSelectProduct(product);
  };

  const handleCardHover = (product: Product) => {
    logTelemetryEvent({
      productId: product.id,
      productTitle: product.title,
      pricePkr: product.pricePkr,
      interactionType: 'hover',
      affiliateLink: product.affiliateLink,
      timeSpentSeconds: 6,
    });
    if (onTelemetryLogged) onTelemetryLogged();
  };

  return (
    <section id="product-feed" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              Live Import Feed
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredProducts.length} Import Listings
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            {activeCategory === 'All'
              ? 'Trending China Imports in Karachi'
              : `${activeCategory.replace('_', ' ')} Imports`}
          </h2>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="engagement">🔥 Most Addictive (High Engagement)</option>
            <option value="margin">💰 Highest Wholesale Margin</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">No import items matched your search criteria.</p>
          <button
            onClick={() => setSortBy('engagement')}
            className="mt-3 px-4 py-2 rounded-lg bg-slate-800 text-cyan-400 text-xs font-medium hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => {
              const marginPercent = Math.round(
                ((product.pricePkr - product.chinaWholesalePkr) / product.chinaWholesalePkr) * 100
              );
              const isClicked = clickedCardId === product.id;

              return (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  onMouseEnter={() => handleCardHover(product)}
                  className={`group relative rounded-2xl border bg-slate-900/80 hover:bg-slate-900 backdrop-blur-xl flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                    isClicked
                      ? 'ring-2 ring-cyan-400 scale-[0.98] border-cyan-400'
                      : 'border-slate-800/80 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]'
                  }`}
                >
                  {/* Top Badge Overlay */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    <img
                      src={product.directImageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => handleProductCardClick(product)}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    {product.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono font-medium text-cyan-300">
                        {product.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[10px] text-slate-300 font-mono">
                      <Eye className="w-3 h-3 text-cyan-400" />
                      <span>{(product.engagementScore / 10).toFixed(0)} viewing in KHI</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductCardClick(product);
                      }}
                      title="Inspect import specs & verify source"
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                        <span className="font-mono text-purple-400 font-medium">
                          {product.category.replace('_', ' ')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3 text-emerald-400" />
                          <span>{product.deliveryKarachiDays}d COD Karachi</span>
                        </span>
                      </div>

                      <h3
                        onClick={() => handleProductCardClick(product)}
                        className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
                      >
                        {product.title}
                      </h3>

                      <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-slate-400 font-mono bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                        {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                          <div key={key} className="truncate">
                            <span className="text-slate-500">{key}:</span> {val}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-xs text-slate-400">Karachi Price</div>
                          <div className="text-lg font-extrabold text-cyan-400 font-mono">
                            ₨ {product.pricePkr.toLocaleString()}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-slate-500">China Factory Wholesale</div>
                          <div className="text-xs font-semibold text-emerald-400 font-mono">
                            ₨ {product.chinaWholesalePkr.toLocaleString()}
                            <span className="text-[10px] text-purple-300 ml-1 font-sans">
                              (+{marginPercent}%)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-2">
                        <button
                          onClick={() => handleProductCardClick(product)}
                          className="col-span-3 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <Zap className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View Deal &amp; Specs</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          title="Add to Karachi Express Cart"
                          className="col-span-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <ShoppingCart className="w-4 h-4 text-slate-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default ProductFeed;
