'use client';

import { Box } from '@mui/material';
import { PageBreadcrumb } from '../common/PageBreadcrumb';
import {
  adminCountriesDefaultPage,
  adminCountriesDefaultSearch,
  adminCountriesDefaultTake,
  adminCountriesEndDate,
  adminCountriesSortableColumns,
  adminCountriesSortColumn,
  adminCountriesSortDirection,
  adminCountriesStartDate,
} from '@/configs';
import {
  useEndDate,
  usePage,
  useSearch,
  useSortColumn,
  useSortDirection,
  useStartDate,
  useTake,
} from '@/hooks';
import { useState } from 'react';
import { adminCountriesScreenSelectedIdsAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';
import { AdminCountriesTable } from '../tables';

export function AdminCountriesScreen() {
  const [page, setPage] = usePage(adminCountriesDefaultPage);
  const [take, setTake] = useTake(adminCountriesDefaultTake);
  const [search, setSearch] = useSearch(adminCountriesDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useSortColumn(
    adminCountriesSortableColumns,
    adminCountriesSortColumn
  );
  const [sortDirection, setSortDirection] = useSortDirection(
    adminCountriesSortDirection
  );
  const [selectedIds, setSelectedIds] = useAtom(
    adminCountriesScreenSelectedIdsAtom
  );
  const [startDate, setStartDate] = useStartDate(adminCountriesStartDate);
  const [endDate, setEndDate] = useEndDate(adminCountriesEndDate);

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/countries'} />

      <AdminCountriesTable
        page={page}
        setPage={setPage}
        take={take}
        setTake={setTake}
        search={search}
        setSearch={setSearch}
        localSearch={localSearch}
        setLocalSearch={setLocalSearch}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectMultiple={true}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </Box>
  );
}
