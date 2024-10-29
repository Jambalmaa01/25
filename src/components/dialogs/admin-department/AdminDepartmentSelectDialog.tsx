import { adminDepartmentSelectDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDepartmentsTable } from '@/components/tables';
import { useEffect, useState } from 'react';
import {
  adminDepartmentsDefaultPage,
  adminDepartmentsDefaultSearch,
  adminDepartmentsDefaultTake,
  adminDepartmentsEndDate,
  AdminDepartmentsSortableColumn,
  adminDepartmentsSortColumn,
  adminDepartmentsSortDirection,
  adminDepartmentsStartDate,
  SortDirection,
} from '@/variables';

export type AdminDepartmentSelectDialogProps = {
  selectedDepartmentId: string;
  onSelect(cityId: string): void;
};

export function AdminDepartmentSelectDialog(
  props: AdminDepartmentSelectDialogProps
) {
  const { selectedDepartmentId, onSelect } = props;
  const [dialog, setDialog] = useAtom(adminDepartmentSelectDialogAtom);
  const [page, setPage] = useState(adminDepartmentsDefaultPage);
  const [take, setTake] = useState(adminDepartmentsDefaultTake);
  const [search, setSearch] = useState(adminDepartmentsDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useState<AdminDepartmentsSortableColumn>(
    adminDepartmentsSortColumn
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    adminDepartmentsSortDirection
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedDepartmentId ? [selectedDepartmentId] : []
  );
  const [startDate, setStartDate] = useState(adminDepartmentsStartDate);
  const [endDate, setEndDate] = useState(adminDepartmentsEndDate);

  function onClose() {
    setDialog({
      open: false,
    });
  }

  useEffect(() => {
    if (selectedIds.length) {
      onSelect(selectedIds[0]);
      onClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  return (
    <Dialog open={dialog.open} onClose={onClose} fullScreen>
      <DialogContent>
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
          selectMultiple={false}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </DialogContent>
    </Dialog>
  );
}
