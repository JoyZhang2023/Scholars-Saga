import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Avatar, Typography } from '@mui/material';

const UnderDevPage: React.FC = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '100px',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: 3,
        p: 2,
        width: '800px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
          Page Under Construction
      </Typography>
      <Typography variant="h6" gutterBottom>
        We're working hard to bring you new and exciting content! This page is currently under development, but we'll have it up and running soon.
        Thank you for your patience and stay tuned for updates!
      </Typography>
      <Button variant='contained' href='/home'>
        Back to Home page
      </Button>
    </Box>
  );
};

export default UnderDevPage;
