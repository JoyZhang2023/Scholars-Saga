"use client";
import styles from "@/app/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavbarCounselor from "@/components/Navbar_counselor";

export default function Counselor() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <header>
                    Counselor Dashboard
                </header>
            </div>
            <NavbarCounselor/>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `100%` } }}
            >
                <Toolbar />
                <Typography paragraph>
                Leave blank for calendar and other 
                </Typography>
            </Box>
        </main>
    );
}