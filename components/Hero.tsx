'use client';

import { motion } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Sparkles, 
  PackageCheck 
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onExploreClick: () => void;
  onOpenSellerModal: () => void;
}

export const Hero = ({ onSelectCategory, onExploreClick, onOpenSellerModal }: HeroProps) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Neon Ambient Glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/20 to-indigo-600/10 blur-[130px] pointer-events-none -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto">
        {/* Main 3D-feeling Glassmorphic Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/80 p-6 sm:p-10 lg:p-14 backdrop-blur-2xl shadow-2xl shadow-cyan-950/30 overflow-hidden"
        >
          {/* Subtle Grid Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
          />

          {/* Top Status & Badge Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Shenzhen ➔ Port Qasim Direct Supply Chain</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Karachi Hub Stock: 4,820+ Ready for Dispatch</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                China to Karachi Business Hub
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                  Premium Gadgets &amp; RC Vehicles
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Direct wholesale imports from certified Shenzhen &amp; Yiwu manufacturers. 
                Experience 75km/h brushless RC drift cars, commercial 8x8 metal trucks, 4K GPS obstacle-avoiding drones, and cyberpunk electronics—delivered across Karachi in 24 hours.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Trending Imports</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenSellerModal}
                  className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-purple-500/50 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>List as Karachi Seller</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Direct Port Customs Cleared</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Karachi COD Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Wholesale Factory Pricing</span>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 opacity-30 group-hover:opacity-60 blur-xl transition duration-500" />
                
                <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/90 p-5 backdrop-blur-xl space-y-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                    <img 
                      src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80" 
                      alt="WLtoys 75km/h RC Drift Racer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-rose-500 text-white font-bold text-[10px] tracking-wider uppercase">
                      Spotlight Deal
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs text-cyan-300 font-mono">
                      Speed: 75 km/h · 4WD
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">WLtoys Brushless Alloy Edition</span>
                      <span className="text-xs text-emerald-400 font-semibold">In Stock KHI</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      1/14 Proportional Metal Drift Racer
                    </h3>
                    <div className="mt-2 flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-extrabold text-cyan-400 font-mono">₨ 14,850</span>
                        <span className="ml-2 text-xs line-through text-slate-500 font-mono">₨ 19,500</span>
                      </div>
                      <span className="text-[11px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-medium">
                        Wholesale Margin: +67%
                      </span>
                    </div>
                  </div>

                  {/* Interactive category quick buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                    <button
                      onClick={() => onSelectCategory('RC_Cars')}
                      className="py-1.5 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-left text-slate-300 hover:text-white flex items-center justify-between transition-colors"
                    >
                      <span>RC Cars (64)</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </button>
                    <button
                      onClick={() => onSelectCategory('RC_Trucks')}
                      className="py-1.5 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-left text-slate-300 hover:text-white flex items-center justify-between transition-colors"
                    >
                      <span>RC Trucks (38)</span>
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
