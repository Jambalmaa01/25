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
import { AdminDistrictsSortableColumn } from '@/variables';
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
  adminDistrictAddDialogAtom,
  adminDistrictEditDialogAtom,
  adminDistrictRemoveDialogAtom,
  adminDistrictRemoveForeverDialogAtom,
  adminDistrictViewDialogAtom,
} from '@/lib/jotai';
import {
  AdminDistrictAddDialog,
  AdminDistrictEditDialog,
  AdminDistrictRemoveDialog,
  AdminDistrictRemoveForeverDialog,
  AdminDistrictViewDialog,
} from '@/components/dialogs';
import { useEffect } from 'react';
import Link from 'next/link';

export type AdminDistrictsTableProps = {
  page: number;
  setPage: (page: number) => void;
  take: number;
  setTake: (take: number) => void;
  search: string;
  setSearch: (search: string) => void;
  localSearch: string;
  setLocalSearch: (localSearch: string) => void;
  sortColumn: AdminDistrictsSortableColumn;
  setSortColumn: (sortColumn: AdminDistrictsSortableColumn) => void;
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

export function AdminDistrictsTable(props: AdminDistrictsTableProps) {
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
    trpc.adminDistrictsQuery.useQuery(
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
  const [addDialog, setAddDialog] = useAtom(adminDistrictAddDialogAtom);
  const [editDialog, setEditDialog] = useAtom(adminDistrictEditDialogAtom);
  const [removeDialog, setRemoveDialog] = useAtom(
    adminDistrictRemoveDialogAtom
  );
  const [removeForeverDialog, setRemoveForeverDialog] = useAtom(
    adminDistrictRemoveForeverDialogAtom
  );
  const [viewDialog, setViewDialog] = useAtom(adminDistrictViewDialogAtom);

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

  function onEdit(districtId: string) {
    setEditDialog({ open: true, districtId });
  }

  function onEditSuccess() {
    refetch();
    setEditDialog({ open: false, districtId: '' });
  }

  function onRemove(districtId: string) {
    setRemoveDialog({ open: true, districtIds: [districtId] });
  }

  function onRemoveSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveDialog({ open: false, districtIds: [] });
  }

  function onRemoveMany() {
    setRemoveDialog({ open: true, districtIds: selectedIds });
  }

  function onRemoveForever(districtId: string) {
    setRemoveForeverDialog({ open: true, districtIds: [districtId] });
  }

  function onRemoveForeverSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveForeverDialog({ open: false, districtIds: [] });
  }

  function onRemoveForeverMany() {
    setRemoveForeverDialog({ open: true, districtIds: selectedIds });
  }

  function onView(districtId: string) {
    setViewDialog({ open: true, districtId });
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
      <SourceHeader
        title='Дүүрэг/Сум'
        total={data?.total}
        found={data?.found}
      />

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
                    allIds={data?.districts.map(result => result.id)}
                    length={data?.districts.length}
                    selectMultiple={selectMultiple}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  />
                </TableCell>
                <TableCell>Үйлдэл</TableCell>
                <TableCell>Дэс дугаар</TableCell>
                <TableCell>
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
                    column={'cityName'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Хот/Аймаг
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
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
                  <SourceSort<AdminDistrictsSortableColumn>
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
              ) : !data || data.districts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={99}>
                    <NoDataStatus />
                  </TableCell>
                </TableRow>
              ) : (
                data.districts.map((country, index) => {
                  const {
                    id,
                    countryId,
                    countryName,
                    cityId,
                    cityName,
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
                            href={`/admin/districts/${id}`}
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
                      <TableCell>
                        {
                          <MuiLink
                            component={Link}
                            href={`/admin/cities/${cityId}`}
                          >
                            {cityName}
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

      {addDialog.open && <AdminDistrictAddDialog onSuccess={onAddSuccess} />}
      {editDialog.open && <AdminDistrictEditDialog onSuccess={onEditSuccess} />}
      {removeDialog.open && (
        <AdminDistrictRemoveDialog onSuccess={onRemoveSuccess} />
      )}
      {removeForeverDialog.open && (
        <AdminDistrictRemoveForeverDialog onSuccess={onRemoveForeverSuccess} />
      )}
      {viewDialog.open && <AdminDistrictViewDialog />}
    </Box>
  );
}
