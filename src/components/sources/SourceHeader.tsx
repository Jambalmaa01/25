import { Box, Stack, Typography } from '@mui/material';

export type SourceHeaderProps = {
  title: string;
  total: number | undefined;
  found: number | undefined;
};

export function SourceHeader(props: SourceHeaderProps) {
  const { title, total = 0, found = 0 } = props;

  return (
    <Box my={2}>
      <Stack
        spacing={1}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant='button' fontSize={20} color='primary'>
          {title}
        </Typography>
        <Typography variant='body2'>
          Нийт {total} өгөгдлөөс хайлт шүүлт оролцуулаад {found} өгөгдөл байна
        </Typography>
      </Stack>
    </Box>
  );
}
