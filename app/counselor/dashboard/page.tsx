"use client";
import styles from "@/app/page.module.css";
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavbarCounselor from "@/components/Navbar_counselor";
import { useSession } from "next-auth/react";


export default function Counselor() {
    const { data: session } = useSession();
    var counselorName;
    if (session) {
        counselorName = session?.user?.name || '';
    }
    return (
        <main className={styles.main}>
            <NavbarCounselor header = {counselorName || ''} />        
            <Toolbar />

        </main>
    );
}