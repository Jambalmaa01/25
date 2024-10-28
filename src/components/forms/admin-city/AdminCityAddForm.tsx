'use client';

import {
  adminCityAddSchema,
  AdminCityAddSchema,
  adminCityAddSchemaDefaultValues,
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
import { adminCountrySelectDialogAtom } from '@/lib/jotai';
import { AdminCountrySelectDialog } from '@/components/dialogs';
import { SourceSelectField } from '@/components/sources';

export type AdminCityAddFormProps = {
  onSuccess(): void;
  BackComponent: ReactNode;
};

export function AdminCityAddForm(props: AdminCityAddFormProps) {
  const { onSuccess, BackComponent } = props;
  const [countryName, setCountryName] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, control, reset, setValue, watch } =
    useForm<AdminCityAddSchema>({
      resolver: zodResolver(adminCityAddSchema),
      defaultValues: adminCityAddSchemaDefaultValues,
    });
  const { mutate, isLoading } = trpc.adminCityAddMutation.useMutation({
    onSuccess(data) {
      reset();
      onSuccess();
      setCountryName('');
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
  const [selectDialog, setSelectDialog] = useAtom(adminCountrySelectDialogAtom);
  trpc.adminCountryQuery.useQuery(
    { countryId: watch('countryId') },
    {
      enabled: !!watch('countryId'),
      onSuccess(data) {
        setCountryName(data.country.name);
      },
    }
  );

  function onSubmit(data: AdminCityAddSchema) {
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

      {selectDialog.open && (
        <AdminCountrySelectDialog
          onSelect={onSelectCountryId}
          selectedCountryId={watch('countryId')}
        />
      )}
    </Grid2>
  );
}
