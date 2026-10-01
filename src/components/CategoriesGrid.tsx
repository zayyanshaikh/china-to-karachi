import { motion } from 'motion/react';
import { Cpu, Car, Truck, Plane, Sparkles, ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';
import { CATEGORIES_DATA } from '../data/products';

interface CategoriesGridProps {
  activeCategory: ProductCategory | 'All';
  onSelectCategory: (category: ProductCategory | 'All') => void;
}

export const CategoriesGrid = ({ activeCategory, onSelectCategory }: CategoriesGridProps) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Car':
        return <Car className="w-6 h-6 text-purple-400" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-amber-400" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-rose-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Direct Factory Sourcing
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Browse Import Categories
          </h2>
        </div>
        
        {/* Reset / All filter button */}
        <button
          onClick={() => onSelectCategory('All')}
          className={`text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
            activeCategory === 'All'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          View All Import Lines
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES_DATA.map((cat, idx) => {
          const isSelected = activeCategory === cat.id;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className={`group relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/80 shadow-[0_0_24px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/50'
                  : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/80 hover:border-slate-700 hover:shadow-xl'
              }`}
            >
              {/* Subtle dynamic background gradient on card hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${cat.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:border-slate-600 transition-all shadow-inner">
                    {getIcon(cat.iconName)}
                  </div>

                  <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border ${
                    isSelected 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/50'
                  }`}>
                    {cat.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Karachi Stock:</span>
                  <span className={`font-semibold font-mono ${cat.textColor}`}>
                    {cat.count}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
