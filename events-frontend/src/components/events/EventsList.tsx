import { Event } from '../../lib/types';
import { EventCard } from './EventCard';

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
