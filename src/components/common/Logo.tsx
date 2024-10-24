'use client';

import { Avatar, Stack, Typography } from '@mui/material';

export function Logo() {
  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'} p={1} px={2}>
      <Avatar
        sx={{ width: 34, height: 48 }}
        src={'/logo.png'}
        variant='rounded'
      />
      <Typography
        sx={{
          fontSize: 25,
          fontWeight: 600,
        }}
        variant='button'
        color='success.main'
      >
        Хилчин25
      </Typography>
    </Stack>
  );
}
