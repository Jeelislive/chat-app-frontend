import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { theme } from './styles/theme.js'
import { GoogleOAuthProvider } from '@react-oauth/google';

// Replace with your actual Client ID or move to an environment variable.
const GOOGLE_CLIENT_ID = "1047657984544-52im42otrhik49as0h7ovsn1o7ueh6oa.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
  </React.StrictMode>,
)
