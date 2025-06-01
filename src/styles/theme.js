import { createTheme } from '@mui/material/styles';

// Using a very minimal theme for Vercel debugging
export const theme = createTheme({
  palette: {
    mode: 'dark', // MUI needs at least a mode or some basic palette structure
                  // to avoid potential internal defaults issues.
  },
});