import { adminDistrictSelectDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDistrictsTable } from '@/components/tables';
import { useEffect, useState } from 'react';
import {
  adminDistrictsDefaultPage,
  adminDistrictsDefaultSearch,
  adminDistrictsDefaultTake,
  adminDistrictsEndDate,
  AdminDistrictsSortableColumn,
  adminDistrictsSortColumn,
  adminDistrictsSortDirection,
  adminDistrictsStartDate,
  SortDirection,
} from '@/variables';

export type AdminDistrictSelectDialogProps = {
  selectedDistrictId: string;
  onSelect(cityId: string): void;
  filterCountryId?: string;
  filterCityId?: string;
};

export function AdminDistrictSelectDialog(
  props: AdminDistrictSelectDialogProps
) {
  const { selectedDistrictId, onSelect, filterCountryId, filterCityId } = props;
  const [dialog, setDialog] = useAtom(adminDistrictSelectDialogAtom);
  const [page, setPage] = useState(adminDistrictsDefaultPage);
  const [take, setTake] = useState(adminDistrictsDefaultTake);
  const [search, setSearch] = useState(adminDistrictsDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useState<AdminDistrictsSortableColumn>(
    adminDistrictsSortColumn
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    adminDistrictsSortDirection
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedDistrictId ? [selectedDistrictId] : []
  );
  const [startDate, setStartDate] = useState(adminDistrictsStartDate);
  const [endDate, setEndDate] = useState(adminDistrictsEndDate);

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
          selectMultiple={false}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          filterCountryId={filterCountryId}
          filterCityId={filterCityId}
        />
      </DialogContent>
    </Dialog>
  );
}
