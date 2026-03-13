'use client';

import { useEffect, useMemo, useState } from 'react';
import { getEvents } from '../lib/api';
import { Event, EventsQuery, PaginatedResponse } from '../lib/types';

export type EventsViewState = 'loading' | 'error' | 'empty' | 'success';

interface UseEventsResult {
  state: EventsViewState;
  result: PaginatedResponse<Event> | null;
  errorMessage: string | null;
  query: Required<Pick<EventsQuery, 'page' | 'limit'>> & Omit<EventsQuery, 'page' | 'limit'>;
  setSearch: (value: string) => void;
  setDateFrom: (value: string) => void;
  setDateTo: (value: string) => void;
  setPage: (value: number) => void;
}

const DEFAULT_LIMIT = 6;

export function useEvents(): UseEventsResult {
  const [result, setResult] = useState<PaginatedResponse<Event> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [state, setState] = useState<EventsViewState>('loading');

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    let isMounted = true;

    async function fetchEvents() {
      setState('loading');
      setErrorMessage(null);

      try {
        const response = await getEvents({
          page,
          limit: DEFAULT_LIMIT,
          search: search || undefined,
          dateFrom: dateFrom || undefined,
          dateTo: dateTo || undefined,
        });

        if (!isMounted) {
          return;
        }

        setResult(response);
        setState(response.data.length ? 'success' : 'empty');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to load events',
        );
        setState('error');
      }
    }

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [page, search, dateFrom, dateTo]);

  const query = useMemo(
    () => ({
      page,
      limit: DEFAULT_LIMIT,
      search: searchInput,
      dateFrom,
      dateTo,
    }),
    [page, searchInput, dateFrom, dateTo],
  );

  return {
    state,
    result,
    errorMessage,
    query,
    setSearch: setSearchInput,
    setDateFrom: (value) => {
      setPage(1);
      setDateFrom(value);
    },
    setDateTo: (value) => {
      setPage(1);
      setDateTo(value);
    },
    setPage,
  };
}
