'use client';

import { signOut } from "next-auth/react";

export default function SignOut() {
    return (
        <span onClick={()=> {
            signOut();
        }}>
            Sign Out
        </span>
    )
}