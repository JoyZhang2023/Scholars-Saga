"use client";
import styles from "@/app/page.module.css";
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import NavbarCounselor from "@/components/Navbar_counselor";
import { useSession } from "next-auth/react";


export default function Counselor() {

    return (
        <main className={styles.main}>
            <NavbarCounselor header = 'Counselor Dashboard' />        
            <Toolbar />

        </main>
    );
}