import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-rc-01',
    sellerId: 'seller-khi-01',
    sellerName: 'Shenzhen Direct Imports KHI',
    title: 'WLtoys 144001 Brushless 4WD 75km/h High-Speed RC Drift Racer',
    description: 'Aircraft-grade aluminum chassis with oil-filled metal shock absorbers. Imported directly via Port Qasim cargo channel. Ready-to-run with 2.4GHz proportional transmitter.',
    category: 'RC_Cars',
    pricePkr: 14850,
    chinaWholesalePkr: 8900,
    originalPricePkr: 19500,
    affiliateLink: 'https://www.aliexpress.com/item/1005006248911024.html?aff_fcid=c2k_hub_karachi_ref892',
    directImageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'
    ],
    stockQuantity: 18,
    originCity: 'Shenzhen, China',
    estimatedArrivalDays: 2,
    engagementScore: 1420,
    rating: 4.9,
    reviewCount: 88,
    deliveryKarachiDays: 1,
    badge: 'Hot Seller KHI',
    isFeatured: true,
    specs: {
      'Top Speed': '75 km/h',
      'Scale': '1:14 Proportional',
      'Battery': '7.4V 2600mAh Li-Po',
      'Motor': '550 Magnetic High-Torque',
      'Chassis': 'CNC T6 Anodized Aluminum',
      'Delivery': 'Same-Day Clifton & Gulshan'
    }
  },
  {
    id: 'prod-truck-02',
    sellerId: 'seller-khi-02',
    sellerName: 'Al-Madina Cargo Electronics (Saddar)',
    title: 'Double E E561-003 8x8 Heavy-Duty RC Military Transport Truck',
    description: 'Heavy steel leaf spring suspension, simulated diesel exhaust sound, and dual-ratio transmission. Capable of carrying up to 10kg payload across rough terrain.',
    category: 'RC_Trucks',
    pricePkr: 32500,
    chinaWholesalePkr: 19800,
    originalPricePkr: 38900,
    affiliateLink: 'https://www.aliexpress.com/item/1005005820491102.html?aff_fcid=c2k_hub_karachi_ref893',
    directImageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
    ],
    stockQuantity: 7,
    originCity: 'Yiwu, China',
    estimatedArrivalDays: 3,
    engagementScore: 980,
    rating: 4.8,
    reviewCount: 42,
    deliveryKarachiDays: 2,
    badge: 'Heavy Duty 8x8',
    isFeatured: true,
    specs: {
      'Drive': '8-Wheel Full Independent 8x8',
      'Payload Capacity': '10.5 kg (Payload tested)',
      'Sound Module': 'V8 Turbo Diesel Engine Sim',
      'Range': '150 meters 2.4Ghz',
      'Import Batch': 'Customs Cleared Sept 2026'
    }
  },
  {
    id: 'prod-drone-03',
    sellerId: 'seller-khi-01',
    sellerName: 'Shenzhen Direct Imports KHI',
    title: 'KF102 Max 4K EIS Dual-Camera GPS Brushless Foldable Drone',
    description: '3-axis mechanical gimbal with electronic image stabilization. Optical flow positioning, 35-minute flight time, and laser 360° obstacle avoidance radar.',
    category: 'Drones',
    pricePkr: 28900,
    chinaWholesalePkr: 17500,
    originalPricePkr: 34999,
    affiliateLink: 'https://www.amazon.com/dp/B0CXB7G81K?tag=c2kkarachihub-20',
    directImageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
    ],
    stockQuantity: 12,
    originCity: 'Shenzhen, China',
    estimatedArrivalDays: 2,
    engagementScore: 2310,
    rating: 4.9,
    reviewCount: 156,
    deliveryKarachiDays: 1,
    badge: '4K EIS + Laser Radar',
    isFeatured: true,
    specs: {
      'Video Quality': '4K UHD 60fps EIS Gimbal',
      'Flight Duration': '35 Minutes per battery',
      'Transmission': '5G Digital FPV (1.2 KM)',
      'Radar': '360° Omnidirectional Laser',
      'Spare Props': '4x Extra Sets Included'
    }
  },
  {
    id: 'prod-gadget-04',
    sellerId: 'seller-khi-03',
    sellerName: 'Karachi Tech Bazaar (Regal Chowk)',
    title: 'Cyberpunk 100W GaN 4-Port Fast Station with Smart IPS Power Screen',
    description: 'See exact voltage, wattage, and temperature for your MacBook, iPhone, and Android devices in real-time. Futuristic transparent mechanical case with active cooling.',
    category: 'Gadgets',
    pricePkr: 7499,
    chinaWholesalePkr: 4200,
    originalPricePkr: 9800,
    affiliateLink: 'https://www.aliexpress.com/item/1005007198210334.html?aff_fcid=c2k_hub_karachi_ref894',
    directImageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    stockQuantity: 35,
    originCity: 'Dongguan, China',
    estimatedArrivalDays: 1,
    engagementScore: 1850,
    rating: 5.0,
    reviewCount: 94,
    deliveryKarachiDays: 1,
    badge: 'Best Tech Gadget',
    isFeatured: true,
    specs: {
      'Output': '100W Max PD 3.0 + QC 4.0',
      'Screen': '1.3-inch Full Color IPS',
      'Ports': '3x USB-C + 1x USB-A 22.5W',
      'Safety': 'Multi-protect Overcurrent IC'
    }
  },
  {
    id: 'prod-rc-05',
    sellerId: 'seller-khi-01',
    sellerName: 'Shenzhen Direct Imports KHI',
    title: 'HSP 94123 1/10 Electric On-Road Drift RC Car (Metal Upgrade Kit)',
    description: 'High-speed professional drift chassis with carbon fiber shock tower, alloy drive shafts, and ultra-slick drift tires. Tuned for precision corner slides.',
    category: 'RC_Cars',
    pricePkr: 24500,
    chinaWholesalePkr: 15200,
    originalPricePkr: 29900,
    affiliateLink: 'https://www.aliexpress.com/item/1005006450123984.html?aff_fcid=c2k_hub_karachi_ref895',
    directImageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80'
    ],
    stockQuantity: 9,
    originCity: 'Shenzhen, China',
    estimatedArrivalDays: 3,
    engagementScore: 1640,
    rating: 4.7,
    reviewCount: 51,
    deliveryKarachiDays: 1,
    badge: 'Pro Drift Spec',
    specs: {
      'Scale': '1:10 Full Proportional',
      'Drive': 'Shaft-Driven 4WD with Ball Diffs',
      'Top Speed': '60 km/h Slick Drift',
      'Chassis': 'Reinforced Carbon Polymer'
    }
  },
  {
    id: 'prod-truck-06',
    sellerId: 'seller-khi-02',
    sellerName: 'Al-Madina Cargo Electronics (Saddar)',
    title: 'Huina 1580 Full Metal Hydraulic Excavator (Heavy Commercial Grade)',
    description: 'Full die-cast zinc alloy body weighing over 7.5kg. Unlimited 360-degree turret rotation, realistic smoke generator, and high-pressure hydraulic boom cylinders.',
    category: 'RC_Trucks',
    pricePkr: 89000,
    chinaWholesalePkr: 58000,
    originalPricePkr: 110000,
    affiliateLink: 'https://www.aliexpress.com/item/1005005432190876.html?aff_fcid=c2k_hub_karachi_ref896',
    directImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    stockQuantity: 4,
    originCity: 'Guangzhou, China',
    estimatedArrivalDays: 4,
    engagementScore: 3100,
    rating: 5.0,
    reviewCount: 37,
    deliveryKarachiDays: 1,
    badge: 'Collector Grade 7.5kg',
    specs: {
      'Weight': '7.8 kg Solid Zinc Alloy',
      'Channels': '23 Proportional Radio Channels',
      'Boom Force': 'Real Metal Digging Power',
      'Smoke System': 'Mineral Oil Simulated Exhaust'
    }
  },
  {
    id: 'prod-gadget-07',
    sellerId: 'seller-khi-03',
    sellerName: 'Karachi Tech Bazaar (Regal Chowk)',
    title: 'RGB Transparent Cyberpunk Wireless Gaming Earbuds (Ultra 38ms Low Latency)',
    description: 'See-through aerospace polycarbonate charging capsule. Custom 13mm titanium diaphragm drivers with intelligent active ENC noise cancellation for crystal clear Karachi voice calls.',
    category: 'Gadgets',
    pricePkr: 4299,
    chinaWholesalePkr: 2150,
    originalPricePkr: 6499,
    affiliateLink: 'https://www.aliexpress.com/item/1005006900192834.html?aff_fcid=c2k_hub_karachi_ref897',
    directImageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    stockQuantity: 45,
    originCity: 'Shenzhen, China',
    estimatedArrivalDays: 1,
    engagementScore: 2950,
    rating: 4.8,
    reviewCount: 210,
    deliveryKarachiDays: 1,
    badge: 'Trending Viral',
    specs: {
      'Bluetooth': 'v5.4 Dual Mode',
      'Latency': '38ms Ultra-Low Gaming',
      'Battery Life': '32 Hours Total Playback',
      'Waterproof': 'IPX5 Sweat & Dust Resistance'
    }
  },
  {
    id: 'prod-drone-08',
    sellerId: 'seller-khi-01',
    sellerName: 'Shenzhen Direct Imports KHI',
    title: 'GEPRC CineLog35 V2 HD FPV Cinewhoop Drone (DJI O3 Compatible)',
    description: 'Acoustic-dampened inverted pusher frame engineered for buttery cinematic footage through tight urban Karachi environments and indoor warehouse shots.',
    category: 'Drones',
    pricePkr: 72000,
    chinaWholesalePkr: 48500,
    originalPricePkr: 85000,
    affiliateLink: 'https://www.banggood.com/custlink/33DvK7H89Z',
    directImageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
    ],
    stockQuantity: 5,
    originCity: 'Shenzhen, China',
    estimatedArrivalDays: 3,
    engagementScore: 1980,
    rating: 4.9,
    reviewCount: 31,
    deliveryKarachiDays: 1,
    badge: 'Cinematic FPV Master',
    specs: {
      'Frame': '3.5-inch Inverted Pusher CineLog',
      'Video Transmission': 'DJI O3 Air Unit Ready',
      'Motors': 'SPEEDX2 2105.5 2650KV',
      'Top Speed': '115 km/h Acro Mode'
    }
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'Gadgets',
    name: 'Smart Gadgets',
    description: 'Cyberpunk tech, GaN fast chargers, transparent EDC gear & audio imports.',
    count: '180+ Active Imports',
    iconName: 'Cpu',
    tag: 'Trending Now',
    accentColor: 'from-cyan-500/20 to-cyan-500/5',
    borderColor: 'group-hover:border-cyan-500/60',
    textColor: 'text-cyan-400'
  },
  {
    id: 'RC_Cars',
    name: 'RC Cars & Drifters',
    description: 'Brushless 70km/h 4WD buggies, carbon-fiber drift racers & rock crawlers.',
    count: '64 Models in KHI',
    iconName: 'Car',
    tag: 'Extreme Speed',
    accentColor: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'group-hover:border-purple-500/60',
    textColor: 'text-purple-400'
  },
  {
    id: 'RC_Trucks',
    name: 'RC Trucks & Heavy Machinery',
    description: '8x8 military haulers, full hydraulic metal excavators & container lorries.',
    count: '38 Commercial Grades',
    iconName: 'Truck',
    tag: 'Die-Cast Metal',
    accentColor: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'group-hover:border-amber-500/60',
    textColor: 'text-amber-400'
  },
  {
    id: 'Drones',
    name: 'Drones & FPV Quadcopters',
    description: '4K GPS obstacle-avoidance folding drones, cinewhoops & FPV goggles.',
    count: '45 Aerial Rigs',
    iconName: 'Plane',
    tag: '4K UHD Aerial',
    accentColor: 'from-rose-500/20 to-rose-500/5',
    borderColor: 'group-hover:border-rose-500/60',
    textColor: 'text-rose-400'
  }
];
