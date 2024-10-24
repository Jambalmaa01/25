import { Button, Menu, MenuItem } from '@mui/material';
import { Fragment, useRef, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export type SourceTakeProps = {
  take: number;
  setTake(take: number): void;
  total: number | undefined;
};

const options = [1, 10, 25, 50, 100, 250, 500, 750, 1000];

export function SourceTake(props: SourceTakeProps) {
  const { take, setTake, total = 0 } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const closestLimit = options.find(option => option > total) || Infinity;

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        ref={anchorRef}
        variant='text'
        onClick={handleToggle}
        endIcon={<ArrowDropDownIcon />}
      >
        {`Хуудаслалт: ${take}`}
      </Button>
      <Menu anchorEl={anchorRef.current} open={open} onClose={handleClose}>
        {options.map(option => (
          <MenuItem
            key={option}
            selected={option === take}
            onClick={() => {
              setTake(option);
              setOpen(false);
            }}
            disabled={option > total && option !== closestLimit}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
