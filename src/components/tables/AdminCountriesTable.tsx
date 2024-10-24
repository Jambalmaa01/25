'use client';

import { trpc } from '@/lib/trpc/trpc';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link as MuiLink,
} from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { ErrorStatus, LoadingStatus, NoDataStatus } from '../statuses';
import { SortDirection } from '@/variables';
import { AdminCountriesSortableColumn } from '@/configs';
import {
  SourceAddButton,
  SourceDateRange,
  SourceDivider,
  SourceEditIconButton,
  SourceGroup,
  SourceHeader,
  SourcePage,
  SourceRefresh,
  SourceRemoveButton,
  SourceRemoveForeverButton,
  SourceRemoveForeverIconButton,
  SourceRemoveIconButton,
  SourceSearch,
  SourceSelectAllCheckbox,
  SourceSelectCheckbox,
  SourceSort,
  SourceTake,
  SourceToolbar,
  SourceViewIconButton,
} from '../sources';
import { useAtom } from 'jotai';
import {
  adminCountryAddDialogAtom,
  adminCountryEditDialogAtom,
  adminCountryRemoveDialogAtom,
  adminCountryRemoveForeverDialogAtom,
  adminCountryViewDialogAtom,
} from '@/lib/jotai';
import {
  AdminCountryAddDialog,
  AdminCountryEditDialog,
  AdminCountryRemoveDialog,
  AdminCountryRemoveForeverDialog,
  AdminCountryViewDialog,
} from '../dialogs';
import { useEffect } from 'react';
import Link from 'next/link';

export type AdminCountriesTableProps = {
  page: number;
  setPage: (page: number) => void;
  take: number;
  setTake: (take: number) => void;
  search: string;
  setSearch: (search: string) => void;
  localSearch: string;
  setLocalSearch: (localSearch: string) => void;
  sortColumn: AdminCountriesSortableColumn;
  setSortColumn: (sortColumn: AdminCountriesSortableColumn) => void;
  sortDirection: SortDirection;
  setSortDirection: (sortDirection: SortDirection) => void;
  selectedIds: string[];
  setSelectedIds: (selectedIds: string[]) => void;
  selectMultiple: boolean;
  startDate: number;
  setStartDate: (startDate: number) => void;
  endDate: number;
  setEndDate: (endDate: number) => void;
};

