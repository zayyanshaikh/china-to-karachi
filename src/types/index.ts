export type UserRole = 'buyer' | 'seller' | 'admin';

export type ProductCategory = 'Gadgets' | 'RC_Cars' | 'RC_Trucks' | 'Drones';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  referralCode: string;
  karachiArea: string;
  createdAt: string;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  description: string;
  category: ProductCategory;
  pricePkr: number;
  chinaWholesalePkr: number;
  originalPricePkr?: number;
  affiliateLink: string;
  directImageUrl: string;
  galleryImages: string[];
  stockQuantity: number;
  originCity: string;
  estimatedArrivalDays: number;
  engagementScore: number;
  specs: Record<string, string>;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  deliveryKarachiDays: number;
  badge?: string;
}

export interface UserSessionEvent {
  id: string;
  userId?: string;
  visitorFingerprint: string;
  productId: string;
  productTitle: string;
  interactionType: 'click' | 'view' | 'hover' | 'affiliate_hop';
  clickTimestamp: string;
  timeSpentSeconds: number;
  affiliateCookieTriggered: boolean;
  affiliateNetwork: 'AliExpress' | 'Amazon' | 'Daraz' | 'Banggood';
  estRevenuePkr: number;
}

export interface OwnerRevenueRecord {
  id: string;
  sourceType: 'affiliate' | 'ad' | 'direct_commission';
  amountPkr: number;
  generatedBySessionId: string;
  productTitle: string;
  partner: string;
  recordedAt: string;
}
