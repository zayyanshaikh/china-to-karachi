import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesGrid } from './components/CategoriesGrid';
import { ProductFeed } from './components/ProductFeed';
import { ProductModal } from './components/ProductModal';
import { SellerTeaser } from './components/SellerTeaser';
import { OwnerRevenueHUD } from './components/OwnerRevenueHUD';
import { CartDrawer } from './components/CartDrawer';
import { SellerDashboard } from './components/SellerDashboard';
import { BuyerDashboard } from './components/BuyerDashboard';
import { ShareAndEarnModal } from './components/ShareAndEarnModal';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, ProductCategory } from './types';
import { getStoredRevenue, getVisitorFingerprint } from './services/telemetry';
import { useEngagementTracker } from './hooks/useEngagementTracker';
import { 
  ShieldCheck, 
  MapPin, 
  Plane, 
  Truck, 
  HelpCircle,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'marketplace' | 'seller' | 'buyer'>('marketplace');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const [ownerHudOpen, setOwnerHudOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  
  // Owner Telemetry Live Revenue State
  const [liveRevenuePkr, setLiveRevenuePkr] = useState<number>(() => {
    const revs = getStoredRevenue();
    return revs.reduce((sum, r) => sum + r.amountPkr, 0);
  });

  const refreshRevenue = () => {
    const revs = getStoredRevenue();
    setLiveRevenuePkr(revs.reduce((sum, r) => sum + r.amountPkr, 0));
  };

  // Silent Engagement Engine: Tracks dwell time (>5s on modal), scrolls, and mouse movements
  const { trackProductClick } = useEngagementTracker({
    activeProduct: selectedProduct,
    onOwnerRevenueUpdated: refreshRevenue,
  });

  useEffect(() => {
    refreshRevenue();
    const handleTelemetryLogged = () => {
      refreshRevenue();
    };
    window.addEventListener('c2k_telemetry_logged', handleTelemetryLogged);

    // Tag incoming referral if ?ref= is present in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');
      if (refCode) {
        fetch('/api/referrals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referrerCode: refCode,
            referredFingerprint: getVisitorFingerprint(),
            landingUrl: window.location.href,
          }),
        }).catch(() => {});
      }
    }

    return () => window.removeEventListener('c2k_telemetry_logged', handleTelemetryLogged);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const scrollToFeed = () => {
    if (currentView !== 'marketplace') {
      setCurrentView('marketplace');
    }
    setTimeout(() => {
      const el = document.getElementById('product-feed');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToFeed();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenSellerModal={() => setCurrentView('seller')}
        onOpenShareModal={() => setShareModalOpen(true)}
        onToggleOwnerHud={() => setOwnerHudOpen((prev) => !prev)}
        ownerHudOpen={ownerHudOpen}
        liveRevenuePkr={liveRevenuePkr}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'seller' ? (
          <SellerDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onNavigateHome={() => setCurrentView('marketplace')}
          />
        ) : currentView === 'buyer' ? (
          <BuyerDashboard
            savedProducts={products.slice(0, 3)}
            onOrderNow={handleAddToCart}
            onNavigateHome={() => setCurrentView('marketplace')}
          />
        ) : (
          <>
            {/* Hero Section with 3D/Glassmorphism */}
            <Hero
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                scrollToFeed();
              }}
              onExploreClick={scrollToFeed}
              onOpenSellerModal={() => setCurrentView('seller')}
            />

            {/* Categories Grid */}
            <CategoriesGrid
              activeCategory={activeCategory}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                scrollToFeed();
              }}
            />

            {/* The Money Maker Product Feed */}
            <ProductFeed
              products={products}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onTelemetryLogged={refreshRevenue}
            />

            {/* Seller Showcase Teaser */}
            <SellerTeaser
              onAddProduct={handleAddProduct}
              isOpen={sellerModalOpen}
              onOpen={() => setCurrentView('seller')}
              onClose={() => setSellerModalOpen(false)}
            />
          </>
        )}
      </main>

      {/* Floating Owner Engine Action Quick-Button (Bottom-Left) */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setOwnerHudOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-xl shadow-cyan-950/40 hover:shadow-cyan-500/20 transition-all cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Owner Monetization Engine:</span>
          <span className="font-bold text-emerald-400">₨ {liveRevenuePkr.toLocaleString()}</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onTelemetryLogged={refreshRevenue}
      />

      <OwnerRevenueHUD
        isOpen={ownerHudOpen}
        onClose={() => setOwnerHudOpen(false)}
        onRefreshTelemetry={refreshRevenue}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <ShareAndEarnModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-slate-950 text-xs">
                C2K
              </div>
              <span className="text-white font-bold text-sm">China-to-Karachi Hub</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Premier import gateway connecting Shenzhen and Yiwu manufacturers with retailers, hobbyists, and consumers in Karachi, Pakistan.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              Cargo Node: Port Qasim &middot; Hub: Saddar Regal
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs font-mono uppercase tracking-wider">
              Import Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { setActiveCategory('RC_Cars'); scrollToFeed(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  High-Speed RC Cars &amp; Drift Racers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('RC_Trucks'); scrollToFeed(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  8x8 Military Trucks &amp; Metal Excavators
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('Gadgets'); scrollToFeed(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Cyberpunk GaN Chargers &amp; Audio Gadgets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('Drones'); scrollToFeed(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  4K GPS Aerial &amp; FPV Cinewhoops
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery & Logistics */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs font-mono uppercase tracking-wider">
              Karachi Delivery Coverage
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>&bull; Clifton &amp; Defence (DHA Phase 1–8)</li>
              <li>&bull; Saddar, Regal Chowk &amp; PECHS</li>
              <li>&bull; Gulshan-e-Iqbal &amp; Gulistan-e-Jauhar</li>
              <li>&bull; North Nazimabad &amp; Federal B Area</li>
              <li>&bull; Malir Cantt &amp; Bahria Town Karachi</li>
            </ul>
          </div>

          {/* Sourcing & Secret Engine Note */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Sourcing
            </h4>
            <p className="leading-relaxed text-slate-400 text-xs">
              Direct factory clearance eliminates middleman surcharges. Real-time telemetry optimizes supplier inventory routes.
            </p>
            <div className="mt-3">
              <button
                onClick={() => setOwnerHudOpen(true)}
                className="text-xs text-purple-400 hover:text-purple-300 font-mono underline"
              >
                Inspect Telemetry HUD &amp; Engine Logs
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} China-to-Karachi Business Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Shenzhen Direct</span>
            <span>&middot;</span>
            <span>Yiwu Wholesale</span>
            <span>&middot;</span>
            <span>Port Qasim Logistics</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
