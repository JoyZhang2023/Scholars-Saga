'use client';

import React from 'react';
import Link from 'next/link';
import ToDosCard from './ToDosCard';
import ResourcesCard from './ResourcesCard';
import UpcomingEventsCard from './UpcomingEventsCard';
import BulletinsCard from './BulletinsCard';
import { useAuth } from '../../../context/authContext';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  // TODO: Reapply once session management BS is sorted...
  // if (!isAuthenticated || user?.role !== 'Admin') {
  //   return <div>Access Denied</div>;
  // }

  return (
    <div className="admin-page">
      <nav className="navbar">
        <div className="navbar-menu">
          <Link href="/admin/manage-users" className="navbar-menu-item">Manage Users</Link>
          <Link href="/admin/manage-classes" className="navbar-menu-item">Manage Classes</Link>
        </div>
        <div className="navbar-title">Admin Dashboard</div>
        <div className="navbar-buttons">
          <Link href="/home" className="nav-button">Home</Link>
          <button className="nav-button" onClick={() => {
            // Handle logout
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            window.location.href = '/login';
          }}>Log Out</button>
        </div>
      </nav>
      <div className="cards-container">
        <ToDosCard />
        <ResourcesCard />
        <UpcomingEventsCard />
        <BulletinsCard />
      </div>
    </div>
  );
};

export default AdminDashboard;
