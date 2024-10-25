'use client';

import {
  adminCityEditSchema,
  AdminCityEditSchema,
  adminCityEditSchemaDefaultValues,
} from '@/lib/zod';
import { Grid2, TextField } from '@mui/material';
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
import { adminCountrySelectDialogAtom } from '@/lib/jotai';
import { AdminCountrySelectDialog } from '@/components/dialogs';

export type AdminCityEditFormProps = {
  cityId: string;
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminCityEditForm(props: AdminCityEditFormProps) {
  const { cityId, onSuccess, BackComponent } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, control, reset, setValue, watch } =
    useForm<AdminCityEditSchema>({
      resolver: zodResolver(adminCityEditSchema),
      defaultValues: adminCityEditSchemaDefaultValues,
    });
  const { mutate, isLoading } = trpc.adminCityEditMutation.useMutation({
    onSuccess(data) {
      reset();
      onSuccess();
      enqueueSnackbar(`"${data.city.name}" бүртгэгдлээ`, {
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
  const adminCityQuery = trpc.adminCityQuery.useQuery(
    { cityId },
    {
      onSuccess(data) {
        setValue('cityId', cityId);
        setValue('countryId', data.city.countryId);
        setValue('name', data.city.name);
        setValue('codeName', data.city.codeName);
      },
    }
  );
  const [selectDialog, setSelectDialog] = useAtom(adminCountrySelectDialogAtom);
  const [countryName, setCountryName] = useState('');
  trpc.adminCountryQuery.useQuery(
    { countryId: watch('countryId') },
    {
      enabled: !!watch('countryId'),
      onSuccess(data) {
        setCountryName(data.country.name);
      },
    }
  );

  function onSubmit(data: AdminCityEditSchema) {
    const snackbarId = enqueueSnackbar(`"${data.name}" бүртгэж байна`, {
      variant: 'loading',
    });

    setSnackbarId(snackbarId);

    mutate(data);
  }

  function onSelectCountry() {
    setSelectDialog({ open: true });
  }

  function onSelectCountryId(countryId: string) {
    setValue('countryId', countryId);
  }

  function onClearCountryId() {
    setValue('countryId', '');
    setCountryName('');
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

      {adminCityQuery.isLoading || adminCityQuery.isFetching ? (
        <Grid2 size={12} textAlign={'center'}>
          <LoadingStatus />
        </Grid2>
      ) : adminCityQuery.isError ? (
        <Grid2 size={12} textAlign={'center'}>
          <ErrorStatus error={adminCityQuery.error} />
        </Grid2>
      ) : !adminCityQuery.data ? (
        <Grid2 size={12} textAlign={'center'}>
          <NoDataStatus />
        </Grid2>
      ) : (
        <>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='cityId'
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
            <EditFormButton loading={isLoading} />
          </Grid2>
        </>
      )}
      <Grid2 size={12}>{BackComponent}</Grid2>

      {selectDialog.open && (
        <AdminCountrySelectDialog
          onSelect={onSelectCountryId}
          selectedCountryId={watch('countryId')}
        />
      )}
    </Grid2>
  );
}
