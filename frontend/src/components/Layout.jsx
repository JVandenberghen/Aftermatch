import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import SideMenu from '../components/SideMenu';
import Header from '../components/Header';

const Layout = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Header />
            <SideMenu />
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    marginLeft: isSmallScreen ? 0 : '250px', 
                    px: isSmallScreen ? '0.5rem' : '2rem',
                    pt: '5rem',
                    pb: '2rem',
                }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
