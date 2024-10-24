import { SortDirection, TableSortLabel } from '@mui/material';
import { PropsWithChildren } from 'react';

export type SourceSortProps<SortColumn> = PropsWithChildren<{
  column: SortColumn;
  sortColumn: SortColumn;
  setSortColumn(sortColumn: SortColumn): void;
  sortDirection: SortDirection;
  setSortDirection(sortDirection: SortDirection): void;
}>;

export function SourceSort<SortColumn>(props: SourceSortProps<SortColumn>) {
  const {
    children,
    column,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
  } = props;

  function onOrderBy() {
    setSortColumn(column);

    if (sortColumn !== column) {
      return setSortDirection('asc');
    }

    if (sortColumn === column && sortDirection === 'asc') {
      return setSortDirection('desc');
    }

    if (sortColumn === column && sortDirection === 'desc') {
      return setSortDirection('asc');
    }
  }

  return (
    <TableSortLabel
      onClick={onOrderBy}
      active={sortColumn === column}
      direction={sortDirection === 'asc' ? 'desc' : 'asc'}
    >
      {children}
    </TableSortLabel>
  );
}
