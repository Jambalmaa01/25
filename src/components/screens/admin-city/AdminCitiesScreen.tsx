'use client';

import { Box } from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import {
  adminCitiesDefaultPage,
  adminCitiesDefaultSearch,
  adminCitiesDefaultTake,
  adminCitiesEndDate,
  adminCitiesSortableColumns,
  adminCitiesSortColumn,
  adminCitiesSortDirection,
  adminCitiesStartDate,
} from '@/variables';
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
import { adminCitiesScreenSelectedIdsAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';
import { AdminCitiesTable } from '@/components/tables';

export function AdminCitiesScreen() {
  const [page, setPage] = usePage(adminCitiesDefaultPage);
  const [take, setTake] = useTake(adminCitiesDefaultTake);
  const [search, setSearch] = useSearch(adminCitiesDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useSortColumn(
    adminCitiesSortableColumns,
    adminCitiesSortColumn
  );
  const [sortDirection, setSortDirection] = useSortDirection(
    adminCitiesSortDirection
  );
  const [selectedIds, setSelectedIds] = useAtom(
    adminCitiesScreenSelectedIdsAtom
  );
  const [startDate, setStartDate] = useStartDate(adminCitiesStartDate);
  const [endDate, setEndDate] = useEndDate(adminCitiesEndDate);

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/cities'} />

      <AdminCitiesTable
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
