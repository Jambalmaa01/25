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
import { AdminDepartmentsSortableColumn } from '@/variables';
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
  adminDepartmentAddDialogAtom,
  adminDepartmentEditDialogAtom,
  adminDepartmentRemoveDialogAtom,
  adminDepartmentRemoveForeverDialogAtom,
  adminDepartmentViewDialogAtom,
} from '@/lib/jotai';
import {
  AdminDepartmentAddDialog,
  AdminDepartmentEditDialog,
  AdminDepartmentRemoveDialog,
  AdminDepartmentRemoveForeverDialog,
  AdminDepartmentViewDialog,
} from '@/components/dialogs';
import { useEffect } from 'react';
import Link from 'next/link';

export type AdminDepartmentsTableProps = {
  page: number;
  setPage: (page: number) => void;
  take: number;
  setTake: (take: number) => void;
  search: string;
  setSearch: (search: string) => void;
  localSearch: string;
  setLocalSearch: (localSearch: string) => void;
  sortColumn: AdminDepartmentsSortableColumn;
  setSortColumn: (sortColumn: AdminDepartmentsSortableColumn) => void;
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

export function AdminDepartmentsTable(props: AdminDepartmentsTableProps) {
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
    trpc.adminDepartmentsQuery.useQuery(
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
  const [addDialog, setAddDialog] = useAtom(adminDepartmentAddDialogAtom);
  const [editDialog, setEditDialog] = useAtom(adminDepartmentEditDialogAtom);
  const [removeDialog, setRemoveDialog] = useAtom(
    adminDepartmentRemoveDialogAtom
  );
  const [removeForeverDialog, setRemoveForeverDialog] = useAtom(
    adminDepartmentRemoveForeverDialogAtom
  );
  const [viewDialog, setViewDialog] = useAtom(adminDepartmentViewDialogAtom);

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

  function onEdit(departmentId: string) {
    setEditDialog({ open: true, departmentId });
  }

  function onEditSuccess() {
    refetch();
    setEditDialog({ open: false, departmentId: '' });
  }

  function onRemove(departmentId: string) {
    setRemoveDialog({ open: true, departmentIds: [departmentId] });
  }

  function onRemoveSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveDialog({ open: false, departmentIds: [] });
  }

  function onRemoveMany() {
    setRemoveDialog({ open: true, departmentIds: selectedIds });
  }

  function onRemoveForever(departmentId: string) {
    setRemoveForeverDialog({ open: true, departmentIds: [departmentId] });
  }

  function onRemoveForeverSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveForeverDialog({ open: false, departmentIds: [] });
  }

  function onRemoveForeverMany() {
    setRemoveForeverDialog({ open: true, departmentIds: selectedIds });
  }

  function onView(departmentId: string) {
    setViewDialog({ open: true, departmentId });
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
      <SourceHeader title='Салбар' total={data?.total} found={data?.found} />

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
                    allIds={data?.departments.map(result => result.id)}
                    length={data?.departments.length}
                    selectMultiple={selectMultiple}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  />
                </TableCell>
                <TableCell>Үйлдэл</TableCell>
                <TableCell>Дэс дугаар</TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'districtName'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Сум/Дүүрэг
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'organizationName'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Анги
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'codeName'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Заставын дугаар
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'identityNumber'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Салбарын дугаар
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'zone'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Бүсчлэл
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'direction'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Чиглэл
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'establishmentedDate'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Байгуулагдсан он
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'ranking'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Зэрэглэл
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'electricPowerSource'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Цахилгааны эх үүсвэр
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'beverageSource'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Ундны эх үүсвэр
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'beverageSourceNumber'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Ундны эх үүсвэрийн тоо
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'lengthResponsibleBorder'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Хариуцсан хилийн урт
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'lengthDryLand'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Хуурай газрын урт
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'lengthWaterBoundaryLength'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Усан хилийн урт
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'distanceFromBorder'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Хилээс
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'distanceFromWestern'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Баруунаас
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'distanceFromEastern'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Зүүнээс
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'distanceFromDetachment'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Отрядаас
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'distanceFromDistrict'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Сумаас
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'networkMobicom'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Mobicom сүлжээ
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'networkSkytel'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Skytel сүлжээ
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'networkUnitel'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Unitel сүлжээ
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'networkGmobile'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Gmobile сүлжээ
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
                    column={'networkVsat'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Всат сүлжээ
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
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
                  <SourceSort<AdminDepartmentsSortableColumn>
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
              ) : !data || data.departments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={99}>
                    <NoDataStatus />
                  </TableCell>
                </TableRow>
              ) : (
                data.departments.map((country, index) => {
                  const {
                    id,
                    countryId,
                    countryName,
                    cityId,
                    cityName,
                    districtId,
                    districtName,
                    organizationId,
                    organizationName,
                    name,
                    codeName,
                    identityNumber,
                    zone,
                    direction,
                    establishmentedDate,
                    ranking,
                    electricPowerSource,
                    beverageSource,
                    beverageSourceNumber,
                    lengthResponsibleBorder,
                    lengthDryLand,
                    lengthWaterBoundaryLength,
                    distanceFromBorder,
                    distanceFromWestern,
                    distanceFromEastern,
                    distanceFromDetachment,
                    distanceFromDistrict,
                    networkMobicom,
                    networkSkytel,
                    networkUnitel,
                    networkGmobile,
                    networkVsat,
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
                            href={`/admin/departments/${id}`}
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
                      <TableCell>
                        {
                          <MuiLink
                            component={Link}
                            href={`/admin/districts/${districtId}`}
                          >
                            {districtName}
                          </MuiLink>
                        }
                      </TableCell>
                      <TableCell>
                        {
                          <MuiLink
                            component={Link}
                            href={`/admin/organizations/${organizationId}`}
                          >
                            {organizationName}
                          </MuiLink>
                        }
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{codeName}</TableCell>
                      <TableCell>{identityNumber}</TableCell>
                      <TableCell>{zone}</TableCell>
                      <TableCell>{direction}</TableCell>
                      <TableCell>{establishmentedDate}</TableCell>
                      <TableCell>{ranking}</TableCell>
                      <TableCell>{electricPowerSource}</TableCell>
                      <TableCell>{beverageSource}</TableCell>
                      <TableCell>{beverageSourceNumber}</TableCell>
                      <TableCell>{lengthResponsibleBorder}</TableCell>
                      <TableCell>{lengthDryLand}</TableCell>
                      <TableCell>{lengthWaterBoundaryLength}</TableCell>
                      <TableCell>{distanceFromBorder}</TableCell>
                      <TableCell>{distanceFromWestern}</TableCell>
                      <TableCell>{distanceFromEastern}</TableCell>
                      <TableCell>{distanceFromDetachment}</TableCell>
                      <TableCell>{distanceFromDistrict}</TableCell>
                      <TableCell>{networkMobicom ? 'Байгаа' : '-'}</TableCell>
                      <TableCell>{networkSkytel ? 'Байгаа' : '-'}</TableCell>
                      <TableCell>{networkUnitel ? 'Байгаа' : '-'}</TableCell>
                      <TableCell>{networkGmobile ? 'Байгаа' : '-'}</TableCell>
                      <TableCell>{networkVsat ? 'Байгаа' : '-'}</TableCell>
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

      {addDialog.open && <AdminDepartmentAddDialog onSuccess={onAddSuccess} />}
      {editDialog.open && (
        <AdminDepartmentEditDialog onSuccess={onEditSuccess} />
      )}
      {removeDialog.open && (
        <AdminDepartmentRemoveDialog onSuccess={onRemoveSuccess} />
      )}
      {removeForeverDialog.open && (
        <AdminDepartmentRemoveForeverDialog
          onSuccess={onRemoveForeverSuccess}
        />
      )}
      {viewDialog.open && <AdminDepartmentViewDialog />}
    </Box>
  );
}
