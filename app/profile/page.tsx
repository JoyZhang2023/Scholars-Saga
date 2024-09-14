"use client";

import React, { useEffect, useState } from 'react';
import ProfilePage from '../../components/ProfilePage';
import Navbar_ProfilePage from '../../components/Navbar_ProfilePage';
import { Box, Container, Paper } from '@mui/material';
// import { useAuth } from '../../context/authContext';
import { useSession } from 'next-auth/react';

const ProfilePageContainer = () => {
  // const { user: authUser, logout } = useAuth();
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/profile?id=${session.user.profile_id}&user_type=${session.user.role}`);
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session?.user]);

  if (loading) return <p>Loading...</p>;
  if (!session) return <p>Please log in to view your profile.</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <Box sx={{ display: 'flex '}}>
      {/* Navbar on the left */}
      <Navbar_ProfilePage />

      {/* Profile page content */}
      <Container sx={{ flexGrow: 1, mt: 2 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <ProfilePage user={user} />
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePageContainer;