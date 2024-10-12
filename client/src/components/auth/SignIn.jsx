import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiService } from '../services/apiService.js';
import { LOGIN_ROUTE } from '../services/constants';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.mail.gov.af">
        IT Directorate - Ministry of Agriculture, Irrigation and Livestock
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Custom theme
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
  },
});

export default function SignIn() {
  const [loginVal, setLoginVal] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const loginValue = (event) => {
    const { name, value } = event.target;
    setLoginVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = async (event) => {
    event.preventDefault();

    const { email, password } = loginVal;

    if (email === "") {
      setErrorMsg("Enter your Email Address");
    } else if (!email.includes("@")) {
      setErrorMsg("Enter valid Email");
    } else if (password === "") {
      setErrorMsg("Enter password");
    } else if (password.length < 8) {
      setErrorMsg("Password must be of at least 8 characters");
    } else {
      try {
        const response = await apiService.post(
            LOGIN_ROUTE,
            loginVal
        )
        console.log(response)

        if (response.status === 200) {
          localStorage.setItem("usersdatatoken", response.data.result.token);
          navigate("/dashboard");
          setLoginVal({ email: "", password: "" });
          setErrorMsg(""); // Clear error message on successful login
        } else if (response.status === 423) {
          setErrorMsg("This account has been suspended! Try to contact the admin");
        } else {
          setErrorMsg("Login failed. Please try again.");
        }
      } catch (error) {
        setErrorMsg("An error occurred. Please try again later.");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {errorMsg && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMsg}
        </Alert>
      )}
      <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#f2f3f4', borderRadius: 3, border: '2px solid green', marginTop: 10, marginBottom: 5 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography component="h1" variant="h5" sx={{
                marginBottom: "10px",
                fontFamily: "monospace"
            }}>
            سیستم ثبت پیشنهاد و حکم مقام ریاست دفتر
            </Typography>
          <Avatar
            alt="Ministry of Agriculture, Irrigation and Livestock"
            src="/MAILLogoTransparent.png"
            sx={{ width: 180, height: 180, marginBottom: 2 }}
          />
          <Typography component="h1" variant="h5" sx={{
            textAlign: "right",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily:"-moz-initial"
          }}>
          یوزر کاربری و رمز عبور را وارد کنید تا وارد سیستم شوید
          </Typography>
          <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              variant="filled"
              id="email"
              label="ایمیل"
              name="email"
              value={loginVal.email}
              autoComplete="email"
              autoFocus
              onChange={loginValue}
              sx={{
                '& label': {
                  right: 0, 
                  transformOrigin: 'top', 
                },
                '& label.Mui-focused': {
                  right: 0, 
                },
                textAlign: 'right', 
              }}
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="password"
              value={loginVal.password}
              label="پاسورد"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={loginValue}
              sx={{
                '& label': {
                  right: 0, 
                  transformOrigin: 'top', 
                },
                '& label.Mui-focused': {
                  right: 0, 
                },
                textAlign: 'right', 
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              وارد
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
