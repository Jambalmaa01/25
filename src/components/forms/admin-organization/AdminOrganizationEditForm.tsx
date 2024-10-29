'use client';

import {
  adminOrganizationEditSchema,
  AdminOrganizationEditSchema,
  adminOrganizationEditSchemaDefaultValues,
} from '@/lib/zod';
import { Grid2, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/lib/trpc/trpc';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useState } from 'react';
import { EditFormButton } from '@/components/buttons';
import { ActionTypography } from '@/components/typographies';
import {
  ErrorStatus,
  LoadingStatus,
  NoDataStatus,
} from '@/components/statuses';
import { SourceSelectField } from '@/components/sources';
import { useAtom } from 'jotai';
import {
  adminCitySelectDialogAtom,
  adminCountrySelectDialogAtom,
  adminDistrictSelectDialogAtom,
} from '@/lib/jotai';
import {
  AdminCitySelectDialog,
  AdminCountrySelectDialog,
  AdminDistrictSelectDialog,
} from '@/components/dialogs';
import { zones } from '@/lib/drizzle/schemas/zonesEnum';
import { directions } from '@/lib/drizzle/schemas/directionsEnum';

export type AdminOrganizationEditFormProps = {
  organizationId: string;
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminOrganizationEditForm(
  props: AdminOrganizationEditFormProps
) {
  const { organizationId, onSuccess, BackComponent } = props;
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, control, reset, setValue, watch } =
    useForm<AdminOrganizationEditSchema>({
      resolver: zodResolver(adminOrganizationEditSchema),
      defaultValues: adminOrganizationEditSchemaDefaultValues,
    });
  const { mutate, isLoading } = trpc.adminOrganizationEditMutation.useMutation({
    onSuccess(data) {
      reset();
      setCountryName('');
      setCityName('');
      onSuccess();
      enqueueSnackbar(`"${data.organization.name}" бүртгэгдлээ`, {
        variant: 'success',
      });
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
    onSettled() {
      if (snackbarId) {
        setSnackbarId(null);
        closeSnackbar(snackbarId);
      }
    },
  });
  const adminOrganizationQuery = trpc.adminOrganizationQuery.useQuery(
    { organizationId },
    {
      onSuccess(data) {
        setValue('organizationId', organizationId);
        setValue('countryId', data.organization.countryId);
        setValue('cityId', data.organization.cityId);
        setValue('districtId', data.organization.districtId);
        setValue('name', data.organization.name);
        setValue('codeName', data.organization.codeName);
        setValue('identityNumber', data.organization.identityNumber || '');
        setValue('zone', data.organization.zone || '');
        setValue('direction', data.organization.direction || '');
        setValue(
          'establishmentedDate',
          data.organization.establishmentedDate || ''
        );
        setValue('pronunciation', data.organization.pronunciation || '');
        setValue(
          'borderRepresentative',
          data.organization.borderRepresentative || ''
        );
        setValue('ranking', data.organization.ranking || '');
        setValue(
          'electricPowerSource',
          data.organization.electricPowerSource || ''
        );
        setValue(
          'lengthResponsibleBorder',
          data.organization.lengthResponsibleBorder || 0
        );
        setValue('lengthDryLand', data.organization.lengthDryLand || 0);
        setValue(
          'lengthWaterBoundaryLength',
          data.organization.lengthWaterBoundaryLength || 0
        );
        setValue(
          'distanceFromBorder',
          data.organization.distanceFromBorder || 0
        );
        setValue(
          'distanceFromWestern',
          data.organization.distanceFromWestern || 0
        );
        setValue(
          'distanceFromEastern',
          data.organization.distanceFromEastern || 0
        );
        setValue(
          'distanceFromWesternNeighborDetachment',
          data.organization.distanceFromWesternNeighborDetachment || 0
        );
        setValue(
          'distanceFromEasternNeighborDetachment',
          data.organization.distanceFromEasternNeighborDetachment || 0
        );
        setValue(
          'distanceFromUlaanbaatar',
          data.organization.distanceFromUlaanbaatar || 0
        );
        setValue('distanceFromCity', data.organization.distanceFromCity || 0);
        setValue(
          'distanceFromDistrict',
          data.organization.distanceFromDistrict || 0
        );
        setValue(
          'distanceFromDistrict',
          data.organization.distanceFromDistrict || 0
        );
        setValue('networkMobicom', data.organization.networkMobicom || false);
        setValue('networkSkytel', data.organization.networkSkytel || false);
        setValue('networkUnitel', data.organization.networkUnitel || false);
        setValue('networkGmobile', data.organization.networkGmobile || false);
        setValue('nerelberM100k', data.organization.nerelberM100k || '');
        setValue('coordinateM100k', data.organization.coordinateM100k || '');
        setValue('x', data.organization.x || 0);
        setValue('y', data.organization.y || 0);
      },
    }
  );
  const [selectCountryDialog, setSelectCountryDialog] = useAtom(
    adminCountrySelectDialogAtom
  );
  const [selectCityDialog, setSelectCityDialog] = useAtom(
    adminCitySelectDialogAtom
  );
  const [selectDistrictDialog, setSelectDistrictDialog] = useAtom(
    adminDistrictSelectDialogAtom
  );
  trpc.adminCountryQuery.useQuery(
    { countryId: watch('countryId') },
    {
      enabled: !!watch('countryId'),
      onSuccess(data) {
        setCountryName(data.country.name);
      },
    }
  );
  trpc.adminCityQuery.useQuery(
    { cityId: watch('cityId') },
    {
      enabled: !!watch('cityId'),
      onSuccess(data) {
        setCityName(data.city.name);
      },
    }
  );
  trpc.adminDistrictQuery.useQuery(
    { districtId: watch('districtId') },
    {
      enabled: !!watch('districtId'),
      onSuccess(data) {
        setDistrictName(data.district.name);
      },
    }
  );

  function onSubmit(data: AdminOrganizationEditSchema) {
    const snackbarId = enqueueSnackbar(`"${data.name}" бүртгэж байна`, {
      variant: 'loading',
    });

    setSnackbarId(snackbarId);

    mutate(data);
  }

  function onSelectCountry() {
    setSelectCountryDialog({ open: true });
  }

  function onSelectCountryId(countryId: string) {
    setValue('countryId', countryId);

    setValue('cityId', '');
    setCityName('');
  }

  function onClearCountryId() {
    setValue('countryId', '');
    setCountryName('');

    setValue('cityId', '');
    setCityName('');
  }

  function onSelectCity() {
    setSelectCityDialog({ open: true });
  }

  function onSelectCityId(cityId: string) {
    setValue('cityId', cityId);
  }

  function onClearCityId() {
    setValue('cityId', '');
    setCityName('');
  }

  function onSelectDistrict() {
    setSelectDistrictDialog({ open: true });
  }

  function onSelectDistrictId(districtId: string) {
    setValue('districtId', districtId);
  }

  function onClearDistrictId() {
    setValue('districtId', '');
    setDistrictName('');
  }

  return (
    <Grid2
      container
      spacing={2}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid2 size={12} textAlign={'center'}>
        <ActionTypography>Засах</ActionTypography>
      </Grid2>

      {adminOrganizationQuery.isLoading || adminOrganizationQuery.isFetching ? (
        <Grid2 size={12} textAlign={'center'}>
          <LoadingStatus />
        </Grid2>
      ) : adminOrganizationQuery.isError ? (
        <Grid2 size={12} textAlign={'center'}>
          <ErrorStatus error={adminOrganizationQuery.error} />
        </Grid2>
      ) : !adminOrganizationQuery.data ? (
        <Grid2 size={12} textAlign={'center'}>
          <NoDataStatus />
        </Grid2>
      ) : (
        <>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='organizationId'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Дугаар'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  disabled
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='countryId'
              render={({ fieldState }) => (
                <SourceSelectField
                  label={'Улс'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  onSelect={onSelectCountry}
                  onClear={onClearCountryId}
                  value={countryName}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='cityId'
              render={({ fieldState }) => (
                <SourceSelectField
                  disabled={!watch('countryId')}
                  label={'Хот/Аймаг'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  onSelect={onSelectCity}
                  onClear={onClearCityId}
                  value={cityName}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='districtId'
              render={({ fieldState }) => (
                <SourceSelectField
                  disabled={!watch('cityId')}
                  label={'Сум/Дүүрэг'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  onSelect={onSelectDistrict}
                  onClear={onClearDistrictId}
                  value={districtName}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='name'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Нэр'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  autoFocus
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='codeName'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Отрядын дугаар'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='identityNumber'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Ангийн дугаар'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='x'
              render={({ field, fieldState }) => (
                <TextField
                  type='number'
                  label={'X'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='y'
              render={({ field, fieldState }) => (
                <TextField
                  type='number'
                  label={'Y'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='zone'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Бүсчлэл'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  select
                  {...field}
                >
                  {zones.map(zone => (
                    <MenuItem key={zone} value={zone}>
                      {zone}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='direction'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Чиглэл'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  select
                  {...field}
                >
                  {directions.map(direction => (
                    <MenuItem key={direction} value={direction}>
                      {direction}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='establishmentedDate'
              render={({ field, fieldState }) => (
                <TextField
                  type='date'
                  label={'Байгуулагдсан огноо'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='ranking'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Зэрэглэл'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='pronunciation'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Дуудлага'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='borderRepresentative'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Хилийн төлөөлөгч'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='electricPowerSource'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Эрчим хүчний эх үүсвэр'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='lengthResponsibleBorder'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Хариуцсан хилийн урт'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='lengthDryLand'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Хуурай газрын урт'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='lengthWaterBoundaryLength'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Усан хилийн урт'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='distanceFromWestern'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Баруунаас'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='distanceFromEastern'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Зүүнээс'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='distanceFromWesternNeighborDetachment'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Баруун отрядаас'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='distanceFromEasternNeighborDetachment'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Зүүн отрядаас'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='distanceFromBorder'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Хилээс'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='distanceFromUlaanbaatar'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Улаанбаатараас'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='distanceFromCity'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Аймгаас'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='distanceFromDistrict'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Сумаас'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='networkMobicom'
              render={({ field: { value, onChange, ...rest }, fieldState }) => (
                <TextField
                  label={'Mobicom сүлжээ'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  select
                  value={value ? '1' : '0'}
                  onChange={event => onChange(event.target.value === '1')}
                  {...rest}
                >
                  <MenuItem value={'1'}>Тийм</MenuItem>
                  <MenuItem value={'0'}>Үгүй</MenuItem>
                </TextField>
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='networkSkytel'
              render={({ field: { value, onChange, ...rest }, fieldState }) => (
                <TextField
                  label={'Skytel сүлжээ'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  select
                  value={value ? '1' : '0'}
                  onChange={event => onChange(event.target.value === '1')}
                  {...rest}
                >
                  <MenuItem value={'1'}>Тийм</MenuItem>
                  <MenuItem value={'0'}>Үгүй</MenuItem>
                </TextField>
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='networkUnitel'
              render={({ field: { value, onChange, ...rest }, fieldState }) => (
                <TextField
                  label={'Unitel сүлжээ'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  select
                  value={value ? '1' : '0'}
                  onChange={event => onChange(event.target.value === '1')}
                  {...rest}
                >
                  <MenuItem value={'1'}>Тийм</MenuItem>
                  <MenuItem value={'0'}>Үгүй</MenuItem>
                </TextField>
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='networkGmobile'
              render={({ field: { value, onChange, ...rest }, fieldState }) => (
                <TextField
                  label={'Gmobile сүлжээ'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  select
                  value={value ? '1' : '0'}
                  onChange={event => onChange(event.target.value === '1')}
                  {...rest}
                >
                  <MenuItem value={'1'}>Тийм</MenuItem>
                  <MenuItem value={'0'}>Үгүй</MenuItem>
                </TextField>
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='nerelberM100k'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Нэрэлбэр m100k'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              control={control}
              name='coordinateM100k'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Координат m100k'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <EditFormButton loading={isLoading} />
          </Grid2>
        </>
      )}
      <Grid2 size={12}>{BackComponent}</Grid2>

      {selectCountryDialog.open && (
        <AdminCountrySelectDialog
          onSelect={onSelectCountryId}
          selectedCountryId={watch('countryId')}
        />
      )}
      {selectCityDialog.open && (
        <AdminCitySelectDialog
          onSelect={onSelectCityId}
          selectedCityId={watch('cityId')}
          filterCountryId={watch('countryId') ? watch('countryId') : undefined}
        />
      )}
      {selectDistrictDialog.open && (
        <AdminDistrictSelectDialog
          onSelect={onSelectDistrictId}
          selectedDistrictId={watch('districtId')}
          filterCountryId={watch('countryId') ? watch('countryId') : undefined}
          filterCityId={watch('cityId') ? watch('cityId') : undefined}
        />
      )}
    </Grid2>
  );
}
