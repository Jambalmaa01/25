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
import { AdminOrganizationsSortableColumn } from '@/variables';
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
  adminOrganizationAddDialogAtom,
  adminOrganizationEditDialogAtom,
  adminOrganizationRemoveDialogAtom,
  adminOrganizationRemoveForeverDialogAtom,
  adminOrganizationViewDialogAtom,
} from '@/lib/jotai';
import {
  AdminOrganizationAddDialog,
  AdminOrganizationEditDialog,
  AdminOrganizationRemoveDialog,
  AdminOrganizationRemoveForeverDialog,
  AdminOrganizationViewDialog,
} from '@/components/dialogs';
import { useEffect } from 'react';
import Link from 'next/link';

export type AdminOrganizationsTableProps = {
  page: number;
  setPage: (page: number) => void;
  take: number;
  setTake: (take: number) => void;
  search: string;
  setSearch: (search: string) => void;
  localSearch: string;
  setLocalSearch: (localSearch: string) => void;
  sortColumn: AdminOrganizationsSortableColumn;
  setSortColumn: (sortColumn: AdminOrganizationsSortableColumn) => void;
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

export function AdminOrganizationsTable(props: AdminOrganizationsTableProps) {
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
    trpc.adminOrganizationsQuery.useQuery(
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
  const [addDialog, setAddDialog] = useAtom(adminOrganizationAddDialogAtom);
  const [editDialog, setEditDialog] = useAtom(adminOrganizationEditDialogAtom);
  const [removeDialog, setRemoveDialog] = useAtom(
    adminOrganizationRemoveDialogAtom
  );
  const [removeForeverDialog, setRemoveForeverDialog] = useAtom(
    adminOrganizationRemoveForeverDialogAtom
  );
  const [viewDialog, setViewDialog] = useAtom(adminOrganizationViewDialogAtom);

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

  function onEdit(organizationId: string) {
    setEditDialog({ open: true, organizationId });
  }

  function onEditSuccess() {
    refetch();
    setEditDialog({ open: false, organizationId: '' });
  }

  function onRemove(organizationId: string) {
    setRemoveDialog({ open: true, organizationIds: [organizationId] });
  }

  function onRemoveSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveDialog({ open: false, organizationIds: [] });
  }

  function onRemoveMany() {
    setRemoveDialog({ open: true, organizationIds: selectedIds });
  }

  function onRemoveForever(organizationId: string) {
    setRemoveForeverDialog({ open: true, organizationIds: [organizationId] });
  }

  function onRemoveForeverSuccess() {
    refetch();
    setSelectedIds([]);
    setRemoveForeverDialog({ open: false, organizationIds: [] });
  }

  function onRemoveForeverMany() {
    setRemoveForeverDialog({ open: true, organizationIds: selectedIds });
  }

  function onView(organizationId: string) {
    setViewDialog({ open: true, organizationId });
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
      <SourceHeader title='Анги' total={data?.total} found={data?.found} />

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
                    allIds={data?.organizations.map(result => result.id)}
                    length={data?.organizations.length}
                    selectMultiple={selectMultiple}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  />
                </TableCell>
                <TableCell>Үйлдэл</TableCell>
                <TableCell>Дэс дугаар</TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'codeName'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Отрядын дугаар
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'identityNumber'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Ангийн дугаар
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'pronunciation'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Дуудлага
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'borderRepresentative'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Хилийн төлөөлөгч
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'distanceFromWesternNeighborDetachment'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Баруун отрядаас
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'distanceFromEasternNeighborDetachment'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Зүүн отрядаас
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'distanceFromUlaanbaatar'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Улаанбаатараас
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'distanceFromCity'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Аймгаас
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'nerelberM100k'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Нэрэлбэр m100k
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
                    column={'coordinateM100k'}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                  >
                    Координэт m100k
                  </SourceSort>
                </TableCell>
                <TableCell>
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
                  <SourceSort<AdminOrganizationsSortableColumn>
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
              ) : !data || data.organizations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={99}>
                    <NoDataStatus />
                  </TableCell>
                </TableRow>
              ) : (
                data.organizations.map((country, index) => {
                  const {
                    id,
                    countryId,
                    countryName,
                    cityId,
                    cityName,
                    districtId,
                    districtName,
                    name,
                    codeName,
                    identityNumber,
                    zone,
                    direction,
                    establishmentedDate,
                    pronunciation,
                    borderRepresentative,
                    ranking,
                    electricPowerSource,
                    lengthResponsibleBorder,
                    lengthDryLand,
                    lengthWaterBoundaryLength,
                    distanceFromBorder,
                    distanceFromWestern,
                    distanceFromEastern,
                    distanceFromWesternNeighborDetachment,
                    distanceFromEasternNeighborDetachment,
                    distanceFromUlaanbaatar,
                    distanceFromCity,
                    distanceFromDistrict,
                    networkMobicom,
                    networkSkytel,
                    networkUnitel,
                    networkGmobile,
                    nerelberM100k,
                    coordinateM100k,
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
                            href={`/admin/organizations/${id}`}
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
                      <TableCell>{name}</TableCell>
                      <TableCell>{codeName}</TableCell>
                      <TableCell>{identityNumber}</TableCell>
                      <TableCell>{zone}</TableCell>
                      <TableCell>{direction}</TableCell>
                      <TableCell>{establishmentedDate}</TableCell>
                      <TableCell>{pronunciation}</TableCell>
                      <TableCell>{borderRepresentative}</TableCell>
                      <TableCell>{ranking}</TableCell>
                      <TableCell>{electricPowerSource}</TableCell>
                      <TableCell>{lengthResponsibleBorder}</TableCell>
                      <TableCell>{lengthDryLand}</TableCell>
                      <TableCell>{lengthWaterBoundaryLength}</TableCell>
                      <TableCell>{distanceFromBorder}</TableCell>
                      <TableCell>{distanceFromWestern}</TableCell>
                      <TableCell>{distanceFromEastern}</TableCell>
                      <TableCell>
                        {distanceFromWesternNeighborDetachment}
                      </TableCell>
                      <TableCell>
                        {distanceFromEasternNeighborDetachment}
                      </TableCell>
                      <TableCell>{distanceFromUlaanbaatar}</TableCell>
                      <TableCell>{distanceFromCity}</TableCell>
                      <TableCell>{distanceFromDistrict}</TableCell>
                      <TableCell>{networkMobicom}</TableCell>
                      <TableCell>{networkSkytel ? 'Байгаа' : '-'}</TableCell>
                      <TableCell>{networkUnitel ? 'Байгаа' : '-'}</TableCell>
                      <TableCell>{networkGmobile ? 'Байгаа' : '-'}</TableCell>
                      <TableCell>{nerelberM100k ? 'Байгаа' : '-'}</TableCell>
                      <TableCell>{coordinateM100k}</TableCell>
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

      {addDialog.open && (
        <AdminOrganizationAddDialog onSuccess={onAddSuccess} />
      )}
      {editDialog.open && (
        <AdminOrganizationEditDialog onSuccess={onEditSuccess} />
      )}
      {removeDialog.open && (
        <AdminOrganizationRemoveDialog onSuccess={onRemoveSuccess} />
      )}
      {removeForeverDialog.open && (
        <AdminOrganizationRemoveForeverDialog
          onSuccess={onRemoveForeverSuccess}
        />
      )}
      {viewDialog.open && <AdminOrganizationViewDialog />}
    </Box>
  );
}
