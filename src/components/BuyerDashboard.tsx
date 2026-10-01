import { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  Share2, 
  Copy, 
  Check, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  ArrowRight,
  Gift
} from 'lucide-react';
import { Product } from '../types';

interface BuyerDashboardProps {
  savedProducts: Product[];
  onOrderNow: (product: Product) => void;
  onNavigateHome: () => void;
}

export const BuyerDashboard = ({ savedProducts, onOrderNow, onNavigateHome }: BuyerDashboardProps) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'KHI-KARACHI-8821';
  const referralLink = `https://chinatokarachi.hub/ref/${referralCode}`;

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Mock authentic Karachi buyer orders
  const mockOrders = [
    {
      id: 'ORD-KHI-9421',
      date: 'Oct 01, 2026',
      productTitle: 'WLtoys 144001 Brushless 4WD 75km/h High-Speed RC Drift Racer',
      pricePkr: 14850,
      deliveryArea: 'Clifton Block 4, Karachi',
      paymentMethod: 'Cash on Delivery (COD)',
      status: 'Out for Delivery (Rider en route)',
      trackingStage: 'Saddar Logistics Hub Dispatched',
    },
    {
      id: 'ORD-KHI-8710',
      date: 'Sept 26, 2026',
      productTitle: 'Cyberpunk 100W GaN 4-Port Fast Station with Smart IPS Screen',
      pricePkr: 7499,
      deliveryArea: 'Gulshan-e-Iqbal Block 13D, Karachi',
      paymentMethod: 'Cash on Delivery (COD)',
      status: 'Delivered',
      trackingStage: 'Signed & Paid',
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Top Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-bold text-white text-xl">
              KS
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Karachi Wholesale Member
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                Verified Buyer Tier 1
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Primary Delivery: <strong className="text-slate-200">Clifton &amp; DHA, Karachi</strong> &middot; Cash on Delivery Enabled
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateHome}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
        >
          Return to Sourcing Feed
        </button>
      </div>

      {/* VIRAL REFERRAL SECTION */}
      <div className="relative rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-950 p-6 sm:p-8 backdrop-blur-2xl shadow-xl overflow-hidden">
        <div 
          aria-hidden="true" 
          className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/15 blur-[80px] pointer-events-none" 
        />

        <div className="grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Gift className="w-3.5 h-3.5 text-cyan-400" />
              <span>Exclusive Member Growth Program</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Invite Friends &amp; Get Premium Access
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Share your link with hobbyists and gadget enthusiasts in Karachi. When your friends order an imported RC car, truck, or drone, you unlock <strong>₨ 1,000 instant store credit</strong> and free same-day COD delivery.
            </p>

            {/* Link Copy Widget */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
              <div className="flex-1 px-3.5 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 truncate">
                {referralLink}
              </div>
              <button
                onClick={copyToClipboard}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Referral Stats Counter */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center">
              <div className="text-xs text-slate-400">Friends Joined</div>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">
                6
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Karachi Active</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center">
              <div className="text-xs text-slate-400">Bonus Earned</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
                ₨ 6,000
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">COD Credit Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Your Karachi Order History</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {mockOrders.length} Completed / In Transit
          </span>
        </div>

        <div className="space-y-3">
          {mockOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-cyan-400 font-bold">{ord.id}</span>
                  <span>&middot;</span>
                  <span>{ord.date}</span>
                  <span>&middot;</span>
                  <span className="text-slate-300">{ord.deliveryArea}</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  {ord.productTitle}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{ord.trackingStage}</span>
                  <span>&middot;</span>
                  <span className="text-slate-300">{ord.paymentMethod}</span>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
                <div className="text-base font-extrabold text-cyan-400 font-mono">
                  ₨ {ord.pricePkr.toLocaleString()}
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium font-mono ${
                  ord.status.includes('Delivered')
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved / Wishlist Items */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white">Saved Gadgets &amp; Imports</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {savedProducts.length} Items Saved
          </span>
        </div>

        {savedProducts.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No saved products yet. Browse the feed and tap the heart icon to save products for later order.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedProducts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
              >
                <img
                  src={p.directImageUrl}
                  alt={p.title}
                  className="w-14 h-14 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                  <div className="text-xs font-mono text-cyan-400 font-bold mt-1">
                    ₨ {p.pricePkr.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => onOrderNow(p)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shrink-0 cursor-pointer"
                >
                  Order COD
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
