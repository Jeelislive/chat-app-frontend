import { createTheme } from '@mui/material/styles';
// import {
//   primaryDark,
//   secondaryDark,
//   paperDark,
//   textPrimaryDark,
//   textSecondaryDark,
//   accentDark,
//   accentDarkHover,
//   borderDark,
//   hoverDark,
//   // disabledDark, // Not used in current theme structure, can be added if needed
//   // disabledTextDark, // Not used in current theme structure, can be added if needed
//   orange, // This is now accentDark
//   lightBlue, // This is now a dark theme compatible blue
//   matBlack, // This is now primaryDark
//   grayColor, // This is now secondaryDark
//   typeing, // This is now textSecondaryDark
// } from '../constants/color';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#3B82F6", // Was accentDark
    },
    secondary: {
      main: "#50A6C2", // Was lightBlue
    },
    background: {
      default: "#121212", // Was primaryDark
      paper: "#242424",   // Was paperDark
    },
    text: {
      primary: "#EAEAEA",    // Was textPrimaryDark
      secondary: "#B0B0B0", // Was textSecondaryDark
    },
  }, // Added comma here
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
          backgroundColor: "#1E1E1E", // Was secondaryDark
          color: "#EAEAEA", // Was textPrimaryDark
          borderBottom: '1px solid #333333', // Was borderDark
        },
      },
    },
    // MuiDrawer override moved down and consolidated
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          color: "#EAEAEA", // Was textPrimaryDark
        },
        containedPrimary: {
          backgroundColor: "#3B82F6", // Was accentDark
          color: "#EAEAEA", // Was textPrimaryDark
          '&:hover': {
            backgroundColor: "#2563EB", // Was accentDarkHover
          },
        },
        containedSecondary: {
          backgroundColor: "#50A6C2", // Was lightBlue
          color: "#121212", // Was primaryDark
          '&:hover': {
            backgroundColor: '#408DA6', // A slightly darker shade for hover
          },
        },
        outlined: {
          borderColor: "#333333", // Was borderDark
          color: "#B0B0B0", // Was textSecondaryDark
          '&:hover': {
            backgroundColor: "#2A2A2A", // Was hoverDark
            borderColor: "#3B82F6", // Was accentDark
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
              borderColor: "#333333", // Was borderDark
            },
            '&:hover fieldset': {
              borderColor: "#3B82F6", // Was accentDark
            },
            '&.Mui-focused fieldset': {
              borderColor: "#3B82F6", // Was accentDark
            },
          },
          '& .MuiInputLabel-root': {
            color: "#B0B0B0", // Was textSecondaryDark
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: "#3B82F6", // Was accentDark
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: "#242424", // Was paperDark
          boxShadow: '0px 5px 15px rgba(0,0,0,0.2)', // Darker shadow for dark theme
          border: '1px solid #333333', // Was borderDark
        },
      },
    },
    MuiPaper: { // General Paper component styling
        styleOverrides: {
            root: {
                backgroundColor: "#242424", // Was paperDark
                border: '1px solid #333333', // Was borderDark
            }
        }
    },
    MuiDrawer: { // Ensure Drawer also uses dark theme colors
        styleOverrides: {
            paper: {
                backgroundColor: "#1E1E1E", // Was secondaryDark
                color: "#EAEAEA", // Was textPrimaryDark
                borderRight: '1px solid #333333', // Was borderDark
            },
        },
    },
    MuiListItemText: { // Ensure list item text is readable
        styleOverrides: {
            primary: {
                color: "#EAEAEA", // Was textPrimaryDark
            },
            secondary: {
                color: "#B0B0B0", // Was textSecondaryDark
            }
        }
    },
    MuiIconButton: { // Ensure icon buttons are styled correctly
        styleOverrides: {
            root: {
                color: "#B0B0B0", // Was textSecondaryDark
                '&:hover': {
                    backgroundColor: "#2A2A2A", // Was hoverDark
                    color: "#3B82F6", // Was accentDark
                }
            }
        }
    },
    MuiMenu: {
        styleOverrides: {
            paper: {
                backgroundColor: "#242424", // Was paperDark
                border: '1px solid #333333', // Was borderDark
            }
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                color: "#EAEAEA", // Was textPrimaryDark
                '&:hover': {
                    backgroundColor: "#2A2A2A", // Was hoverDark
                }
            }
        }
    },
    // Add other component overrides as needed for a complete dark theme
  },
});