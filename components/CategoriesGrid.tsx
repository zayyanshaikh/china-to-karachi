'use client';

import { motion } from 'motion/react';
import { Cpu, Car, Truck, Plane, Sparkles, ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';
import { CATEGORIES_DATA } from '../data/products';

interface CategoriesGridProps {
  selectedCategory: ProductCategory | 'ALL';
  onSelectCategory: (category: ProductCategory | 'ALL') => void;
}

export default function CategoriesGrid({
  selectedCategory,
  onSelectCategory,
}: CategoriesGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Car':
        return <Car className="w-5 h-5 text-purple-400" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-amber-400" />;
      case 'Plane':
        return <Plane className="w-5 h-5 text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Sourcing Channels</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Direct China Import Lines
          </h2>
        </div>

        <button
          onClick={() => onSelectCategory('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all border ${
            selectedCategory === 'ALL'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          View All Channels
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES_DATA.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className={`group relative p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden backdrop-blur-xl ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-br ${cat.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 shadow-inner group-hover:border-slate-700 transition-colors">
                    {getIcon(cat.iconName)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/70 border border-slate-800 text-slate-400 group-hover:text-slate-200">
                    {cat.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-cyan-400" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{cat.count}</span>
                  <span className="text-emerald-400">Port Qasim Stocked</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
