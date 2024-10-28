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
import { ErrorStatus, LoadingStatus, NoDataStatus } from '../../statuses';
import { SortDirection } from '@/variables';
import { AdminCitiesSortableColumn } from '@/variables';
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
} from '../../sources';
import { useAtom } from 'jotai';
import {
  adminCityAddDialogAtom,
  adminCityEditDialogAtom,
  adminCityRemoveDialogAtom,
  adminCityRemoveForeverDialogAtom,
  adminCityViewDialogAtom,
} from '@/lib/jotai';
import {
  AdminCityAddDialog,
  AdminCityEditDialog,
  AdminCityRemoveDialog,
  AdminCityRemoveForeverDialog,
  AdminCityViewDialog,
} from '@/components/dialogs';
import { useEffect } from 'react';
import Link from 'next/link';

export type AdminCitiesTableProps = {
  page: number;
  setPage: (page: number) => void;
  take: number;
  setTake: (take: number) => void;
  search: string;
  setSearch: (search: string) => void;
  localSearch: string;
  setLocalSearch: (localSearch: string) => void;
  sortColumn: AdminCitiesSortableColumn;
  setSortColumn: (sortColumn: AdminCitiesSortableColumn) => void;
  sortDirection: SortDirection;
  setSortDirection: (sortDirection: SortDirection) => void;
  selectedIds: string[];
  setSelectedIds: (selectedIds: string[]) => void;
  selectMultiple: boolean;
  startDate: number;
  setStartDate: (startDate: number) => void;
  endDate: number;
  setEndDate: (endDate: number) => void;

  filterCountryId?: string;
};

export function AdminCitiesTable(props: AdminCitiesTableProps) {
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

    filterCountryId,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isFetching, isError, error, refetch } =
    trpc.adminCitiesQuery.useQuery(
      {
        page,
        take,
        search,
        sortColumn,
        sortDirection,
        startDate,
        endDate,
        filterCountryId,
      },
      {
        onError(error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  const [addDialog, setAddDialog] = useAtom(adminCityAddDialogAtom);
  const [editDialog, setEditDialog] = useAtom(adminCityEditDialogAtom);
  const [removeDialog, setRemoveDialog] = useAtom(adminCityRemoveDialogAtom);
  const [removeForeverDialog, setRemoveForeverDialog] = useAtom(
    adminCityRemoveForeverDialogAtom
  );
  const [viewDialog, setViewDialog] = useAtom(adminCityViewDialogAtom);

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

  function onEdit(cityId: string) {
    setEditDialog({ open: true, cityId });
  }

  function onEditSuccess() {
    refetch();
    setEditDialog({ open: false, cityId: '' });
  }

  function onRemove(cityId: string) {
    setRemoveDialog({ open: true, cityIds: [cityId] });
  }

  function onRemoveSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveDialog({ open: false, cityIds: [] });
  }

  function onRemoveMany() {
    setRemoveDialog({ open: true, cityIds: selectedIds });
  }

  function onRemoveForever(cityId: string) {
    setRemoveForeverDialog({ open: true, cityIds: [cityId] });
  }

  function onRemoveForeverSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveForeverDialog({ open: false, cityIds: [] });
  }

  function onRemoveForeverMany() {
    setRemoveForeverDialog({ open: true, cityIds: selectedIds });
  }

  function onView(cityId: string) {
    setViewDialog({ open: true, cityId });
  }

  useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [
    search,
    startDate,
    endDate,
    take,
    sortColumn,
    sortDirection,
    setPage,
    setSelectedIds,
  ]);

  return (
    <Box>
      <SourceHeader title='Хот/Аймаг' total={data?.total} found={data?.found} />

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
          {selectedIds.length > 1 && (
            <SourceRemoveButton onClick={onRemoveMany} />
          )}
          {selectedIds.length > 1 && (
            <SourceRemoveForeverButton onClick={onRemoveForeverMany} />
          )}
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
                    allIds={data?.cities.map(result => result.id)}
                    length={data?.cities.length}
                    selectMultiple={selectMultiple}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  />
                </TableCell>
                <TableCell>Үйлдэл</TableCell>
                <TableCell>Дэс дугаар</TableCell>
                <TableCell>
                  <SourceSort<AdminCitiesSortableColumn>
                    column={'id'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Дугаар
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCitiesSortableColumn>
                    column={'countryName'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Улс
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCitiesSortableColumn>
                    column={'name'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Нэр
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCitiesSortableColumn>
                    column={'codeName'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Код
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminCitiesSortableColumn>
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
                  <SourceSort<AdminCitiesSortableColumn>
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
                  <SourceSort<AdminCitiesSortableColumn>
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
                  <SourceSort<AdminCitiesSortableColumn>
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
                  <SourceSort<AdminCitiesSortableColumn>
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
                  <SourceSort<AdminCitiesSortableColumn>
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
              ) : !data || data.cities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={99}>
                    <NoDataStatus />
                  </TableCell>
                </TableRow>
              ) : (
                data.cities.map((country, index) => {
                  const {
                    id,
                    countryId,
                    countryName,
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
                            href={`/admin/cities/${id}`}
                          >
                            {id}
                          </MuiLink>
                        }
                      </TableCell>
                      <TableCell>
                        {
                          <MuiLink
                            component={Link}
                            href={`/admin/countries/${countryId}`}
                          >
                            {countryName}
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

      {addDialog.open && <AdminCityAddDialog onSuccess={onAddSuccess} />}
      {editDialog.open && <AdminCityEditDialog onSuccess={onEditSuccess} />}
      {removeDialog.open && (
        <AdminCityRemoveDialog onSuccess={onRemoveSuccess} />
      )}
      {removeForeverDialog.open && (
        <AdminCityRemoveForeverDialog onSuccess={onRemoveForeverSuccess} />
      )}
      {viewDialog.open && <AdminCityViewDialog />}
    </Box>
  );
}
