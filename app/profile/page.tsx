'use client';

import React from 'react';
import ProfilePage from '../../components/ProfilePage';
import Link from 'next/link';
import NavbarCounselor from '../../components/Navbar_ProfilePage';
import '../../styles/global.css';

const exampleStudent = {
    name: 'Aaron A. Aaronson',
    email: 'aaa.111@email.com',
    profilePictureUrl: 'aaron_profile.jpeg',
    type: 'student' as const,
    studentId: '123456',
    enrollmentDate: '2021-08-23',
    degreePath: 'Computer Science',
};

const exampleCounselor = {
    name: 'Eliza Ellison',
    email: 'e.ellison@school.edu',
    profilePictureUrl: '/eliza_profile.jpg',
    type: 'counselor' as const,
    counselorId: '789012',
    department: 'Psychology',
    officeLocation: 'Sciences Building, Room 201',
};

const ProfilePageContainer: React.FC = () => {
    const isStudent = true;

    return (
        <div className="profile-page-container">
            <Link href="/home" passHref>
                <div className="banner">
                    <div className="banner-overlay"></div>
                    <img src="/autumn banner.jpg" alt="Autumn Banner" className="long-banner-image" />
                    <h1 className="banner-text">Personal Info</h1>
                </div>
            </Link>
            <div className="profile-page-content">
                <NavbarCounselor />
                <ProfilePage user={exampleStudent} />
                {/* <ProfilePage user={exampleCounselor} /> */}
                {/* <ProfilePage user={isStudent ? exampleStudent : exampleCounselor} /> */}
            </div>
        </div>
    );
};

export default ProfilePageContainer;
