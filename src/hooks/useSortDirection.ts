'use client';

import { SortDirection, sortDirections } from '@/variables';
import { parseAsStringEnum, useQueryState } from 'next-usequerystate';

export function useSortDirection(defaultSortDirection: SortDirection) {
  const [sortDirection, setSortDirection] = useQueryState(
    'sort_direction',
    parseAsStringEnum([...sortDirections]).withDefault(defaultSortDirection)
  );

  return [sortDirection, setSortDirection] as const;
}
