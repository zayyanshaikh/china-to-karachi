'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingCart, 
  Activity, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  currentView: 'marketplace' | 'seller' | 'buyer';
  onSelectView: (view: 'marketplace' | 'seller' | 'buyer') => void;
  activeCategory: ProductCategory | 'All';
  onSelectCategory: (cat: ProductCategory | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSellerModal: () => void;
  onOpenShareModal: () => void;
  onToggleOwnerHud: () => void;
  ownerHudOpen: boolean;
  liveRevenuePkr: number;
}

export const Navbar = ({
  currentView,
  onSelectView,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenShareModal,
  onToggleOwnerHud,
  ownerHudOpen,
  liveRevenuePkr,
}: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-1.5 border-b border-slate-800/50 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Direct Shenzhen-to-Karachi Cargo Stream
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-rose-400" />
              Port Qasim Container Clearance · 24h KHI Express
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleOwnerHud}
              title="Click to view secret affiliate telemetry engine"
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded transition-all text-xs font-mono font-medium ${
                ownerHudOpen
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Owner Engine:</span>
              <span className="text-emerald-400 font-semibold">₨ {liveRevenuePkr.toLocaleString()}</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Currency: <strong className="text-slate-200">PKR</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onSelectCategory('All')} 
            className="cursor-pointer group flex items-center gap-2.5"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-lg">
                C2K
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  China<span className="text-cyan-400">➔</span>Karachi
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono font-medium">
                  HUB
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Wholesale Gadgets &amp; RC Motors
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 75km/h RC drift, 8x8 trucks, GaN chargers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons & View Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onSelectView('marketplace')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                currentView === 'marketplace'
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hub
            </button>
            <button
              onClick={() => onSelectView('seller')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                currentView === 'seller'
                  ? 'bg-purple-900/60 text-purple-300 font-semibold shadow-sm border border-purple-500/30'
                  : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              Seller SaaS
            </button>
            <button
              onClick={() => onSelectView('buyer')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                currentView === 'buyer'
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Buyer Profile
            </button>
          </div>

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Share &amp;</span> VIP
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
            aria-label="Open Shopping Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-2.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search RC cars, trucks, gadgets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
