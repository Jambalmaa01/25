'use client';

import { Box } from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import {
  adminDistrictsDefaultPage,
  adminDistrictsDefaultSearch,
  adminDistrictsDefaultTake,
  adminDistrictsEndDate,
  adminDistrictsSortableColumns,
  adminDistrictsSortColumn,
  adminDistrictsSortDirection,
  adminDistrictsStartDate,
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
import { adminDistrictsScreenSelectedIdsAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';
import { AdminDistrictsTable } from '@/components/tables';

export function AdminDistrictsScreen() {
  const [page, setPage] = usePage(adminDistrictsDefaultPage);
  const [take, setTake] = useTake(adminDistrictsDefaultTake);
  const [search, setSearch] = useSearch(adminDistrictsDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useSortColumn(
    adminDistrictsSortableColumns,
    adminDistrictsSortColumn
  );
  const [sortDirection, setSortDirection] = useSortDirection(
    adminDistrictsSortDirection
  );
  const [selectedIds, setSelectedIds] = useAtom(
    adminDistrictsScreenSelectedIdsAtom
  );
  const [startDate, setStartDate] = useStartDate(adminDistrictsStartDate);
  const [endDate, setEndDate] = useEndDate(adminDistrictsEndDate);

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/districts'} />

      <AdminDistrictsTable
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