export function AdminCountriesTable(props: AdminCountriesTableProps) {
  const {
    page,
    setPage,
    take,
    setTake,
    search,
    setSearch,
    localSearch,
    setLocalSearch,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    selectedIds,
    setSelectedIds,
    selectMultiple,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isFetching, isError, error, refetch } =
    trpc.adminCountriesQuery.useQuery(
      {
        page,
        take,
        search,
        sortColumn,
        sortDirection,
        startDate,
        endDate,
      },
      {
        onError(error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  const [addDialog, setAddDialog] = useAtom(adminCountryAddDialogAtom);
  const [editDialog, setEditDialog] = useAtom(adminCountryEditDialogAtom);
  const [removeDialog, setRemoveDialog] = useAtom(adminCountryRemoveDialogAtom);
  const [removeForeverDialog, setRemoveForeverDialog] = useAtom(
    adminCountryRemoveForeverDialogAtom
  );
  const [viewDialog, setViewDialog] = useAtom(adminCountryViewDialogAtom);

  function onRefresh() {
    refetch();
  }

  function onAdd() {
    setAddDialog({ open: true });
  }

  function onAddSuccess() {
    refetch();

    if (process.env.NODE_ENV === 'development') {
      // setAddDialog({ open: false });
    } else {
      setAddDialog({ open: false });
    }
  }

  function onEdit(countryId: string) {
    setEditDialog({ open: true, countryId });
  }

  function onEditSuccess() {
    refetch();
    setEditDialog({ open: false, countryId: '' });
  }

  function onRemove(countryId: string) {
    setRemoveDialog({ open: true, countryIds: [countryId] });
  }

  function onRemoveSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveDialog({ open: false, countryIds: [] });
  }

  function onRemoveMany() {
    setRemoveDialog({ open: true, countryIds: selectedIds });
  }

  function onRemoveForever(countryId: string) {
    setRemoveForeverDialog({ open: true, countryIds: [countryId] });
  }

  function onRemoveForeverSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveForeverDialog({ open: false, countryIds: [] });
  }

  function onRemoveForeverMany() {
    setRemoveForeverDialog({ open: true, countryIds: selectedIds });
  }

  function onView(countryId: string) {
    setViewDialog({ open: true, countryId });
  }

  useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [search, startDate, endDate, take, sortColumn, sortDirection]);

  return (
    <Box>
      <SourceHeader title='Улс' total={data?.total} found={data?.found} />

      <SourceToolbar>
        <SourceGroup>
          <SourceSearch
            search={search}
            setSearch={setSearch}
            localSearch={localSearch}
            setLocalSearch={setLocalSearch}
          />
        </SourceGroup>
        <SourceDivider />
        <SourceGroup>
          <SourceDateRange
            startDate={startDate}
            onStartDate={setStartDate}
            endDate={endDate}
            onEndDate={setEndDate}
          />
        </SourceGroup>
      </SourceToolbar>

      <SourceToolbar>
        <SourceGroup>
          <SourceAddButton onClick={onAdd} />
          <SourceRemoveButton
            disabled={!selectedIds.length}
            onClick={onRemoveMany}
          />
          <SourceRemoveForeverButton
            disabled={!selectedIds.length}
            onClick={onRemoveForeverMany}
          />
        </SourceGroup>
        <SourceDivider />
        <SourceGroup>
          <SourceRefresh
            isFetching={isFetching}
            isLoading={isLoading}
            onRefresh={onRefresh}
          />
          <SourcePage
            page={page}
            setPage={setPage}
            total={data?.total}
            take={take}
          />
          <SourceTake take={take} setTake={setTake} total={data?.total} />
        </SourceGroup>
      </SourceToolbar>

      <Paper>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <SourceSelectAllCheckbox
                    allIds={data?.countries.map(result => result.id)}
                    length={data?.countries.length}
                    selectMultiple={selectMultiple}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  />
                </TableCell>
                <TableCell>Үйлдэл</TableCell>
                <TableCell>Дэс дугаар</TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'id'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Таних дугаар
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'name'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Улсын нэр
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'codeName'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Кодын нэр
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'addedUsername'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Бүртгэсэн хэрэглэгч
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'addedAt'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Бүртгэсэн огноо
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'editedUsername'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Зассан хэрэглэгч
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'editedAt'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Зассан огноо
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'removedUsername'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Устгасан хэрэглэгч
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCountriesSortableColumn>
                    column={'removedAt'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Устгасан огноо
                  </SourceSort>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isFetching ? (
                <TableRow>
                  <TableCell colSpan={99}>
                    <LoadingStatus />
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={99}>
                    <ErrorStatus error={error} />
                  </TableCell>
                </TableRow>
              ) : !data || data.countries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={99}>
                    <NoDataStatus />
                  </TableCell>
                </TableRow>
              ) : (
                data.countries.map((country, index) => {
                  const {
                    id,
                    name,
                    codeName,
                    addedAt,
                    addedBy,
                    addedUsername,
                    editedAt,
                    editedBy,
                    editedUsername,
                    removedAt,
                    removedBy,
                    removedUsername,
                  } = country;

                  return (
                    <TableRow key={id}>
                      <TableCell padding='checkbox'>
                        <SourceSelectCheckbox
                          id={id}
                          selectedIds={selectedIds}
                          setSelectedIds={setSelectedIds}
                          selectMultiple={selectMultiple}
                        />
                      </TableCell>
                      <TableCell padding='checkbox'>
                        <SourceViewIconButton onClick={() => onView(id)} />
                        <SourceEditIconButton onClick={() => onEdit(id)} />
                        <SourceRemoveIconButton
                          onClick={() => onRemove(id)}
                          disabled={selectedIds.length > 1}
                        />
                        <SourceRemoveForeverIconButton
                          onClick={() => onRemoveForever(id)}
                          disabled={selectedIds.length > 1}
                        />
                      </TableCell>
                      <TableCell>{(page - 1) * take + (index + 1)}</TableCell>
                      <TableCell>
                        {
                          <MuiLink
                            component={Link}
                            href={`/admin/countries/${id}`}
                          >
                            {id}
                          </MuiLink>
                        }
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{codeName}</TableCell>
                      <TableCell>
                        <MuiLink
                          component={Link}
                          href={`/admin/users/${addedBy}`}
                        >
                          {addedUsername}
                        </MuiLink>
                      </TableCell>
                      <TableCell>
                        {dayjs(addedAt).format('YYYY-MM-DD HH:mm:ss')}
                      </TableCell>
                      <TableCell>
                        {editedUsername ? (
                          <MuiLink
                            component={Link}
                            href={`/admin/users/${editedBy}`}
                          >
                            {editedUsername}
                          </MuiLink>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {editedAt
                          ? dayjs(editedAt).format('YYYY-MM-DD HH:mm:ss')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {removedUsername ? (
                          <MuiLink
                            component={Link}
                            href={`/admin/users/${removedBy}`}
                          >
                            {removedUsername}
                          </MuiLink>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {removedAt
                          ? dayjs(removedAt).format('YYYY-MM-DD HH:mm:ss')
                          : '-'}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {addDialog.open && <AdminCountryAddDialog onSuccess={onAddSuccess} />}
      {editDialog.open && <AdminCountryEditDialog onSuccess={onEditSuccess} />}
      {removeDialog.open && (
        <AdminCountryRemoveDialog onSuccess={onRemoveSuccess} />
      )}
      {removeForeverDialog.open && (
        <AdminCountryRemoveForeverDialog onSuccess={onRemoveForeverSuccess} />
      )}
      {viewDialog.open && <AdminCountryViewDialog />}
    </Box>
  );
}
