import { adminOrganizationSelectDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminOrganizationsTable } from '@/components/tables';
import { useEffect, useState } from 'react';
import {
  adminOrganizationsDefaultPage,
  adminOrganizationsDefaultSearch,
  adminOrganizationsDefaultTake,
  adminOrganizationsEndDate,
  AdminOrganizationsSortableColumn,
  adminOrganizationsSortColumn,
  adminOrganizationsSortDirection,
  adminOrganizationsStartDate,
  SortDirection,
} from '@/variables';

export type AdminOrganizationSelectDialogProps = {
  selectedOrganizationId: string;
  onSelect(cityId: string): void;
};

export function AdminOrganizationSelectDialog(
  props: AdminOrganizationSelectDialogProps
) {
  const { selectedOrganizationId, onSelect } = props;
  const [dialog, setDialog] = useAtom(adminOrganizationSelectDialogAtom);
  const [page, setPage] = useState(adminOrganizationsDefaultPage);
  const [take, setTake] = useState(adminOrganizationsDefaultTake);
  const [search, setSearch] = useState(adminOrganizationsDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] =
    useState<AdminOrganizationsSortableColumn>(adminOrganizationsSortColumn);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    adminOrganizationsSortDirection
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedOrganizationId ? [selectedOrganizationId] : []
  );
  const [startDate, setStartDate] = useState(adminOrganizationsStartDate);
  const [endDate, setEndDate] = useState(adminOrganizationsEndDate);

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
