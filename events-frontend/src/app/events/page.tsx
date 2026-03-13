'use client';

import { DateFilter } from '../../components/events/DateFilter';
import { EventsList } from '../../components/events/EventsList';
import { EventsSearch } from '../../components/events/EventsSearch';
import { Pagination } from '../../components/events/Pagination';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Spinner } from '../../components/ui/Spinner';
import { useEvents } from '../../hooks/useEvents';

export default function EventsPage() {
  const { state, result, errorMessage, query, setSearch, setDateFrom, setDateTo, setPage } =
    useEvents();

  return (
    <main className="mx-auto max-w-5xl p-4 py-8 sm:p-6">
      <h1 className="text-3xl font-bold text-slate-900">Events</h1>

      <section className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <EventsSearch value={query.search ?? ''} onChange={setSearch} />
        <DateFilter
          dateFrom={query.dateFrom ?? ''}
          dateTo={query.dateTo ?? ''}
          onChangeDateFrom={setDateFrom}
          onChangeDateTo={setDateTo}
        />
      </section>

      <section className="mt-6">
        {state === 'loading' ? <Spinner /> : null}

        {state === 'error' ? (
          <ErrorState message={errorMessage ?? 'Failed to load events'} />
        ) : null}

        {state === 'empty' ? (
          <EmptyState
            title="No events found"
            description="Try changing search or date filters."
          />
        ) : null}

        {state === 'success' && result ? (
          <div className="space-y-4">
            <EventsList events={result.data} />
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              onChangePage={setPage}
            />
          </div>
        ) : null}
      </section>
    </main>
  );
}
