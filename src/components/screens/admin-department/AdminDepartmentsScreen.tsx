'use client';

import { Box } from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import {
  adminDepartmentsDefaultPage,
  adminDepartmentsDefaultSearch,
  adminDepartmentsDefaultTake,
  adminDepartmentsEndDate,
  adminDepartmentsSortableColumns,
  adminDepartmentsSortColumn,
  adminDepartmentsSortDirection,
  adminDepartmentsStartDate,
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
import { adminDepartmentsScreenSelectedIdsAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';
import { AdminDepartmentsTable } from '@/components/tables';

export function AdminDepartmentsScreen() {
  const [page, setPage] = usePage(adminDepartmentsDefaultPage);
  const [take, setTake] = useTake(adminDepartmentsDefaultTake);
  const [search, setSearch] = useSearch(adminDepartmentsDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useSortColumn(
    adminDepartmentsSortableColumns,
    adminDepartmentsSortColumn
  );
  const [sortDirection, setSortDirection] = useSortDirection(
    adminDepartmentsSortDirection
  );
  const [selectedIds, setSelectedIds] = useAtom(
    adminDepartmentsScreenSelectedIdsAtom
  );
  const [startDate, setStartDate] = useStartDate(adminDepartmentsStartDate);
  const [endDate, setEndDate] = useEndDate(adminDepartmentsEndDate);

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/departments'} />

      <AdminDepartmentsTable
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
