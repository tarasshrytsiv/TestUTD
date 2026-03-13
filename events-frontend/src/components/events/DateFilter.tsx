interface DateFilterProps {
  dateFrom: string;
  dateTo: string;
  onChangeDateFrom: (value: string) => void;
  onChangeDateTo: (value: string) => void;
}

export function DateFilter({
  dateFrom,
  dateTo,
  onChangeDateFrom,
  onChangeDateTo,
}: DateFilterProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm text-slate-700">
        Date from
        <input
          type="date"
          value={dateFrom}
          onChange={(event) => onChangeDateFrom(event.target.value)}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-slate-700">
        Date to
        <input
          type="date"
          value={dateTo}
          onChange={(event) => onChangeDateTo(event.target.value)}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
        />
      </label>
    </div>
  );
}
