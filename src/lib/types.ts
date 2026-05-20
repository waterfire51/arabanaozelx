export type SiteCategory = {
  id?: string;
  name: string;
  slug: string;
  iconPath?: string | null;
  sortOrder?: number;
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
  imagePath: string;
  price: number;
  compareAtPrice?: number | null;
  badge?: string | null;
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

export type SitePage = {
  id?: string;
  slug: string;
  title: string;
  body: string;
  sortOrder?: number;
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
