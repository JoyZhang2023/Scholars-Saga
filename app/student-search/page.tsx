"use client";
import styles from "@/app/page.module.css";
import Link from "next/link";
import NavbarCounselor from "@/components/Navbar_counselor";
import { AlignHorizontalCenter } from "@mui/icons-material";
import { Typography } from "@mui/material";


export default function StudentSearch() {
  return (
    <main className={styles.main}>
        <NavbarCounselor />
        <Typography align="center" component="h1">
            Student Search placeholder
        </Typography>
        <Link href="counselor-dashboard">Counselor Dashboard</Link>
    </main>
  );
}