import { Button, Stack, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export type SourcePageProps = {
  page: number;
  setPage(page: number): void;
  total: number | undefined;
  take: number | undefined;
};

export function SourcePage(props: SourcePageProps) {
  const { page, setPage, total = 0, take = 0 } = props;

  function onFirstPage() {
    setPage(1);
  }

  function onPreviousPage() {
    if (page - 1 > 0) setPage(page - 1);
  }

  function onNextPage() {
    if (page + 1 <= Math.ceil(total / take)) setPage(page + 1);
  }

  function onLastPage() {
    setPage(Math.ceil(total / take));
  }

  return (
    <Stack direction='row'>
      {page > 1 && (
        <Tooltip title='Эхний хуудас'>
          <Button
            onClick={onFirstPage}
            sx={{ px: 0, mx: 0, minWidth: 27 }}
            variant='text'
          >
            <KeyboardDoubleArrowLeftIcon fontSize='small' />
          </Button>
        </Tooltip>
      )}
      {!(page - 1 < 1) && (
        <Tooltip title='Өмнөх хуудас'>
          <Button
            onClick={onPreviousPage}
            sx={{ px: 0, mx: 0, minWidth: 27 }}
            variant='text'
          >
            <ChevronLeftIcon fontSize='small' />
          </Button>
        </Tooltip>
      )}
      <Button
        sx={{ px: 1, mx: 0, minWidth: 27 }}
        variant='text'
        disableRipple
      >{`Хуудас: ${page}`}</Button>
      {!(Math.ceil(total / take) <= page) && (
        <Tooltip title='Дараагийн хуудас'>
          <Button
            onClick={onNextPage}
            sx={{ px: 0, mx: 0, minWidth: 27 }}
            variant='text'
          >
            <ChevronRightIcon fontSize='small' />
          </Button>
        </Tooltip>
      )}
      {!(page === Math.ceil(total / take)) && (
        <Tooltip title='Сүүлийн хуудас'>
          <Button
            onClick={onLastPage}
            sx={{ px: 0, mx: 0, minWidth: 27 }}
            variant='text'
          >
            <KeyboardDoubleArrowRightIcon fontSize='small' />
          </Button>
        </Tooltip>
      )}
    </Stack>
  );
}
