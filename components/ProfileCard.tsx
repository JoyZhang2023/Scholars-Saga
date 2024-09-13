import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Avatar, Typography } from '@mui/material';
import { useAuth } from '../context/authContext';

const ProfileCard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: 3,
        p: 2,
        width: '200px',
        textAlign: 'center',
      }}
    >
      <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
        <Image
          // src={user && user.profile_picture ? user.profile_picture : "/images/generic_profile_pic.png"}
          src={"/images/generic_profile_pic.png"}
          alt="Profile Picture"
          width={100}
          height={100}
          objectFit="cover"
        />
      </Avatar>
      <Typography variant="h6" gutterBottom>
        {user ? `Welcome, ${user.first_name}!` : 'Welcome!'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href={user ? "/profile" : "/login"}
      >
        {user ? "View Profile" : "Login"}
      </Button>
      {user && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 1 }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default ProfileCard;
