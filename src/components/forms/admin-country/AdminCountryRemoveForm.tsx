'use client';

import {
  adminCountryRemoveSchema,
  AdminCountryRemoveSchema,
  adminCountryRemoveSchemaDefaultValues,
} from '@/lib/zod';
import { Alert, Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/lib/trpc/trpc';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useEffect, useState } from 'react';
import { RemoveFormButton } from '@/components/buttons';
import { ActionTypography } from '@/components/typographies';

export type AdminCountryRemoveFormProps = {
  countryIds: string[];
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminCountryRemoveForm(props: AdminCountryRemoveFormProps) {
  const { countryIds, onSuccess, BackComponent } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, reset, setValue } = useForm<AdminCountryRemoveSchema>({
    resolver: zodResolver(adminCountryRemoveSchema),
    defaultValues: adminCountryRemoveSchemaDefaultValues,
  });
  const { mutate, isLoading } = trpc.adminCountryRemoveMutation.useMutation({
    onSuccess() {
      reset();
      onSuccess();
      enqueueSnackbar(`"${countryIds.length} устгагдлаа`, {
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
  }, [setValue, countryIds]);

  function onSubmit(data: AdminCountryRemoveSchema) {
    const snackbarId = enqueueSnackbar(`${countryIds.length} устгаж байна`, {
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
        <ActionTypography>Устгах</ActionTypography>
      </Grid2>
      <Grid2 size={12}>
        <Alert severity='info'>
          Та {countryIds.length} устгахдаа итгэлтэй байна уу?
        </Alert>
      </Grid2>
      <Grid2 size={12}>
        <RemoveFormButton loading={isLoading} />
      </Grid2>
      <Grid2 size={12}>{BackComponent}</Grid2>
    </Grid2>
  );
}
