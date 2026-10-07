import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import EngagementTracker from '../components/EngagementTracker';

export const metadata: Metadata = {
  title: 'China-to-Karachi Business Hub',
  description: 'Premier B2B & B2C marketplace for imported gadgets, RC vehicles, and electronics with integrated vendor network and smart deal analytics.',
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
  openGraph: {
    title: 'China-to-Karachi Business Hub',
    description: 'Premier B2B & B2C marketplace for imported gadgets, RC vehicles, and electronics with integrated vendor network and smart deal analytics.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased">
        {/* Global Silent Engagement & Click-to-Earn Tracker */}
        <EngagementTracker />

        {/* Top Supply Stream Notification Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-1.5 border-b border-slate-800/80 text-[11px] text-slate-400">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Shenzhen ➔ Port Qasim Cargo Terminal
              </span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-slate-400">
                24h Cash-on-Delivery Delivery Across Karachi
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-emerald-400">Customs Cleared</span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-300">Currency: <strong>PKR (₨)</strong></span>
            </div>
          </div>
        </div>

        {/* Global Header Navigation */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm">
                  C2K
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                    China<span className="text-cyan-400">➔</span>Karachi
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                    HUB
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  Direct Wholesale Imports
                </p>
              </div>
            </Link>

            {/* Category Nav Links (Next.js File-Based Routing) */}
            <nav className="hidden md:flex items-center gap-1 text-xs">
              <Link
                href="/category/rc-cars"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors font-medium"
              >
                RC Cars
              </Link>
              <Link
                href="/category/rc-trucks"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors font-medium"
              >
                RC Trucks (8x8)
              </Link>
              <Link
                href="/category/smart-gadgets"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors font-medium"
              >
                Smart Gadgets
              </Link>
              <Link
                href="/category/drones"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors font-medium"
              >
                4K Drones
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono">
                Port Qasim Ready
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Viewport Content */}
        <main className="flex-1">{children}</main>

        {/* Global Dark Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/90 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              &copy; {new Date().getFullYear()} China to Karachi Business Hub. All rights reserved.
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span>Shenzhen Bao'an</span>
              <span>&middot;</span>
              <span>Yiwu Trade City</span>
              <span>&middot;</span>
              <span>Saddar Regal Hub</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
