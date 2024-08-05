"use client";
import styles from "@/app/page.module.css";
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const Admin: React.FC = () => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Typography align="center" component="h1" className={styles.headerText}>
          Admin Dashboard
        </Typography>
      </header>
      <div className={styles.content}>
        <Link href="/admin/create-user" passHref>
          <Button variant="contained" color="primary" className={styles.button}>
            Create New User
          </Button>
        </Link>
        <Link href="/admin/manage-classes" passHref>
          <Button variant="contained" color="primary" className={styles.button}>
            Manage Classes
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Admin;
