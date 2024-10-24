'use client';

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export type SourceSearchProps = {
  search: string;
  setSearch(search: string): void;
  localSearch: string;
  setLocalSearch(localSearch: string): void;
};

export function SourceSearch(props: SourceSearchProps) {
  const { setSearch, localSearch, setLocalSearch } = props;

  return (
    <Box
      component='form'
      onSubmit={event => {
        event.preventDefault();

        setSearch(localSearch);
      }}
      sx={{ maxWidth: 250 }}
    >
      <TextField
        label={'Хайх үгээ бичнэ үү'}
        onChange={event => setLocalSearch(event.target.value)}
        value={localSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={function () {
                  setSearch('');
                  setLocalSearch('');
                }}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        autoFocus
      />
    </Box>
  );
}
