import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Media Recommender
          </Typography>
          <Box>
            <Link href="/" passHref style={{ color: 'white', marginRight: 15, textDecoration: 'none' }}>
              Home
            </Link>
            <Link href="/book" passHref style={{ color: 'white', marginRight: 15, textDecoration: 'none' }}>
              Books
            </Link>
            <Link href="/moviesandtvshows" passHref style={{ color: 'white', textDecoration: 'none' }}>
              Movies & TV
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 AI Media Recommender. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;