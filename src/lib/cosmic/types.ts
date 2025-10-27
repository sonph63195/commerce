export interface Object {
  id: string
  slug: string
  title: string
  bucket: string
  created_at: string
  modified_at: string
  status: string
  thumbnail: string
  published_at: string
  modified_by: string
  publish_at: any
  type: string
  metadata: Metadata
}

export interface Metadata {
  content: string
  image: Image
  published_date: string
  author: Author
}

export interface Image {
  url: string
  imgix_url: string
}

export interface Author {
  title: string
}
