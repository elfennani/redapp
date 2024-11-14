export interface ListingResponse<T> {
  after?: string | null;
  before?: string | null;
  dist?: number | null;
  children: T[];
}
