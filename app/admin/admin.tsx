"use client";
import styles from "@/app/page.module.css";
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import NavbarAdmin from "@/components/Navbar_admin";
import withAdminAuth from '@/hoc/withAdminAuth';

const Admin: React.FC = () => {
  return (
    <main className={styles.main}>
      <NavbarAdmin header="Admin Dashboard"/>
      <Typography align="center" component="h1" className={styles.header}>
        Admin Dashboard
      </Typography>
      <Toolbar />
      <div className={styles.links}>
        <ul className={styles.linkList}>
          <li>
            <Link href="/admin/create-user">Create New User</Link>
          </li>
          <li>
            <Link href="/admin/manage-classes">Manage Classes</Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default withAdminAuth(Admin);
