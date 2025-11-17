
export interface ApiError {
  status: number;
  message: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}