export interface PaginatedResult<T> {
  total: number;
  limit?: number;
  skip?: number;
  data: T[];
}
