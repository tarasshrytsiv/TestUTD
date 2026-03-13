'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { RegisterModal } from '../../../components/registration/RegisterModal';
import { ErrorState } from '../../../components/ui/ErrorState';
import { Spinner } from '../../../components/ui/Spinner';
import { useEventDetail } from '../../../hooks/useEventDetail';
import { formatDate } from '../../../lib/utils';

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state, event, errorMessage } = useEventDetail(eventId);

  return (
    <main className="mx-auto max-w-4xl p-4 py-8 sm:p-6">
      <Link href="/events" className="text-sm text-slate-600 hover:text-slate-900">
        &larr; Back to events
      </Link>

      {state === 'loading' ? <Spinner /> : null}

      {state === 'error' ? (
        <div className="mt-4">
          <ErrorState message={errorMessage ?? 'Failed to load event details'} />
        </div>
      ) : null}

      {state === 'success' && event ? (
        <article className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-bold text-slate-900">{event.title}</h1>
          <p className="mt-2 text-slate-600">{event.location}</p>
          <p className="mt-1 text-slate-600">{formatDate(event.date)}</p>
          <p className="mt-4 text-slate-800">{event.shortDescription}</p>
          <p className="mt-3 text-slate-700">{event.description}</p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          >
            Register
          </button>

          <RegisterModal
            eventId={event.id}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </article>
      ) : null}
    </main>
  );
}
