"use client";
import styles from "@/app/page.module.css";
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import NavbarCounselor from "@/components/Navbar_counselor";
import { useSession } from "next-auth/react";
import { PrismaClient, counselors } from "@prisma/client";
import ProfileCard from "@/components/ProfileCard";
import { Typography } from "@mui/material";

const prisma = new PrismaClient();

export default async function Counselor() {
    const user = await getCounselor();
    return (
        <main className={styles.main}>
            <NavbarCounselor header = 'Counselor Dashboard' />        
            <Toolbar />
            <Typography>
                Welcome! {user?.first_name}
            </Typography>
        </main>
    );
}

async function getCounselor() {
    const {data: session } = useSession();
    const currentUser = await prisma.counselors.findFirst({
        where: { id: session?.user.profile_id}
    })
    return currentUser;
}