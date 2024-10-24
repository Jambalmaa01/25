'use client';

import { LoadingButton } from '@mui/lab';
import RefreshIcon from '@mui/icons-material/Refresh';

export type SourceRefreshProps = {
  onRefresh(): void;
  isLoading: boolean;
  isFetching: boolean;
};

export function SourceRefresh(props: SourceRefreshProps) {
  const { onRefresh, isLoading, isFetching } = props;

  return (
    <LoadingButton
      type='button'
      onClick={onRefresh}
      loading={isLoading || isFetching}
      startIcon={<RefreshIcon />}
      fullWidth={false}
      variant='text'
    >
      Сэргээх
    </LoadingButton>
  );
}
