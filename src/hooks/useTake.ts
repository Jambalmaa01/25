'use client';

import { parseAsInteger, useQueryState } from 'next-usequerystate';

export function useTake(defaultTake: number) {
  const [take, setTake] = useQueryState(
    'take',
    parseAsInteger.withDefault(defaultTake)
  );

  return [take, setTake] as const;
}
