'use client';

import {
  adminCountryRemoveForeverSchema,
  AdminCountryRemoveForeverSchema,
  adminCountryRemoveForeverSchemaDefaultValues,
} from '@/lib/zod';
import { Alert, Grid2, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/lib/trpc/trpc';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useEffect, useState } from 'react';
import { RemoveForeverFormButton } from '../buttons';
import { ActionTypography } from '../typographies';

export type AdminCountryRemoveForeverFormProps = {
  countryIds: string[];
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminCountryRemoveForeverForm(
  props: AdminCountryRemoveForeverFormProps
) {
  const { countryIds, onSuccess, BackComponent } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, reset, setValue, control } =
    useForm<AdminCountryRemoveForeverSchema>({
      resolver: zodResolver(adminCountryRemoveForeverSchema),
      defaultValues: adminCountryRemoveForeverSchemaDefaultValues,
    });
  const { mutate, isLoading } =
    trpc.adminCountryRemoveForeverMutation.useMutation({
      onSuccess() {
        reset();
        onSuccess();
        enqueueSnackbar(`"${countryIds.length} улс баазаас устгагдлаа`, {
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

  useEffect(() => {
    setValue('countryIds', countryIds);
  }, []);

  function onSubmit(data: AdminCountryRemoveForeverSchema) {
    const snackbarId = enqueueSnackbar(
      `${countryIds.length} улс баазаас устгаж байна`,
      {
        variant: 'loading',
      }
    );

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
        <ActionTypography>Улс баазаас устгах</ActionTypography>
      </Grid2>
      <Grid2 size={12}>
        <Controller
          control={control}
          name='token'
          render={({ field, fieldState }) => (
            <TextField
              label={'Токен'}
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
              autoFocus
              {...field}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Alert severity='info'>
          Та {countryIds.length} улс баазаас устгахдаа итгэлтэй байна уу?
        </Alert>
      </Grid2>
      <Grid2 size={12}>
        <RemoveForeverFormButton loading={isLoading} />
      </Grid2>
      <Grid2 size={12}>{BackComponent}</Grid2>
    </Grid2>
  );
}
