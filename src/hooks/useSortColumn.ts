'use client';

import { parseAsStringLiteral, useQueryState } from 'next-usequerystate';

export function useSortColumn<T extends string>(
  sortableColumns: readonly T[],
  defaultSortColumn: T
) {
  const [sortColumn, setSortColumn] = useQueryState(
    'sort_column',
    parseAsStringLiteral(sortableColumns).withDefault(defaultSortColumn)
  );

  return [sortColumn, setSortColumn] as const;
}
