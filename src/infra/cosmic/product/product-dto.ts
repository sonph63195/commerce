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

    // --- DETAIL ---
    description?: string; // HTML or markdown
    gallery?: string[]; // array of image URLs
    content?: string; // rich content if any
    attributes?: Record<string, string>;
  }
}
