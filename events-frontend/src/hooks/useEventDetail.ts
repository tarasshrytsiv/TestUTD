'use client';

import { useEffect, useState } from 'react';
import { getEventById } from '../lib/api';
import { Event } from '../lib/types';

export type EventDetailState = 'loading' | 'error' | 'success';

interface UseEventDetailResult {
  state: EventDetailState;
  event: Event | null;
  errorMessage: string | null;
}

export function useEventDetail(id: string): UseEventDetailResult {
  const [state, setState] = useState<EventDetailState>('loading');
  const [event, setEvent] = useState<Event | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchEvent() {
      setState('loading');
      setErrorMessage(null);

      try {
        const response = await getEventById(id);

        if (!isMounted) {
          return;
        }

        setEvent(response);
        setState('success');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to load event details',
        );
        setState('error');
      }
    }

    if (id) {
      fetchEvent();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { state, event, errorMessage };
}
