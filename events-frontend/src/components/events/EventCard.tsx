import Link from 'next/link';
import { Event } from '../../lib/types';
import { formatDate } from '../../lib/utils';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-slate-500">{formatDate(event.date)}</p>
      <h2 className="mt-1 text-xl font-semibold text-slate-900">{event.title}</h2>
      <p className="mt-2 text-sm text-slate-600">{event.location}</p>
      <p className="mt-3 text-slate-700">{event.shortDescription}</p>

      <Link
        href={`/events/${event.id}`}
        className="mt-4 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        View details
      </Link>
    </article>
  );
}
