import { Box, Typography } from '@mui/material';
import { PageBreadcrumb } from '../common/PageBreadcrumb';

export function AdminScreen() {
  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin'} />

      <Box>
        <Typography variant='button' color='primary' fontSize={16}>
          Админ хуудас
        </Typography>
      </Box>
    </Box>
  );
}
