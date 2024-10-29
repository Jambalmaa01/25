'use client';

import {
  adminDepartmentEditSchema,
  AdminDepartmentEditSchema,
  adminDepartmentEditSchemaDefaultValues,
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

export type AdminDepartmentEditFormProps = {
  departmentId: string;
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminDepartmentEditForm(props: AdminDepartmentEditFormProps) {
  const { departmentId, onSuccess, BackComponent } = props;
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, control, reset, setValue, watch } =
    useForm<AdminDepartmentEditSchema>({
      resolver: zodResolver(adminDepartmentEditSchema),
      defaultValues: adminDepartmentEditSchemaDefaultValues,
    });
  const { mutate, isLoading } = trpc.adminDepartmentEditMutation.useMutation({
    onSuccess(data) {
      reset();
      setCountryName('');
      setCityName('');
      onSuccess();
      enqueueSnackbar(`"${data.department.name}" бүртгэгдлээ`, {
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
  const adminDepartmentQuery = trpc.adminDepartmentQuery.useQuery(
    { departmentId },
    {
      onSuccess(data) {
        setValue('departmentId', departmentId);
        setValue('countryId', data.department.countryId);
        setValue('cityId', data.department.cityId);
        setValue('districtId', data.department.districtId);
        setValue('name', data.department.name);
        setValue('codeName', data.department.codeName);
        setValue('identityNumber', data.department.identityNumber || '');
        setValue('zone', data.department.zone || '');
        setValue('direction', data.department.direction || '');
        setValue(
          'establishmentedDate',
          data.department.establishmentedDate || ''
        );
        setValue('ranking', data.department.ranking || '');
        setValue(
          'electricPowerSource',
          data.department.electricPowerSource || ''
        );
        setValue('beverageSource', data.department.beverageSource || '');
        setValue(
          'beverageSourceNumber',
          data.department.beverageSourceNumber || 0
        );
        setValue(
          'lengthResponsibleBorder',
          data.department.lengthResponsibleBorder || 0
        );
        setValue('lengthDryLand', data.department.lengthDryLand || 0);
        setValue(
          'lengthWaterBoundaryLength',
          data.department.lengthWaterBoundaryLength || 0
        );
        setValue('distanceFromBorder', data.department.distanceFromBorder || 0);
        setValue(
          'distanceFromWestern',
          data.department.distanceFromWestern || 0
        );
        setValue(
          'distanceFromEastern',
          data.department.distanceFromEastern || 0
        );
        setValue(
          'distanceFromDetachment',
          data.department.distanceFromDetachment || 0
        );
        setValue(
          'distanceFromDistrict',
          data.department.distanceFromDistrict || 0
        );
        setValue('networkMobicom', data.department.networkMobicom || false);
        setValue('networkSkytel', data.department.networkSkytel || false);
        setValue('networkUnitel', data.department.networkUnitel || false);
        setValue('networkGmobile', data.department.networkGmobile || false);
        setValue('networkVsat', data.department.networkVsat || false);
        setValue('x', data.department.x || 0);
        setValue('y', data.department.y || 0);
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

  function onSubmit(data: AdminDepartmentEditSchema) {
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

      {adminDepartmentQuery.isLoading || adminDepartmentQuery.isFetching ? (
        <Grid2 size={12} textAlign={'center'}>
          <LoadingStatus />
        </Grid2>
      ) : adminDepartmentQuery.isError ? (
        <Grid2 size={12} textAlign={'center'}>
          <ErrorStatus error={adminDepartmentQuery.error} />
        </Grid2>
      ) : !adminDepartmentQuery.data ? (
        <Grid2 size={12} textAlign={'center'}>
          <NoDataStatus />
        </Grid2>
      ) : (
        <>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='departmentId'
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
              name='beverageSource'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Ундны эх үүсвэр'}
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
              name='beverageSourceNumber'
              render={({ field, fieldState }) => (
                <TextField
                  type='number'
                  label={'Ундны эх үүсвэрийн тоо'}
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
              name='distanceFromDetachment'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Отрядаас'}
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
              name='networkVsat'
              render={({ field: { value, onChange, ...rest }, fieldState }) => (
                <TextField
                  label={'Всат сүлжээ'}
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
