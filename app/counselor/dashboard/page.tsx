import styles from "@/app/page.module.css";
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import NavbarCounselor from "@/components/Navbar_counselor";
import { Typography } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

let user_id: number;
let first_name : string, last_name: string;


export default async function Counselor() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        user_id = session.user.profile_id;
    }

    const currentUser_id = user_id;
    if (currentUser_id) {
        const counselorFind = await prisma.counselors.findFirst({
            where: { id: user_id}
        })
        if (counselorFind) {
            first_name = counselorFind?.first_name;
            last_name = counselorFind?.last_name
        }
    }

    return (
        <main className={styles.main}>
            <NavbarCounselor header = 'Counselor Dashboard' /> 
            <Typography variant="h6" sx={{paddingTop: '60px'}}>
                Hello {first_name} {last_name}!
            </Typography>
            <Toolbar />
        </main>
    );
}
 
