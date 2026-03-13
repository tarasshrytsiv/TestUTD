'use client';

import { FormEvent, useMemo, useState } from 'react';
import { registerForEvent } from '../../lib/api';
import { RegisterDto } from '../../lib/types';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface RegisterFormProps {
  eventId: string;
}

function validate(values: RegisterDto): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Required';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Required';
  }

  return errors;
}

const initialValues: RegisterDto = {
  fullName: '',
  email: '',
  phone: '',
};

export function RegisterForm({ eventId }: RegisterFormProps) {
  const [values, setValues] = useState<RegisterDto>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const canSubmit = useMemo(() => state !== 'loading', [state]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);

    setErrors(nextErrors);
    setErrorMessage('');

    if (Object.keys(nextErrors).length > 0) {
      setState('error');
      return;
    }

    try {
      setState('loading');
      await registerForEvent(eventId, values);
      setState('success');
      setValues(initialValues);
    } catch (error) {
      setState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to submit registration',
      );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-slate-700">Full name</label>
        <input
          value={values.fullName}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, fullName: event.target.value }))
          }
          className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
        />
        {errors.fullName ? (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-700">Email</label>
        <input
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
        />
        {errors.email ? (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-700">Phone</label>
        <input
          value={values.phone}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phone: event.target.value }))
          }
          className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
        />
        {errors.phone ? (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === 'loading' ? 'Submitting...' : 'Submit registration'}
      </button>

      {state === 'success' ? (
        <p className="text-sm text-emerald-700">
          Registration submitted successfully.
        </p>
      ) : null}

      {state === 'error' && errorMessage ? (
        <p className="text-sm text-red-700">{errorMessage}</p>
      ) : null}
    </form>
  );
}
