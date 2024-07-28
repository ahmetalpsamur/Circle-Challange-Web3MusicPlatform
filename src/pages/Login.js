import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için React Router kullanıyoruz

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Başarı durumu için state
  const navigate = useNavigate(); // Yönlendirme için useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log('Login successful:', response.data);
      setSuccess(true); // Başarı durumunu ayarla
      setTimeout(() => navigate('/'), 2000); // 2 saniye sonra yönlendir
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid username or password.');
      setSuccess(false); // Başarı durumunu sıfırla
    }
  };

  const handleClose = () => {
    setSuccess(false); // Snackbar kapanma fonksiyonu
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
        {/* Snackbar ile başarı mesajı */}
        <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Login successful!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Login;
