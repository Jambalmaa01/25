'use client';

import {
  Button,
  Menu,
  MenuItem,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { dateRangeOptions } from '@/variables';
import { generateDateRange } from '@/utils';
import dayjs from 'dayjs';

export type SourceDateRangeProps = {
  startDate: number;
  onStartDate(startDate: number): void;
  endDate: number;
  onEndDate(endDate: number): void;
};

export function SourceDateRange(props: SourceDateRangeProps) {
  const { startDate, onStartDate, endDate, onEndDate } = props;
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function onClose() {
    setAnchorEl(null);
  }

  function onLocalStartDate(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      onStartDate(0);
    }

    if (isNaN(+event.target.value)) {
      onStartDate(0);
    }

    const unix = +dayjs(event.target.value).valueOf();

    onStartDate(unix);
  }

  function onLocalEndDate(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      onEndDate(0);
    }

    if (isNaN(+event.target.value)) {
      onEndDate(0);
    }

    const unix = +dayjs(event.target.value).valueOf();

    onEndDate(unix);
  }

  return (
    <Stack direction={xs ? 'column' : 'row'} spacing={1}>
      <TextField
        type='datetime-local'
        value={startDate ? dayjs(startDate).format('YYYY-MM-DD HH:mm:ss') : ''}
        onChange={onLocalStartDate}
        fullWidth={false}
        label={'Эхлэх огноо'}
      />
      <TextField
        type='datetime-local'
        value={endDate ? dayjs(endDate).format('YYYY-MM-DD HH:mm:ss') : ''}
        onChange={onLocalEndDate}
        fullWidth={false}
        label={'Дуусах огноо'}
      />
      <Button
        variant='outlined'
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Огноо
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        // sx={{ zIndex: 3 }}
      >
        {dateRangeOptions.map((option, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              const { startDate, endDate } = generateDateRange(option);

              onStartDate(startDate);
              onEndDate(endDate);

              onClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
