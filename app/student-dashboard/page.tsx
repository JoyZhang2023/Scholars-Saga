"use client";
import  NavbarStudentPrototype from '@/components/Navbar_student';
import React, { FC } from 'react';
import {CssBaseline, ThemeOptions, Toolbar, ThemeProvider, createTheme} from '@mui/material';






const StudentDashboard = () => {
    return (

            <div>
                <CssBaseline />
                <NavbarStudentPrototype />


            </div>

    );
};

export default StudentDashboard;
