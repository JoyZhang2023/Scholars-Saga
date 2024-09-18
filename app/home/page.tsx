"use client";

import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Grid, Link as MUILink, Button, Avatar, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const theme = useTheme(); // TODO: incorporate MUI theme when ready

  let dashboardLink = 'https://github.com/JoyZhang2023/Scholars-Saga/tree/main', iconLabel='GitHub Repo';

  const session = useSession();
  if (session) {
    if (session.data?.user.role === 'Admin') {
      iconLabel = "Admin Dashboard"
      dashboardLink = '/admin/admin-dashboard'
    } else if(session.data?.user.role === 'Counselor') {
      iconLabel = "Counselor Dashboard"
      dashboardLink = '/counselor/dashboard'
    } else if(session.data?.user.role === 'Student') {
      iconLabel = "Student Dashboard"
      dashboardLink = '/student/student-dashboard'
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row' }}>
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
            src={"/images/generic_profile_pic.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            objectFit="cover"
          />
        </Avatar>
        <Typography variant="h6" gutterBottom>
          {session.status === 'authenticated'  ? `Welcome, ${session.data?.user.role}!` : 'Welcome!'}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          sx={{ mt: 1}}
          href={dashboardLink}
        >
          {iconLabel}
        </Button>
        { session.status === 'authenticated' ?
        <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={()=> {signOut()}}
      >
        Sign Out
      </Button> :
      <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
      href='/auth/sign-in'
    >
      Sign In
    </Button>
      }

      </Box>


        <Box sx={{ flex: 1 }}>
          {/* Banner Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              // justifyContent: 'space-between',
              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(2),
              marginBottom: theme.spacing(0),
            }}
          >
              <Image
                src={"/images/logo.png"}
                alt="Logo"
                width={150}
                height={150}
                objectFit="cover"
              />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ paddingLeft: 3, color: theme.typography.h1, marginBottom:0}}>
                  Scholar's Saga
              </Typography>
              <Typography variant='h6' sx={{ paddingLeft: 15, marginTop: 0}} color='#046c13' fontWeight='fontWeightMedium'>
                All in one solution for academic planning
              </Typography>
            </Box>
          </Box>

          {/* Links Row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(3) }}>
            {['About', 'Bulletins', 'Resources', 'Tasks', 'Updates'].map((text) => (
              <MUILink
                key={text}
                component={Link}
                // href={`/${text.toLowerCase()}`}
                href='/splashpage'
                underline="none"
                sx={{
                  padding: theme.spacing(1),
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                }}
              >
                {text}
              </MUILink>
            ))}
          </Box>

          {/* Placeholder Content */}
          <Grid container spacing={3}>
            {['Latest Articles', 'Saga\'s News', 'Important Tasks'].map((section) => (
              <Grid item xs={12} sm={4} key={section}>
                <Box
                  sx={{
                    padding: theme.spacing(2),
                    backgroundColor: theme.palette.background.default,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: theme.shadows[2],
                  }}
                >
                  <MUILink href='/splashpage' underline='hover' variant='h6'>{section}</MUILink>
                  {/* <Typography variant="h6" >{section}</Typography> */}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {/* <Box
        component="img"
        src={"/images/autumn banner.jpg"}
        alt="Autumn Banner"
        sx={{
          maxWidth:'lg',
          height: 100,
          objectFit: 'cover',
          borderRadius: theme.shape.borderRadius,
        }}
      /> */}
      <Box                   
        sx={{
          marginTop: 3,
          padding: theme.spacing(2),
          backgroundColor: '#eff9e9',
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
        }}>
        <Typography variant='body1'>
         Scholar's Saga is your ideal solution for academic planning and communication. It also come with enhancement of trending AI assistant. Drag and drop education plan builder and multiple plan saver for comprehensive academic plan in all kinds of sceinario. Easy appointment scheduler provides extra flexibility to student and counselor when it comes to plan creation, plan update or even career planning.
        </Typography>
      </Box>
    </Container>
  );
}
