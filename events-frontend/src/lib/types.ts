export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  shortDescription: string;
  description?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  phone: string;
}

export interface EventsQuery {
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}
