import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Store, 
  ArrowRight, 
  CheckCircle2, 
  Upload, 
  DollarSign, 
  Sparkles, 
  Building2, 
  X,
  Truck
} from 'lucide-react';
import { ProductCategory, Product } from '../types';

interface SellerTeaserProps {
  onAddProduct: (newProduct: Product) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const SellerTeaser = ({ onAddProduct, isOpen, onOpen, onClose }: SellerTeaserProps) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'RC_Cars' as ProductCategory,
    pricePkr: 18000,
    chinaWholesalePkr: 11000,
    originCity: 'Shenzhen, China',
    sellerName: 'Karachi Hobby Imports',
    description: '',
    directImageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    stockQuantity: 10,
    affiliateLink: 'https://www.aliexpress.com',
  });

  const [submitted, setSubmitted] = useState(false);

  const profitPkr = formData.pricePkr - formData.chinaWholesalePkr;
  const marginPercent = formData.chinaWholesalePkr > 0 
    ? Math.round((profitPkr / formData.chinaWholesalePkr) * 100) 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newProd: Product = {
      id: 'prod-custom-' + Date.now(),
      sellerId: 'seller-' + Math.random().toString(36).substring(2, 7),
      sellerName: formData.sellerName || 'Direct Vendor (Karachi)',
      title: formData.title,
      description: formData.description || 'Premium import direct from factory partners. Inspected for Karachi market readiness.',
      category: formData.category,
      pricePkr: Number(formData.pricePkr),
      chinaWholesalePkr: Number(formData.chinaWholesalePkr),
      originalPricePkr: Math.round(Number(formData.pricePkr) * 1.2),
      affiliateLink: formData.affiliateLink || 'https://www.aliexpress.com',
      directImageUrl: formData.directImageUrl,
      galleryImages: [formData.directImageUrl],
      stockQuantity: Number(formData.stockQuantity),
      originCity: formData.originCity,
      estimatedArrivalDays: 2,
      engagementScore: 500,
      rating: 5.0,
      reviewCount: 1,
      deliveryKarachiDays: 1,
      badge: 'New Seller Verified',
      specs: {
        'Quality Standard': 'CE & RoHS Certified',
        'Inspection': 'Saddar Warehouse Tested',
        'Stock Location': 'Karachi Ready',
      }
    };

    onAddProduct(newProd);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <>
      {/* Visual Bottom Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl border border-purple-500/30 bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-950 p-8 sm:p-12 lg:p-16 overflow-hidden backdrop-blur-2xl shadow-2xl shadow-purple-950/30">
          {/* Neon Accent Glows */}
          <div 
            aria-hidden="true" 
            className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 blur-[100px] pointer-events-none" 
          />
          <div 
            aria-hidden="true" 
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/20 blur-[100px] pointer-events-none" 
          />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                <Store className="w-3.5 h-3.5 text-purple-400" />
                <span>Karachi Wholesale Vendor Gateway</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Have Products? Showcase them to Karachi's biggest market.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Become a Seller.
                </span>
              </h2>

              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Connect your imported inventory with thousands of daily buyers across Saddar, Clifton, DHA, and Gulshan. List your RC cars, trucks, drones, or smart gadgets with zero upfront listing fees and integrated COD logistics.
              </p>

              {/* Seller Perks */}
              <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Port Qasim Warehousing Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant Cash on Delivery Payouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated Traffic &amp; Affiliate Flow</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                onClick={onOpen}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-purple-600/30 flex items-center gap-3 group cursor-pointer"
              >
                <span>Upload Product to Hub</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-xs text-slate-400 mt-3 font-mono">
                Verification takes under 5 minutes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Onboarding Modal */}
      <AnimatePresence>
        {isOpen && (
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
              className="relative w-full max-w-2xl bg-slate-900 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 z-10 my-8"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Vendor Showcase Onboarding
              </div>
              <h3 className="text-xl font-bold text-white">
                Showcase Your China Import to Karachi
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Product Successfully Listed!</h4>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Your product is now visible in the live Karachi import feed. Incoming orders will route directly to your contact.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Product Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1/12 High-Torque RC Monster Truck Metal Edition"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
                      >
                        <option value="RC_Cars">RC Cars &amp; Drifters</option>
                        <option value="RC_Trucks">RC Trucks &amp; Heavy Machinery</option>
                        <option value="Gadgets">Smart Gadgets &amp; Electronics</option>
                        <option value="Drones">Drones &amp; Aerial FPV</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Seller Business Name (Karachi)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Al-Madina Cargo Electronics (Saddar)"
                        value={formData.sellerName}
                        onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        China Wholesale Cost (PKR)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.chinaWholesalePkr}
                        onChange={(e) => setFormData({ ...formData, chinaWholesalePkr: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Karachi Selling Price (PKR)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.pricePkr}
                        onChange={(e) => setFormData({ ...formData, pricePkr: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Profit Margin Preview Bar */}
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs font-mono">
                    <span className="text-purple-300">Projected Seller Profit:</span>
                    <span className="font-bold text-emerald-400">
                      ₨ {profitPkr.toLocaleString()} (+{marginPercent}%)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Direct High-Res Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.directImageUrl}
                      onChange={(e) => setFormData({ ...formData, directImageUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
                    >
                      Publish to Karachi Hub
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
