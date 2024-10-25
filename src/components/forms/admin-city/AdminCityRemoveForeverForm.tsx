'use client';

import {
  adminCityRemoveForeverSchema,
  AdminCityRemoveForeverSchema,
  adminCityRemoveForeverSchemaDefaultValues,
} from '@/lib/zod';
import { Alert, Grid2, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/lib/trpc/trpc';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useEffect, useState } from 'react';
import { RemoveForeverFormButton } from '@/components/buttons';
import { ActionTypography } from '@/components/typographies';

export type AdminCityRemoveForeverFormProps = {
  cityIds: string[];
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminCityRemoveForeverForm(
  props: AdminCityRemoveForeverFormProps
) {
  const { cityIds, onSuccess, BackComponent } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, reset, setValue, control } =
    useForm<AdminCityRemoveForeverSchema>({
      resolver: zodResolver(adminCityRemoveForeverSchema),
      defaultValues: adminCityRemoveForeverSchemaDefaultValues,
    });
  const { mutate, isLoading } = trpc.adminCityRemoveForeverMutation.useMutation(
    {
      onSuccess() {
        reset();
        onSuccess();
        enqueueSnackbar(`"${cityIds.length} баазаас устгагдлаа`, {
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
    }
  );

  useEffect(() => {
    setValue('cityIds', cityIds);
  }, [setValue, cityIds]);

  function onSubmit(data: AdminCityRemoveForeverSchema) {
    const snackbarId = enqueueSnackbar(
      `${cityIds.length} баазаас устгаж байна`,
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
        <ActionTypography>Баазаас устгах</ActionTypography>
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
          Та {cityIds.length} баазаас устгахдаа итгэлтэй байна уу?
        </Alert>
      </Grid2>
      <Grid2 size={12}>
        <RemoveForeverFormButton loading={isLoading} />
      </Grid2>
      <Grid2 size={12}>{BackComponent}</Grid2>
    </Grid2>
  );
}
