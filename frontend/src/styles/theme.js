import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D9CDB',  // --color-primary
    },
    gradients: {
      primary: 'linear-gradient(90deg, #2D9CDB, #56CCF2)', // Define gradient separately
    },
    secondary: {
      main: '#4CAF50',  // --color-secondary
    },
    accent: {
      main: '#F39C12',  // --color-accent
    },
    warning: {
      main: '#E74C3C',  // --color-warning
    },
    info: {
      main: '#F1C40F',  // --color-info
    },
    background: {
      default: '#F5F5F5',  // --color-background
    },
    text: {
      primary: '#333333',  // --color-text-primary
      secondary: '#ffffff',  // --color-text-secondary
    },
    border: '#DDDDDD',  // --color-border
    purple: '#9B59B6',  // --color-purple
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
