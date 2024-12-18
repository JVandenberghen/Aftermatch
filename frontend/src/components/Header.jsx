import {
  Avatar,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
} from '@mui/material';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { useTheme } from '@emotion/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

import OptionsMenu from './OptionsMenu';
import MenuButton from './MenuButton';
import Search from './Search';
import { routes, secondaryRoutes } from './MenuItems';

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useSelector((state) => !!state.session.token);

  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pr: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px', 
        backgroundColor: theme.palette.primary.main,
        zIndex: 1200,
        py: 1,
        boxShadow: '10px 0 20px rgba(0, 0, 0, 0.4)',
      }}
      spacing={2}
    > 
      
      <Stack direction="row" sx={{ ml: '0.25rem !important', alignItems: 'center', justifyContent: 'center'}}>
        {!isSmallScreen &&
          <Button component={Link} to="/login" sx={{ p: 0, mr: 10 }}>
            <Box component="header" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1 }}>
              <img src="/Aftermatch.png" alt="Logo" style={{ width: '13em', height: '6em' }} />
            </Box>
          </Button>
        }
        <Search />
        {isSmallScreen &&
          <MenuButton aria-label="Open settings" className="icon">
            {secondaryRoutes.find(route => route.text === 'Settings').icon}
          </MenuButton>
        }
      </Stack>
      {isSmallScreen ? (
        <List sx={{ display: 'flex', flexDirection: 'row' }}>
          {routes.map((item, index) => (
            <ListItem key={index} sx={{ p: 0, width: '3rem' }}>
              <ListItemButton
                component={Link}
                to={item.route}
                sx={{ p: 0, borderRadius: '50px' }}
              >
                <ListItemIcon
                  className="icon"
                  sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : ( 
          <>
           {isAuthenticated ? <Stack
              direction="row"
                sx={{ py: 2.5, px: 2,  gap: 1, alignItems: 'center'}}
            >
              <Avatar
                sizes="small"
                alt="Jasper Vandenberghen"
                sx={{ width: 36, height: 36 }}
              />
              <Box sx={{ mx: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, lineHeight: '12px', color: theme.palette.text.secondary }}
                >
                  Jasper Vandenberghen
                </Typography>
              </Box>
              <MenuButton showBadge aria-label="Open notifications" className="icon">
                <NotificationsRoundedIcon />
              </MenuButton>
              <OptionsMenu />
            </Stack>
            : 
              <Button
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.text.secondary,
                  px: 2,
                  py: 1.25,
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                  marginLeft: '0.5rem !important',
                  borderRadius: '15px',
                  gap: 1,
                  '&:hover': {
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
                    backgroundColor: theme.palette.background.default,
                  },
                }}>
                <Typography>
                  Login
              </Typography>
              <LoginIcon />
            </Button>
          }
          </>
      )}
    </Stack>
  );
};

export default Header;

