'use client';

import {
  adminDepartmentRemoveSchema,
  AdminDepartmentRemoveSchema,
  adminDepartmentRemoveSchemaDefaultValues,
} from '@/lib/zod';
import { Alert, Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/lib/trpc/trpc';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useEffect, useState } from 'react';
import { RemoveFormButton } from '@/components/buttons';
import { ActionTypography } from '@/components/typographies';

export type AdminDepartmentRemoveFormProps = {
  departmentIds: string[];
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminDepartmentRemoveForm(
  props: AdminDepartmentRemoveFormProps
) {
  const { departmentIds, onSuccess, BackComponent } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, reset, setValue } =
    useForm<AdminDepartmentRemoveSchema>({
      resolver: zodResolver(adminDepartmentRemoveSchema),
      defaultValues: adminDepartmentRemoveSchemaDefaultValues,
    });
  const { mutate, isLoading } = trpc.adminDepartmentRemoveMutation.useMutation({
    onSuccess() {
      reset();
      onSuccess();
      enqueueSnackbar(`"${departmentIds.length} устгагдлаа`, {
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
    setValue('departmentIds', departmentIds);
  }, [setValue, departmentIds]);

  function onSubmit(data: AdminDepartmentRemoveSchema) {
    const snackbarId = enqueueSnackbar(`${departmentIds.length} устгаж байна`, {
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
          Та {departmentIds.length} устгахдаа итгэлтэй байна уу?
        </Alert>
      </Grid2>
      <Grid2 size={12}>
        <RemoveFormButton loading={isLoading} />
      </Grid2>
      <Grid2 size={12}>{BackComponent}</Grid2>
    </Grid2>
  );
}
