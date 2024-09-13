"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { useAuth } from '../../context/authContext';

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  // const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Use login function from auth context
        // login(data.user);

        // Redirect to home page after successful login
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(2),
          marginBottom: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
        }}
      >
        <Typography variant="h4">Scholar's Saga</Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
}
