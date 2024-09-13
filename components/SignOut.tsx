'use client';

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOut() {
    return (
        <Button           
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            onClick={()=> signOut({ callbackUrl: '/'})}
        >
            Sign out
        </Button>
    )
}