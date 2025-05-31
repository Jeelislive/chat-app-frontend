import React, { useEffect } from 'react'
import { Avatar, Box, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import bgimage from '../../assets/bgchatapp.jpg'
import { useInputValidation } from '6pp'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, getAdmin } from '../../redux/thunks/admin.auth';

const AdminLogin = () => {

  const {isAdmin} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {  
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
    }

    useEffect(() => {
      dispatch(getAdmin());
    }, [dispatch])

    if(isAdmin) return <Navigate to="/admin/dashboard" />

  return (
    <Box
      sx={ {
        minHeight: '100vh', // Ensure it covers the full viewport height
        background: `url(${ bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex', // Added to center the Container
        alignItems: 'center', // Added to center the Container
        justifyContent: 'center', // Added to center the Container
      } }
    >
      <Container component={ "main" } maxWidth="xs" sx={ {
        // height: '100vh', // No longer needed as parent Box handles height and centering
        display: 'flex', // Retained to ensure Paper is centered if Container has padding/margin
        justifyContent: 'center',
        alignItems: 'center',
      } }>
        <Paper elevation={ 3 } sx={ {
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: '100%', // Ensure paper takes full width of container
        } }>
          
                <Typography variant="h5">Admin Login </Typography>
                <form style={ {
                  width: '100%',
                  marginTop: '1rem'
                } }
                  onSubmit={ submitHandler }>
                  <TextField
                    required
                    fullWidth
                    label="Secret Key"
                    type='password'
                    margin='normal'
                    variant='outlined'
                    value={ secretKey.value }
                    onChange={ secretKey.changeHandler }
                  />
                  <Button
                    sx={ { marginTop: "1rem" } }
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Login
                  </Button>

                </form>
             
        </Paper>
        </Container>
    </Box>
  )
}

export default AdminLogin