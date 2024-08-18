"use client";
import styles from "@/app/page.module.css";
import NavbarCounselor from "@/components/Navbar_counselor";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";


export default function StudentSearch() {
  return (
    <main className={styles.main}>
      <NavbarCounselor header="Student Search"/>      
        <Typography align="center" component="h1">
            Student Search Placeholder
        </Typography>  
        <Toolbar />
    </main>
  );
}