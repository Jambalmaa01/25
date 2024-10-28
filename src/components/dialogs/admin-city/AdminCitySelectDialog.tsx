import { adminCitySelectDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCitiesTable } from '@/components/tables';
import { useEffect, useState } from 'react';
import {
  adminCitiesDefaultPage,
  adminCitiesDefaultSearch,
  adminCitiesDefaultTake,
  adminCitiesEndDate,
  AdminCitiesSortableColumn,
  adminCitiesSortColumn,
  adminCitiesSortDirection,
  adminCitiesStartDate,
  SortDirection,
} from '@/variables';

export type AdminCitySelectDialogProps = {
  selectedCityId: string;
  onSelect(cityId: string): void;
  filterCountryId?: string;
};

export function AdminCitySelectDialog(props: AdminCitySelectDialogProps) {
  const { selectedCityId, onSelect, filterCountryId } = props;
  const [dialog, setDialog] = useAtom(adminCitySelectDialogAtom);
  const [page, setPage] = useState(adminCitiesDefaultPage);
  const [take, setTake] = useState(adminCitiesDefaultTake);
  const [search, setSearch] = useState(adminCitiesDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useState<AdminCitiesSortableColumn>(
    adminCitiesSortColumn
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    adminCitiesSortDirection
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedCityId ? [selectedCityId] : []
  );
  const [startDate, setStartDate] = useState(adminCitiesStartDate);
  const [endDate, setEndDate] = useState(adminCitiesEndDate);

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
          selectMultiple={false}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          filterCountryId={filterCountryId}
        />
      </DialogContent>
    </Dialog>
  );
}
