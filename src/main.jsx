import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { theme } from './styles/theme.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

// It's good practice to store client IDs in environment variables or a config file,
// but for this example, I'm placing it here.
// Replace with your actual Client ID or move to an environment variable.
const GOOGLE_CLIENT_ID = "1047657984544-52im42otrhik49as0h7ovsn1o7ueh6oa.apps.googleusercontent.com";

// Optimize rendering by removing React.StrictMode in production
const isDevelopment = import.meta.env.DEV;

const AppWrapper = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <CssBaseline />
          <div onContextMenu={(e) => e.preventDefault()}>
            <App />
          </div>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>
  </GoogleOAuthProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

// Only use StrictMode in development for better performance in production
if (isDevelopment) {
  root.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
} else {
  root.render(<AppWrapper />);
}
