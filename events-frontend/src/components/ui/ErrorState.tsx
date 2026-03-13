interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-red-700">
      {message}
    </div>
  );
}
