import { Box, Button } from '@mui/material';
import Link from 'next/link';

export function HomeScreen() {
  return (
    <Box>
      <Button LinkComponent={Link} href='/admin'>
        Админ
      </Button>
    </Box>
  );
}
