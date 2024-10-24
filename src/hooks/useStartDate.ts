'use client';

import { useQueryState, parseAsInteger } from 'next-usequerystate';

export function useStartDate(defaultDate: number) {
  const [startDate, setStartDate] = useQueryState(
    'start_date',
    parseAsInteger.withDefault(defaultDate)
  );

  return [startDate, setStartDate] as const;
}
