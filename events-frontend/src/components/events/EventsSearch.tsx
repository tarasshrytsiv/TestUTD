interface EventsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function EventsSearch({ value, onChange }: EventsSearchProps) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type="text"
      placeholder="Search events..."
      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
    />
  );
}
