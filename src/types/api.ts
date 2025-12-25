// Laravel standard response structures
export interface PaginatedResponse<T> {
  data: T[];
  links: PaginatedResponseLinks;
  meta: PaginatedResponseMeta;
}

export interface PaginatedResponseLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginatedResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Response<T> {
  data: T;
  message?: string;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}
