"use client";

import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button, TextField, CircularProgress } from '@mui/material';
import ClassResults from '../../components/ClassResults';

const AiAssistant: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null); // Allow any type of response
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  const handleQuery = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/query-openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query
        }),
      });
  
      const data = await response.json();
      console.log('Data from API:', data);

      setResults(data.response); // Handle any type of response
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Scholar's Saga Class Query
        </Typography>
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Ask about classes below...
          </Typography>

          {/* Input field for query */}
          <Box mb={2}>
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about classes..."
              multiline
              rows={4}
              fullWidth
              disabled={loading}
              variant="outlined"
            />
          </Box>

          {/* Button to trigger the query */}
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleQuery}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Asking...' : 'Ask OpenAI'}
            </Button>
          </Box>

          {/* Loading feedback */}
          {loading && (
            <Box display="flex" justifyContent="center" mb={2}>
              <CircularProgress />
            </Box>
          )}

          {/* Error feedback */}
          {error && (
            <Typography variant="body1" style={{ color: 'red' }} align="center">
              {error}
            </Typography>
          )}

          {/* Results */}
          {results ? (
            <ClassResults classes={results} />
          ) : (
            !loading && <Typography variant="body1">No results found.</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default AiAssistant;
