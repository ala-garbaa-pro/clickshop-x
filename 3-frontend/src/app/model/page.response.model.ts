export interface PageResponse<T> {
  _embedded: {
    [key: string]: T[];
  };
  _links: {
    self: { href: string };
    profile: { href: string };
    search: { href: string };
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}