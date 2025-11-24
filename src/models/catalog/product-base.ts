export interface ProductBase {
  id: string;
  slug: string;
  title: string;

  thumbnailUrl?: string;
  price?: number;
  originalPrice?: number;

  createdAt: Date;
  modifiedAt: Date;
}
