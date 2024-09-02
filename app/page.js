'use client';

import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Layout from './components/layout';

export default function Home() {
  return (
    <Layout>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to AI Media Recommender
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Get personalized recommendations for books, movies, and TV shows!
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" component={Link} href="/book" sx={{ mr: 2 }}>
            Book Recommendations
          </Button>
          <Button variant="contained" component={Link} href="/moviesandtvshows">
            Movies & TV Recommendations
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}