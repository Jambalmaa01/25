'use client';

import {
  adminCountryAddSchema,
  AdminCountryAddSchema,
  adminCountryAddSchemaDefaultValues,
} from '@/lib/zod';
import { Grid2, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/lib/trpc/trpc';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useState } from 'react';
import { AddFormButton } from '../buttons';
import { ActionTypography } from '../typographies';

export type AdminCountryAddFormProps = {
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminCountryAddForm(props: AdminCountryAddFormProps) {
  const { onSuccess, BackComponent } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, control, reset } = useForm<AdminCountryAddSchema>({
    resolver: zodResolver(adminCountryAddSchema),
    defaultValues: adminCountryAddSchemaDefaultValues,
  });
  const { mutate, isLoading } = trpc.adminCountryAddMutation.useMutation({
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

  function onSubmit(data: AdminCountryAddSchema) {
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
        <ActionTypography>Улс бүртгэх</ActionTypography>
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
        <AddFormButton loading={isLoading} />
      </Grid2>
      <Grid2 size={12}>{BackComponent}</Grid2>
    </Grid2>
  );
}
