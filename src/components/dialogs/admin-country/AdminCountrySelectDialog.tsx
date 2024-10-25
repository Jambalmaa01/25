import { adminCountrySelectDialogAtom } from '@/lib/jotai';
import { Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminCountriesTable } from '@/components/tables';
import { useEffect, useState } from 'react';
import {
  adminCountriesDefaultPage,
  adminCountriesDefaultSearch,
  adminCountriesDefaultTake,
  adminCountriesEndDate,
  AdminCountriesSortableColumn,
  adminCountriesSortColumn,
  adminCountriesSortDirection,
  adminCountriesStartDate,
  SortDirection,
} from '@/variables';

export type AdminCountrySelectDialogProps = {
  selectedCountryId: string;
  onSelect(countryId: string): void;
};

export function AdminCountrySelectDialog(props: AdminCountrySelectDialogProps) {
  const { selectedCountryId, onSelect } = props;
  const [dialog, setDialog] = useAtom(adminCountrySelectDialogAtom);
  const [page, setPage] = useState(adminCountriesDefaultPage);
  const [take, setTake] = useState(adminCountriesDefaultTake);
  const [search, setSearch] = useState(adminCountriesDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useState<AdminCountriesSortableColumn>(
    adminCountriesSortColumn
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    adminCountriesSortDirection
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedCountryId ? [selectedCountryId] : []
  );
  const [startDate, setStartDate] = useState(adminCountriesStartDate);
  const [endDate, setEndDate] = useState(adminCountriesEndDate);

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
