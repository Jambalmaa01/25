'use client';

import { authAccessTokenAtom, authAtom } from '@/lib/jotai';
import { trpc } from '@/lib/trpc/trpc';
import {
  authSignInDefaultValues,
  authSignInSchema,
  AuthSignInSchema,
} from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Grid2, TextField, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export function AuthSignInScreen() {
  const setAuth = useSetAtom(authAtom);
  const setAuthAccessToken = useSetAtom(authAccessTokenAtom);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarId, setSnackbarId] = useState<SnackbarKey | null>(null);
  const { handleSubmit, control, reset } = useForm<AuthSignInSchema>({
    resolver: zodResolver(authSignInSchema),
    defaultValues: authSignInDefaultValues,
  });
  const { mutate, isLoading } = trpc.authSignInMutation.useMutation({
    onSuccess(data) {
      reset();
      setAuth(data.employee);
      setAuthAccessToken(data.accessToken);
      router.push(`/`);
      enqueueSnackbar(`Сайн уу? ${data.employee.firstName}`, {
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

  function onSubmit(data: AuthSignInSchema) {
    const snackbarId = enqueueSnackbar(`Нэвтэрч байна`, {
      variant: 'loading',
    });

    setSnackbarId(snackbarId);

    mutate(data);
  }

  return (
    <Grid2
      container
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
    >
      <Grid2 size={12}>
        <Typography variant='button' color='primary.main'>
          Нэвтрэх
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Controller
          control={control}
          name='username'
          render={({ field, fieldState }) => (
            <TextField
              label='Нэвтрэх нэр'
              {...field}
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <TextField
              label={'Нууц үг'}
              type='password'
              {...field}
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid2>

      <Grid2 size={12}>
        <LoadingButton loading={isLoading}>Нэвтрэх</LoadingButton>
      </Grid2>
    </Grid2>
  );
}
