interface PaginationProps {
  page: number;
  totalPages: number;
  onChangePage: (value: number) => void;
}

export function Pagination({ page, totalPages, onChangePage }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChangePage(page - 1)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChangePage(item)}
          className={`rounded-md px-3 py-2 text-sm ${
            page === item
              ? 'bg-slate-900 text-white'
              : 'border border-slate-300 bg-white text-slate-800'
          }`}
        >
          {item}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChangePage(page + 1)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
