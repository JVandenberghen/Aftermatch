import { Box, Button, Checkbox, Card, FormControlLabel, Divider, FormLabel, useMediaQuery, FormControl, TextField, Typography, Link, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../redux/sessionSlice';
import { auth } from '../services/firebase'; 


const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      const payload = { token: idToken, user: { uid: userCredential.user.uid, email: userCredential.user.email, name: userCredential.user.displayName } };

      dispatch(login(payload));

      const response = await fetch(`${import.meta.env.VITE_API_URI}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        console.log('User logged in successfully:', result);
        localStorage.setItem('authToken', result.token);
        navigate('/');
      } else {
        console.error('Error logging in:', result);
        setErrorMessage(result.message);
      }
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        console.error('Error during login:', error);
        setErrorMessage('An error occurred during login.');
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Card 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          boxShadow: 'none',
        }}    
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: isMobileScreen ? '80%' : '20em',
            gap: 3,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 1,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember"  sx={{ color: theme.palette.text.tertiary }} />}
              label="Remember me"
              sx={{ color: theme.palette.text.tertiary }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            {/* <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link> */}
          </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign in with Google')}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </Typography>
          </Box>
          {errorMessage && (
          <Alert severity="error">
            {errorMessage}
          </Alert>
        )}
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
