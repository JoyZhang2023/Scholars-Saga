"use client";
import styles from "@/app/page.module.css";
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavbarCounselor from "@/components/Navbar_counselor";


export default function Counselor() {
    return (
        <main className={styles.main}>
            <NavbarCounselor/>      
            <Typography align="center" component="h1">
                Counselor Dashboard Placeholder
            </Typography>  
            <Toolbar />

        </main>
    );
}