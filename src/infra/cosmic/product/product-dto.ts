export interface ProductDto {
  id: string;
  slug: string;
  title: string;

  created_at: string;
  modified_at: string;

  thumbnail?: string;

  metadata?: {
    // --- LISTING ---
    short_description?: string;
    price?: number;
    original_price?: number;

    category?: {
      id: string;
      slug: string;
      title: string;
    };
  }
}
