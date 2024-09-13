import styles from "./Profile.module.css";
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import NavbarCounselor from "@/components/Navbar_counselor";
import { Card, Typography, Box } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CardContent from '@mui/material/CardContent';

const prisma = new PrismaClient();

let user_id: number;
let first_name : string, last_name: string, email: string, department: string, location: string;

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
            first_name = counselorFind?.first_name
            last_name = counselorFind?.last_name
            email = counselorFind?.email
            if (counselorFind?.department) {
                department = counselorFind?.department
            }
            if (counselorFind?.office_location) {
                location = counselorFind?.office_location
            }
        }
    }

    return (
        <main className={styles.main}>
            <NavbarCounselor header = 'Counselor Profile' /> 
            <Box>
            <Card className={styles.card}>
            {    <React.Fragment>
                    <CardContent>
                        <Typography sx={{ color: 'text.secndary'}}>Frist Name</Typography>
                        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                            {first_name}
                            <br />
                            <br />
                        </Typography>
                        <Typography sx={{ color: 'text.secondary'}}>Last Name</Typography>
                        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                            {last_name}
                            <br />
                            <br />
                        </Typography>
                        <Typography sx={{ color: 'text.secondary'}}>Email Address</Typography>
                        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                            {email}
                            <br />
                            <br />
                        </Typography>
                        <Typography sx={{ color: 'text.secondary'}}>Department</Typography>
                        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                            {department}
                            <br />
                            <br />
                        </Typography>
                        <Typography sx={{ color: 'text.secondary'}}>Office Location</Typography>
                        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                            {location}
                            <br />
                            <br />
                        </Typography>
                            
                            <Typography variant="body2">
                                If you found anything incorrect and needs update, please contact administrator.
                                <br />
                             </Typography>
                    </CardContent>
                    </React.Fragment>
                }
            </Card>
            </Box>
            <Toolbar />
        </main>
    );
}
 
