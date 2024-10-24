'use client';

import { parseAsString, useQueryState } from 'next-usequerystate';

export function useSearch(defaultSearch: string) {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault(defaultSearch)
  );

  return [search, setSearch] as const;
}
