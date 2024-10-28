'use client';

import {
  adminDistrictAddSchema,
  AdminDistrictAddSchema,
  adminDistrictAddSchemaDefaultValues,
} from '@/lib/zod';
import { Grid2, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/lib/trpc/trpc';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useState } from 'react';
import { AddFormButton } from '@/components/buttons';
import { ActionTypography } from '@/components/typographies';
import { useAtom } from 'jotai';
import {
  adminCitySelectDialogAtom,
  adminCountrySelectDialogAtom,
} from '@/lib/jotai';
import {
  AdminCitySelectDialog,
  AdminCountrySelectDialog,
} from '@/components/dialogs';
import { SourceSelectField } from '@/components/sources';

export type AdminDistrictAddFormProps = {
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminDistrictAddForm(props: AdminDistrictAddFormProps) {
  const { onSuccess, BackComponent } = props;
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, control, reset, setValue, watch } =
    useForm<AdminDistrictAddSchema>({
      resolver: zodResolver(adminDistrictAddSchema),
      defaultValues: adminDistrictAddSchemaDefaultValues,
    });
  const { mutate, isLoading } = trpc.adminDistrictAddMutation.useMutation({
    onSuccess(data) {
      reset();
      onSuccess();
      setCountryName('');
      setCityName('');
      enqueueSnackbar(`"${data.district.name}" бүртгэгдлээ`, {
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
  const [selectCountryDialog, setSelectCountryDialog] = useAtom(
    adminCountrySelectDialogAtom
  );
  const [selectCityDialog, setSelectCityDialog] = useAtom(
    adminCitySelectDialogAtom
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

  function onSubmit(data: AdminDistrictAddSchema) {
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

  return (
    <Grid2
      container
      spacing={2}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid2 size={12} textAlign={'center'}>
        <ActionTypography>Бүртгэх</ActionTypography>
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
      <Grid2 size={12}>
        <Controller
          control={control}
          name='codeName'
          render={({ field, fieldState }) => (
            <TextField
              label={'Код'}
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <AddFormButton loading={isLoading} />
      </Grid2>
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
    </Grid2>
  );
}
