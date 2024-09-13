import React from 'react';
import Link from 'next/link'; // Import Link for navigation

const ResourcesCard = () => {
  return (
    <div className="card resources-card">
      <h2>Resources</h2>
      <ul className="resources-list">
        <li>
          <Link href="/admin/appointments">Appointments and Meetings</Link>
        </li>
        <li>
          <Link href="/admin/calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/admin/class-catalog">Class Catalog</Link>
        </li>
        <li>
          <Link href="/admin/email">Email</Link>
        </li>
        <li>
          <Link href="/admin/profile-settings">Profile Settings</Link>
        </li>
        <li>
          <Link href="/admin/staff-directory">Staff Directory</Link>
        </li>
        <li>
          <Link href="/admin/todos">To-Do List</Link>
        </li>
      </ul>
    </div>
  );
};

export default ResourcesCard;
