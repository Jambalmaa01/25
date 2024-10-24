'use client';

import { useQueryState, parseAsInteger } from 'next-usequerystate';

export function useEndDate(defaultDate: number) {
  const [endDate, setEndDate] = useQueryState(
    'end_date',
    parseAsInteger.withDefault(defaultDate)
  );

  return [endDate, setEndDate] as const;
}
