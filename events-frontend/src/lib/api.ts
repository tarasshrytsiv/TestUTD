import { Event, EventsQuery, PaginatedResponse, RegisterDto } from './types';

const BASE = '/api/backend';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function getEvents(
  params: EventsQuery,
): Promise<PaginatedResponse<Event>> {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set('page', String(params.page));
  }

  if (params.limit) {
    searchParams.set('limit', String(params.limit));
  }

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.dateFrom) {
    searchParams.set('dateFrom', params.dateFrom);
  }

  if (params.dateTo) {
    searchParams.set('dateTo', params.dateTo);
  }

  const query = searchParams.toString();

  return request<PaginatedResponse<Event>>(`/events${query ? `?${query}` : ''}`);
}

export async function getEventById(id: string): Promise<Event> {
  return request<Event>(`/events/${id}`);
}

export async function registerForEvent(
  id: string,
  dto: RegisterDto,
): Promise<void> {
  await request<void>(`/events/${id}/register`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}
