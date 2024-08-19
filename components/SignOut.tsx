'use client';

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SignOut() {
    return (
        <span onClick={()=> {
            signOut();
        }}>
        <Link href={'/home'} />
            Sign Out
        </span>
    )
}