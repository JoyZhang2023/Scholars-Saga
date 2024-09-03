"use client";

import React from 'react';
import Link from 'next/link';
import ProfileCard from '../../components/ProfileCard';
import { Box, Container, Typography, Grid, Link as MUILink } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getServerSession } from "next-auth";
import SignOut from "@/components/SignOut";

export default async function Home() {
  const theme = useTheme(); // TODO: incorporate MUI theme when ready

  const session = await getServerSession();
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row' }}>
        <ProfileCard />
        <nav>
          {!!session && <SignOut />}
          {!session &&
          <Link href="/auth/sign-in">
            Sign In
          </Link>
          }
        </nav>

        <Box sx={{ flex: 1 }}>
          {/* Banner Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(2),
              marginBottom: theme.spacing(3),
            }}
          >
            {/* <Box
              component="img"
              src="/autumn banner.jpg"
              alt="Autumn Banner"
              sx={{
                height: 100,
                objectFit: 'cover',
                borderRadius: theme.shape.borderRadius,
              }}
            /> */}
            <Typography variant="h4" sx={{ marginLeft: theme.spacing(2) }}>
              Scholar's Saga
            </Typography>
          </Box>

          {/* Links Row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(3) }}>
            {['About', 'Bulletins', 'Resources', 'Tasks', 'Updates'].map((text) => (
              <MUILink
                key={text}
                component={Link}
                href={`/${text.toLowerCase()}`}
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
                  <Typography variant="h6">{section}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
