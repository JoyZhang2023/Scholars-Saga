import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Avatar, Typography } from '@mui/material';
import SignOut from './SignOut';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { setEngine } from 'crypto';

const ProfileCard: React.FC = () => {
  const { data: session} = useSession();

  const user = {
    id: 1,
    first_name: '',
    last_name: '',
    email: '',
    user_type: '',
    profile_picture: '',
  }

  if (session) {
    user.first_name = session.user.role
  }

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
        {user.first_name !== '' ? `Welcome, ${user.first_name}!` : 'Welcome!'}
      </Typography>
      <Button
          variant="outlined"
          color="primary"
          component={Link}
          sx={{ mt: 1}}
          href='https://github.com/LilithLucifer3x6/Scholars-Saga'
        >
          GitHub Repo
        </Button>
      {/* <Button
        variant="outlined"
        color="primary"
        component={Link}
        href={user ? "/profile" : "/login"}
      >
        {user ? "View Profile" : "Login"}
      </Button> */}
              {/* <nav>
          {!!session && <SignOut />}
          {!session &&
          <Link href="/auth/sign-in">
            Sign In
          </Link>
          }
        </nav> */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          href='/auth/sign-in'
        >
          Sign In
        </Button>
    </Box>
  );
};

export default ProfileCard;
