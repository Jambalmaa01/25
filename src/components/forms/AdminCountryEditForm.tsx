'use client';

import {
  adminCountryEditSchema,
  AdminCountryEditSchema,
  adminCountryEditSchemaDefaultValues,
} from '@/lib/zod';
import { Grid2, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/lib/trpc/trpc';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useState } from 'react';
import { EditFormButton } from '../buttons';
import { ActionTypography } from '../typographies';
import { ErrorStatus, LoadingStatus, NoDataStatus } from '../statuses';

export type AdminCountryEditFormProps = {
  countryId: string;
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminCountryEditForm(props: AdminCountryEditFormProps) {
  const { countryId, onSuccess, BackComponent } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, control, reset, setValue } =
    useForm<AdminCountryEditSchema>({
      resolver: zodResolver(adminCountryEditSchema),
      defaultValues: adminCountryEditSchemaDefaultValues,
    });
  const { mutate, isLoading } = trpc.adminCountryEditMutation.useMutation({
    onSuccess(data) {
      reset();
      onSuccess();
      enqueueSnackbar(`"${data.country.name}" улс бүртгэгдлээ`, {
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
  const adminCountryQuery = trpc.adminCountryQuery.useQuery(
    { countryId },
    {
      onSuccess(data) {
        setValue('countryId', countryId);
        setValue('name', data.country.name);
        setValue('codeName', data.country.codeName);
      },
    }
  );

  function onSubmit(data: AdminCountryEditSchema) {
    const snackbarId = enqueueSnackbar(`"${data.name}" улс бүртгэж байна`, {
      variant: 'loading',
    });

    setSnackbarId(snackbarId);

    mutate(data);
  }

  return (
    <Grid2
      container
      spacing={2}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid2 size={12} textAlign={'center'}>
        <ActionTypography>Улс засах</ActionTypography>
      </Grid2>

      {adminCountryQuery.isLoading || adminCountryQuery.isFetching ? (
        <Grid2 size={12} textAlign={'center'}>
          <LoadingStatus />
        </Grid2>
      ) : adminCountryQuery.isError ? (
        <Grid2 size={12} textAlign={'center'}>
          <ErrorStatus error={adminCountryQuery.error} />
        </Grid2>
      ) : !adminCountryQuery.data ? (
        <Grid2 size={12} textAlign={'center'}>
          <NoDataStatus />
        </Grid2>
      ) : (
        <>
          <Grid2 size={12}>
            <Controller
              control={control}
              name='countryId'
              render={({ field, fieldState }) => (
                <TextField
                  label={'Таних дугаар'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  autoFocus
                  disabled
                  {...field}
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
                  label={'Улсын нэр'}
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
                  label={'Кодын нэр'}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  autoFocus
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
    </Grid2>
  );
}
