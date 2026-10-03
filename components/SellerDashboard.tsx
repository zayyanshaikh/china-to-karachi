'use client';

import { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  Eye, 
  MousePointerClick, 
  DollarSign, 
  Plus, 
  Package, 
  Sparkles, 
  UploadCloud, 
  CheckCircle2 
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface SellerDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onNavigateHome: () => void;
}

export const SellerDashboard = ({ products, onAddProduct, onNavigateHome }: SellerDashboardProps) => {
  const [form, setForm] = useState({
    title: '',
    category: 'RC_Cars' as ProductCategory,
    pricePkr: 22000,
    chinaWholesalePkr: 13500,
    affiliateLink: '',
    directImageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    stockQuantity: 15,
    originCity: 'Shenzhen, China',
    description: '',
  });

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const totalViews = products.reduce((acc, p) => acc + p.engagementScore * 3, 4290);
  const totalClicks = products.reduce((acc, p) => acc + Math.round(p.engagementScore * 0.42), 612);
  const estEarningsPkr = products.reduce((acc, p) => acc + (p.pricePkr - p.chinaWholesalePkr) * 2.8, 184500);

  const profitPerUnit = form.pricePkr - form.chinaWholesalePkr;
  const marginPercentage = form.chinaWholesalePkr > 0 
    ? Math.round((profitPerUnit / form.chinaWholesalePkr) * 100) 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    const newProd: Product = {
      id: 'seller-prod-' + Date.now(),
      sellerId: 'current-seller-01',
      sellerName: 'Shenzhen-Karachi Direct Hub Vendor',
      title: form.title,
      description: form.description || 'Imported via container shipping through Port Qasim. Pre-inspected for high durability and performance.',
      category: form.category,
      pricePkr: Number(form.pricePkr),
      chinaWholesalePkr: Number(form.chinaWholesalePkr),
      originalPricePkr: Math.round(Number(form.pricePkr) * 1.25),
      affiliateLink: form.affiliateLink || 'https://www.aliexpress.com',
      directImageUrl: form.directImageUrl,
      galleryImages: [form.directImageUrl],
      stockQuantity: Number(form.stockQuantity),
      originCity: form.originCity,
      estimatedArrivalDays: 2,
      engagementScore: 120,
      rating: 5.0,
      reviewCount: 3,
      deliveryKarachiDays: 1,
      badge: 'Vendor Verified',
      specs: {
        'Quality Standard': 'CE / RoHS High-Grade',
        'Batch': 'Port Qasim Oct 2026',
        'Direct Source': 'Factory Integrated',
      },
    };

    onAddProduct(newProd);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2500);
    setForm({
      title: '',
      category: 'RC_Cars',
      pricePkr: 22000,
      chinaWholesalePkr: 13500,
      affiliateLink: '',
      directImageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      stockQuantity: 15,
      originCity: 'Shenzhen, China',
      description: '',
    });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <Store className="w-3.5 h-3.5" />
            <span>Seller Analytics &amp; Inventory Suite</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Karachi Port Qasim Node</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Vendor SaaS Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your imported Chinese inventory, monitor live buyer click attribution, and automate source profit cuts.
          </p>
        </div>

        <button
          onClick={onNavigateHome}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors self-start sm:self-auto cursor-pointer"
        >
          View Public Marketplace
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Products Viewed</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2 font-mono">
            {totalViews.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>+24.6% vs last week</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Clicks Generated</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-300 mt-2 font-mono">
            {totalClicks.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-purple-300 font-mono">
            <span>High-Intent Buyer Traffic</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Estimated Seller Earnings</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-2 font-mono">
            ₨ {Math.round(estEarningsPkr).toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400 font-mono">
            <span>Direct Margins + Affiliate Cuts</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Karachi Listings</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-300 mt-2 font-mono">
            {products.length} Products
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400 font-mono">
            <span>Port Qasim Warehoused</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white">Upload New Import Product</h2>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            List in the Karachi live feed. All listings are synchronized with our automated tracking network.
          </p>

          {uploadSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Product successfully uploaded to Karachi live catalog!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Product Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1/14 Brushless 4WD 75km/h RC Drift Racer (Metal Upgrade)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="RC_Cars">RC Cars &amp; Drifters</option>
                  <option value="RC_Trucks">RC Trucks &amp; Heavy 8x8</option>
                  <option value="Gadgets">Smart Gadgets &amp; GaN</option>
                  <option value="Drones">Drones &amp; Aerial FPV</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Karachi Stock Units
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.stockQuantity}
                  onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  China Wholesale Cost (PKR)
                </label>
                <input
                  type="number"
                  min="100"
                  value={form.chinaWholesalePkr}
                  onChange={(e) => setForm({ ...form, chinaWholesalePkr: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Karachi Retail Price (PKR)
                </label>
                <input
                  type="number"
                  min="100"
                  value={form.pricePkr}
                  onChange={(e) => setForm({ ...form, pricePkr: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300">Projected Margin:</span>
              <span className="font-bold text-emerald-400">
                +₨ {profitPerUnit.toLocaleString()} / unit ({marginPercentage}%)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-950 to-cyan-950/30 border border-purple-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-purple-300">
                  Affiliate / Source Link (AliExpress, 1688, Amazon, Daraz)
                </label>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-medium">
                  AI Smart Route
                </span>
              </div>

              <input
                type="url"
                placeholder="https://www.aliexpress.com/item/100500... or Amazon link"
                value={form.affiliateLink}
                onChange={(e) => setForm({ ...form, affiliateLink: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-900 border border-purple-500/30 rounded-xl text-xs text-purple-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 font-mono"
              />

              <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-300 leading-snug">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-cyan-300">Seller Boost:</strong> Add your source link, and our AI will automatically route buyers to it, giving you a cut of the profit.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Direct Image URL
              </label>
              <input
                type="url"
                required
                value={form.directImageUrl}
                onChange={(e) => setForm({ ...form, directImageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Short Description &amp; Specs
              </label>
              <textarea
                rows={2}
                placeholder="Factory specs, battery capacity, remote range..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-purple-600/30 cursor-pointer flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Publish &amp; Enable AI Source Routing</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Live Karachi Hub Inventory</h2>
              <p className="text-xs text-slate-400">
                Products currently circulating in the high-traffic feed.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-medium">
              {products.length} Active Listings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-2.5 px-3">Item</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                  <th className="py-2.5 px-3 text-right">Engagement</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.directImageUrl}
                          alt={p.title}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-800 shrink-0"
                        />
                        <div className="truncate max-w-[180px]">
                          <div className="text-white font-semibold truncate font-sans text-xs">
                            {p.title}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {p.stockQuantity} in KHI Hub
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {p.category.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 text-right text-cyan-400 font-bold">
                      ₨ {p.pricePkr.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-purple-300 font-bold">
                        {p.engagementScore}
                      </span>
                      <span className="text-[10px] text-slate-500 block">clicks/views</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
