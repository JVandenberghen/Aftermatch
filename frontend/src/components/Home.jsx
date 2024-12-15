import Box from '@mui/material/Box';

import MainGrid from './MainGrid';

const Home = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box component="main">
            <MainGrid />
        </Box>
      </Box>
    </>
  );
};

export default Home;
