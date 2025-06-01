import { createTheme } from '@mui/material/styles';
import {
  primaryDark,
  secondaryDark,
  paperDark,
  textPrimaryDark,
  textSecondaryDark,
  accentDark,
  accentDarkHover,
  borderDark,
  hoverDark,
  // disabledDark, // Not used in current theme structure, can be added if needed
  // disabledTextDark, // Not used in current theme structure, can be added if needed
  orange, // This is now accentDark
  lightBlue, // This is now a dark theme compatible blue
  matBlack, // This is now primaryDark
  grayColor, // This is now secondaryDark
  typeing, // This is now textSecondaryDark
} from '../constants/color';

// Drastically simplify theme for testing
export const theme = createTheme({});

// Keep typography and components commented out or minimal if palette is the issue
/*
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Keep button text case as defined
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryDark, // AppBar background
          color: textPrimaryDark, // AppBar text color
          borderBottom: `1px solid ${borderDark}`, // Optional: add a subtle border
        },
      },
    },
    // MuiDrawer override moved down and consolidated
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          color: textPrimaryDark, // Ensure button text is readable
        },
        containedPrimary: {
          backgroundColor: accentDark,
          color: textPrimaryDark, // Ensure text on primary button is readable
          '&:hover': {
            backgroundColor: accentDarkHover,
          },
        },
        containedSecondary: {
          backgroundColor: lightBlue, // Using the dark-theme compatible light blue
          color: primaryDark, // Text color for secondary button might need to be dark for contrast
          '&:hover': {
            backgroundColor: '#408DA6', // A slightly darker shade for hover
          },
        },
        outlined: {
          borderColor: borderDark,
          color: textSecondaryDark,
          '&:hover': {
            backgroundColor: hoverDark,
            borderColor: accentDark,
          }
        }
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: borderDark,
            },
            '&:hover fieldset': {
              borderColor: accentDark,
            },
            '&.Mui-focused fieldset': {
              borderColor: accentDark,
            },
          },
          '& .MuiInputLabel-root': {
            color: textSecondaryDark,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: accentDark,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: paperDark, // Card background
          boxShadow: '0px 5px 15px rgba(0,0,0,0.2)', // Darker shadow for dark theme
          border: `1px solid ${borderDark}`, // Optional: subtle border for cards
        },
      },
    },
    MuiPaper: { // General Paper component styling
        styleOverrides: {
            root: {
                backgroundColor: paperDark,
                border: `1px solid ${borderDark}`,
            }
        }
    },
    MuiDrawer: { // Ensure Drawer also uses dark theme colors
        styleOverrides: {
            paper: {
                backgroundColor: secondaryDark, // Drawer background
                color: textPrimaryDark,
                borderRight: `1px solid ${borderDark}`, // For left-anchored drawers
            },
        },
    },
    MuiListItemText: { // Ensure list item text is readable
        styleOverrides: {
            primary: {
                color: textPrimaryDark,
            },
            secondary: {
                color: textSecondaryDark,
            }
        }
    },
    MuiIconButton: { // Ensure icon buttons are styled correctly
        styleOverrides: {
            root: {
                color: textSecondaryDark,
                '&:hover': {
                    backgroundColor: hoverDark,
                    color: accentDark,
                }
            }
        }
    },
    MuiMenu: {
        styleOverrides: {
            paper: {
                backgroundColor: paperDark,
                border: `1px solid ${borderDark}`,
            }
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                color: textPrimaryDark,
                '&:hover': {
                    backgroundColor: hoverDark,
                }
            }
        }
    },
    // Add other component overrides as needed for a complete dark theme
  },
});
*/