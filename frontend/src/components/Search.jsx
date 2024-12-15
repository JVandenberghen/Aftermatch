import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Search = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <>
    <FormControl sx={{ width: isSmallScreen ? '60%' : '20rem' }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.background.default,
          borderRadius: '15px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon fontSize="small" className="icon" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
      </FormControl>
      </>
  );
};

export default Search;
