'use client';

import { parseAsInteger, useQueryState } from 'next-usequerystate';

export function usePage(defaultPage: number) {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(defaultPage)
  );

  return [page, setPage] as const;
}
