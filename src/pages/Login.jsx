import React, { useState } from 'react';
import { Avatar, Box, Button, Container, IconButton, Paper, Stack, TextField, Typography, alpha, useTheme } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import GoogleIcon from '@mui/icons-material/Google';
import { VisuallyHiddenInputComponent } from '../components/styles/StyledComponents';
import { useInputValidation } from '6pp';
import { usernameValidator } from '../utils/validators';
import { useFileHandler } from '6pp';
import AnimatedLoginBackground from '../components/specific/AnimatedLoginBackground';
import axios from 'axios';
import { server } from '../constants/config';
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/reducers/auth';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google'; // Changed from useGoogleLogin

function Login() {
  const [isLogedIn, setIsLogedIn] = useState(true);
  const toggleLogin = () => setIsLogedIn((prev) => !prev);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const theme = useTheme();

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler('single');
  const dispatch = useDispatch();

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
    const toastId = toast.loading('Processing Google Sign-In...');
    try {
      // Sending idToken (credential) to the backend
      const { data } = await axios.post(
        `${server}/api/v1/user/google-login`,
        { idToken: credentialResponse.credential }, // Changed to idToken
        { withCredentials: true }
      );
      dispatch(userExist(data.user));
      toast.success(data.message || "Successfully signed in with Google!", { id: toastId });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(
        error?.response?.data?.message || "Google Sign-In failed. Please check your backend.",
        { id: toastId }
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setIsGoogleLoading(false);
    toast.error("Google Sign-In process failed. Please try again.");
    console.error('Google Login onError');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading('Signing up...');
    const formData = new FormData();
    formData.append('avatar', avatar.file);
    formData.append('name', name.value);
    formData.append('bio', bio.value);
    formData.append('username', username.value);
    formData.append('password', password.value);

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, config);
      dispatch(userExist(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Sign up failed. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading('Logging in...');

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
        username: username.value,
        password: password.value
      }, config);
      dispatch(userExist(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatedLoginBackground />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative', 
          padding: 2, 
        }}
      >
        <Container component={"main"} maxWidth="xs" sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Paper elevation={12} sx={{ 
            padding: { xs: 3, sm: 4 }, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '12px', 
            backgroundColor: alpha(theme.palette.background.paper, 0.9), 
            backdropFilter: 'blur(5px)', 
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`, 
          }}>
            {isLogedIn ? (
              <>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                  Welcome Back!
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                  Login to continue
                </Typography>
                <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleLogin}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    type='text'
                    margin='normal'
                    variant='outlined'
                    value={username.value}
                    onChange={username.changeHandler}
                    InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type='password'
                    margin='normal'
                    variant='outlined'
                    value={password.value}
                    onChange={password.changeHandler}
                    InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                  />
                  <Button
                    sx={{ marginTop: "1.5rem", padding: "0.75rem", fontWeight: "bold" }}
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    disabled={isLoading || isGoogleLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>

                  <Typography textAlign={'center'} m={"1rem 0"} sx={{ color: theme.palette.text.secondary }}>OR</Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: "1rem" }}>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                      disabled={isLoading || isGoogleLoading}
                      shape="rectangular" // Example shape
                      theme="outline" // Example theme
                      size="large" // Example size
                      width="100%" // Attempt to make it full width
                    />
                  </Box>

                  <Button
                    fullWidth
                    variant='outlined' 
                    onClick={toggleLogin}
                    disabled={isLoading || isGoogleLoading}
                    sx={{ padding: "0.75rem", fontWeight: "medium" }}
                  >
                    Create New Account
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                  Create Account
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                  Join us today!
                </Typography>
                <form style={{ width: '100%', marginTop: '0.5rem' }} onSubmit={handleSignUp}>
                  <Stack position={'relative'} width={"8rem"} margin={"0 auto 1rem auto"}> 
                    <Avatar sx={{
                      width: '8rem',
                      height: '8rem',
                      objectFit: "contain",
                      border: `2px solid ${theme.palette.primary.main}` 
                    }}
                      src={avatar.preview}
                    />
                    <IconButton sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      color: theme.palette.primary.contrastText,
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      }
                    }}
                      component="label"
                    >
                      <CameraAltIcon />
                      <VisuallyHiddenInputComponent onChange={avatar.changeHandler} type="file" />
                    </IconButton>
                  </Stack>
                  {avatar.error && (
                    <Typography m={"0.5rem auto"} width={"fit-content"} display={"block"} color='error' variant='caption'>{avatar.error}</Typography>
                  )}

                  <TextField
                    required
                    fullWidth
                    label="Name"
                    type='text'
                    margin='normal'
                    variant='outlined'
                    value={name.value}
                    onChange={name.changeHandler}
                    InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Bio"
                    type='text'
                    margin='normal'
                    variant='outlined'
                    value={bio.value}
                    onChange={bio.changeHandler}
                    InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    type='text'
                    margin='normal'
                    variant='outlined'
                    value={username.value}
                    onChange={username.changeHandler}
                    InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                  />
                  {username.error && (
                    <Typography color='error' variant='caption'>{username.error}</Typography>
                  )}
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type='password'
                    margin='normal'
                    variant='outlined'
                    value={password.value}
                    onChange={password.changeHandler}
                    InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                  />
                  {password.error && (
                    <Typography color='error' variant='caption'>{password.error}</Typography>
                  )}
                  <Button
                    sx={{ marginTop: "1.5rem", padding: "0.75rem", fontWeight: "bold" }}
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    disabled={isLoading || isGoogleLoading}
                  >
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                  </Button>
                  <Typography textAlign={'center'} m={"1rem 0"} sx={{ color: theme.palette.text.secondary }}>OR</Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: "1rem" }}>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                      disabled={isLoading || isGoogleLoading}
                      shape="rectangular"
                      theme="outline"
                      size="large"
                      width="100%"
                    />
                  </Box>

                  <Button
                    fullWidth
                    variant='outlined' 
                    onClick={toggleLogin}
                    disabled={isLoading || isGoogleLoading}
                    sx={{ padding: "0.75rem", fontWeight: "medium" }}
                  >
                    Already have an account? Login
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Login;