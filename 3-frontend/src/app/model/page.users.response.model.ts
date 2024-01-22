export interface RestPageResponse<T> {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
  [key: string]: T[] | number; // Use union type to allow array or number values
}