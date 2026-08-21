export type SiteCategory = {
  id?: string;
  name: string;
  slug: string;
  iconPath?: string | null;
  sortOrder?: number;
  active?: boolean;
};

export type SiteProductVariant = {
  id?: string;
  label: string;
  quantity: number;
  unitPrice: number;
  shipmentPrice: number;
  sortOrder?: number;
};

export type SiteProduct = {
  id?: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  seoBody?: string | null;
  imagePath: string;
  price: number;
  compareAtPrice?: number | null;
  badge?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  ogImagePath?: string | null;
  active?: boolean;
  featured?: boolean;
  customizable?: boolean;
  sortOrder?: number;
  category?: SiteCategory | null;
  variants: SiteProductVariant[];
};

export type SiteHeroSlide = {
  id?: string;
  title?: string | null;
  subtitle?: string | null;
  imagePath: string;
  href?: string | null;
  sortOrder?: number;
};

export type SiteHomeVideo = {
  videoPath: string;
  href?: string | null;
  active?: boolean;
};

export type SitePage = {
  id?: string;
  slug: string;
  title: string;
  body: string;
  status?: "DRAFT" | "PUBLISHED";
  sortOrder?: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
};

export type SiteSettings = {
  id?: string;
  siteName: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultMetaKeywords?: string | null;
  titleTemplate: string;
  logoPath: string;
  faviconPath: string;
  ogImagePath?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  contactWhatsapp?: string | null;
};

export type SiteGalleryImage = {
  id: string;
  imagePath: string;
  url: string;
  caption?: string | null;
  sortOrder?: number;
  active?: boolean;
};

export type SiteBlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  body: string;
  coverImagePath?: string | null;
  status?: "DRAFT" | "PUBLISHED";
  publishedAt?: string | Date | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  ogImagePath?: string | null;
  author?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type SiteOrder = {
  id: string;
  orderNo: string;
  customerFirstName: string;
  customerLastName: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  status: string;
  subtotal: number;
  shipmentTotal: number;
  total: number;
  createdAt: Date;
};
