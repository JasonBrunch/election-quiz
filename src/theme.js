// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Replace with your primary color
    },
    secondary: {
      main: '#dc004e', // Replace with your secondary color
    },
    background: {
      default: '#ffffff', // Use your background variable or color
      paper: '#ffffff', // Paper background
    },
    text: {
      primary: '#171717', // Use your foreground variable or color
      secondary: 'rgba(255, 255, 255, 0.7)', // Example for secondary text
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)', // Use the Roboto font
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8, // Default border radius for components
  },
  spacing: 8, // Default spacing unit
});

export default theme;