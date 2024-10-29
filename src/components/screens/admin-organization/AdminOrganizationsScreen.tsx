'use client';

import { Box } from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import {
  adminOrganizationsDefaultPage,
  adminOrganizationsDefaultSearch,
  adminOrganizationsDefaultTake,
  adminOrganizationsEndDate,
  adminOrganizationsSortableColumns,
  adminOrganizationsSortColumn,
  adminOrganizationsSortDirection,
  adminOrganizationsStartDate,
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
import { adminOrganizationsScreenSelectedIdsAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';
import { AdminOrganizationsTable } from '@/components/tables';

export function AdminOrganizationsScreen() {
  const [page, setPage] = usePage(adminOrganizationsDefaultPage);
  const [take, setTake] = useTake(adminOrganizationsDefaultTake);
  const [search, setSearch] = useSearch(adminOrganizationsDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useSortColumn(
    adminOrganizationsSortableColumns,
    adminOrganizationsSortColumn
  );
  const [sortDirection, setSortDirection] = useSortDirection(
    adminOrganizationsSortDirection
  );
  const [selectedIds, setSelectedIds] = useAtom(
    adminOrganizationsScreenSelectedIdsAtom
  );
  const [startDate, setStartDate] = useStartDate(adminOrganizationsStartDate);
  const [endDate, setEndDate] = useEndDate(adminOrganizationsEndDate);

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/organizations'} />

      <AdminOrganizationsTable
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
