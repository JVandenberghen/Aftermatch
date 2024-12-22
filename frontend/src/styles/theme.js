import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D9CDB',
    },
    gradients: {
      primary: 'linear-gradient(90deg, #2D9CDB, #56CCF2)',
    },
    secondary: {
      main: '#4CAF50',
    },
    accent: {
      main: '#F39C12',
    },
    error: {
      main: '#E74C3C',
    },
    success: {
      main: '#4CAF50',
    },
    info: {
      main: '#F1C40F',
    },
    grey: {
      main: '#cececeba',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: '#333333',  
      secondary: '#ffffff',  
      tertiary: '#cececeba',
    },
    border: '#DDDDDD', 
    purple: '#9B59B6', 
  },
  breakpoints: {
      xs: 0,        // Extra small devices (phones)
      sm: 600,      // Small devices (tablets)
      md: 960,      // Medium devices (default laptops)
      lg: 1280,     // Large devices (desktops)
      xl: 1920,     // Extra large devices (large screens)
  },
});

export default theme;
