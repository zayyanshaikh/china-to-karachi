# China-to-Karachi Business Hub

Premier B2B & B2C marketplace and sourcing platform for imported electronics, high-speed RC drift vehicles, heavy 8x8 transport trucks, 4K camera drones, and cyberpunk tech gadgets imported directly from Shenzhen and Yiwu factories cleared at Port Qasim, Karachi.

## Key Features

- **Direct Factory Sourcing Lines**: Clear Port Qasim supply stream connecting Karachi retailers, hobbyists, and wholesale buyers.
- **Karachi Express Cash-on-Delivery (COD)**: 24-hour door-to-door delivery across Clifton, DHA, Gulshan, Saddar, PECHS, and North Nazimabad.
- **Vendor SaaS Dashboard**: Onboarding suite allowing Karachi sellers and importers to list inventory, calculate margins, and leverage AI source link routing.
- **Smart Engagement & Telemetry**: Non-blocking engagement tracking (`/api/track-engagement`) measuring product dwell time, scroll depth, and affiliate attribution.
- **Viral Referral Engine**: Non-cash gamified SaaS perks (Ad-free browsing, VIP early drops, Seller Pro verification badge, Port Qasim direct wholesale rates).
- **Vercel & Next.js 14 App Router Ready**: Optimized production builds with SWC minification, image domains, and strict TypeScript validation.

---

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
  git clone https://github.com/zayyanshaikh/china-to-karachi.git
  cd china-to-karachi
  npm install
```

### Development Server

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the hub.

---

## Build & Deployment

### Production Build

Verify TypeScript compilation and generate the optimized production bundle:

```bash
npm run build
```

### Production Preview

Start the Next.js production server locally:

```bash
npm run start
```

### Deploying to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Import the project into the [Vercel Dashboard](https://vercel.com/new).
3. The framework preset will automatically detect **Next.js**.
4. Configure any desired Environment Variables (see below).
5. Click **Deploy**.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase PostgreSQL project URL for persistent referrals and session logs. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase public anonymous client API key. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Supabase backend service role key used in Route Handlers. |
| `GEMINI_API_KEY` | Optional | Google Gemini API key for server-side AI catalog enrichment. |
| `APP_URL` | Optional | Public URL of the deployed application. |

---

## Project Structure

```text
├── app/
│   ├── api/
│   │   ├── referrals/route.ts        # Viral referral engine & cookie attribution
│   │   └── track-engagement/route.js # Non-blocking engagement telemetry
│   ├── category/[id]/page.js         # Dynamic category pages (RC cars, drones, etc.)
│   ├── globals.css                   # Global styles & Tailwind CSS directives
│   ├── layout.tsx                    # Root Next.js layout & metadata
│   ├── not-found.tsx                 # 404 handler
│   └── page.tsx                      # Homepage & interactive sourcing showcase
├── components/                       # Client & server components
│   ├── BuyerDashboard.tsx            # Buyer profile, saved items, and order history
│   ├── CartDrawer.tsx                # Karachi COD express checkout drawer
│   ├── CategoriesGrid.tsx            # Sourcing channels grid
│   ├── EngagementTracker.js          # Silent dwell and scroll tracker
│   ├── Hero.tsx                      # 3D glassmorphic hero banner
│   ├── Navbar.tsx                    # Header with live cargo notification & search
│   ├── OwnerRevenueHUD.tsx           # Owner monetization & telemetry HUD
│   ├── ProductCard.js                # Framer-motion product card
│   ├── ProductFeed.tsx               # Product feed with dynamic sorting
│   ├── ProductModal.tsx              # Deep product specs & COD order trigger
│   ├── SellerDashboard.tsx           # Vendor SaaS suite & inventory table
│   ├── SellerTeaser.tsx              # Vendor recruitment banner & onboarding modal
│   └── ShareAndEarnModal.tsx         # Viral referral modal & SaaS perk progress
├── data/
│   └── products.ts                   # Products catalog & category definitions
├── hooks/
│   └── useEngagementTracker.ts       # React engagement tracking hook
├── services/
│   └── telemetry.ts                  # Background telemetry and analytics persistence
├── next.config.js                    # Next.js configuration (images, SWC minification)
├── tsconfig.json                     # TypeScript compiler configuration
└── package.json                      # Project dependencies and build scripts
```

---

## License

  © 2026 Zayyan Shaikh. All rights reserved.
