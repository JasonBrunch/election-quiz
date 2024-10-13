// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6f4688', 
    },
    secondary: {
      main: '#dc004e', 
    },
    background: {
      default: '#ffffff', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#171717', 
      secondary: 'rgba(255, 255, 255, 0.7)', 
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)', 
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
    borderRadius: 8, 
  },
  spacing: 8, 
});

export default theme;