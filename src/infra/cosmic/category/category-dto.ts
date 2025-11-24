export interface CategoryDto {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
  metadata?: {
    description?: string;
    parent?: {
      id: string;
      slug: string;
      title: string;
      thumbnail?: string;
    };
  };
}
