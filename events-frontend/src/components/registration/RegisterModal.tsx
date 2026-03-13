'use client';

import { RegisterForm } from './RegisterForm';

interface RegisterModalProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
}

export function RegisterModal({ eventId, open, onClose }: RegisterModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Register</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <RegisterForm eventId={eventId} />
      </div>
    </div>
  );
}
