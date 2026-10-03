import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { 
  ShieldCheck, 
  Truck, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  PackageCheck,
  Cpu,
  Car,
  Plane
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 1. Hero Section (3D Glassmorphism & Neon Accent) */}
      <section className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Neon Ambient Glows */}
        <div 
          aria-hidden="true" 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/20 to-indigo-600/10 blur-[130px] pointer-events-none -z-10" 
        />

        <div className="relative rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/80 p-6 sm:p-10 lg:p-14 backdrop-blur-2xl shadow-2xl shadow-cyan-950/30 overflow-hidden">
          {/* Status Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Direct Shenzhen ➔ Port Qasim Cargo Stream</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>4,820+ Ready for Same-Day Dispatch</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                China to Karachi Business Hub
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                  Premium Gadgets &amp; RC Vehicles
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Direct wholesale imports from certified Shenzhen &amp; Yiwu manufacturers. 
                Experience 75km/h brushless RC drift cars, commercial 8x8 metal trucks, 4K GPS obstacle-avoiding drones, and cyberpunk electronics—delivered across Karachi in 24 hours.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#product-feed"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Trending Imports</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <Link
                  href="/category/rc-cars"
                  className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-purple-500/50 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>View 75km/h RC Racers</span>
                </Link>
              </div>

              {/* Value Props */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Port Qasim Cleared</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Karachi COD Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Wholesale Margins</span>
                </div>
              </div>
            </div>

            {/* Right Spotlight Visual Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/90 p-4 backdrop-blur-xl shadow-xl">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80"
                    alt="WLtoys Drift Racer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-500 text-white font-bold text-[9px] uppercase tracking-wider">
                    Hot Spotlight
                  </div>
                </div>
                <div className="text-xs text-slate-400">Shenzhen Alloy Edition</div>
                <h4 className="text-sm font-bold text-white mt-0.5">WLtoys 4WD 75km/h Racer</h4>
                <div className="mt-2 flex items-baseline justify-between font-mono">
                  <span className="text-base font-extrabold text-cyan-400">₨ 14,850</span>
                  <span className="text-[11px] text-emerald-400">+67% Wholesale Margin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-mono text-cyan-400">{cat.count}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Product Feed (The Money Maker Grid) */}
      <section id="product-feed" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Live Karachi Import Catalog</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Trending Hardware &amp; RC Imports
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {PRODUCTS.length} Direct China Imports Listed
          </span>
        </div>

        {/* Masonry Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Seller Teaser Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6">
        <div className="relative rounded-3xl border border-purple-500/30 bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-950 p-8 sm:p-12 overflow-hidden backdrop-blur-2xl">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
              Vendor Sourcing Gateway
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Have Products? Showcase them to Karachi's biggest market.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Connect your imported inventory with thousands of daily buyers across Saddar, Clifton, and Gulshan with integrated Cash on Delivery logistics.
            </p>
            <div className="pt-2">
              <Link
                href="/category/rc-cars"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all"
              >
                <span>Become a Karachi Seller</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
