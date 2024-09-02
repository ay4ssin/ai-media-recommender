'use client';

import React, { useState } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';
import Layout from '../components/layout';

export default function BookRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState('');

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Error fetching book recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecommendations();
  };

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Book Recommendations
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Your preferences"
          variant="outlined"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Get Recommendations
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : recommendations.length > 0 ? (
        <List sx={{ mt: 4 }}>
          {recommendations.map((book, index) => (
            <ListItem key={index}>
              <ListItemText primary={book.title} secondary={`by ${book.author}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ mt: 4 }}>No recommendations available. Try submitting your preferences.</Typography>
      )}
    </Layout>
  );
}
