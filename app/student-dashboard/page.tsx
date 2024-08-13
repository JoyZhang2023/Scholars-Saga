"use client";
import  NavbarStudentPrototype from '@/components/Navbar_student';
import React, { FC } from 'react';
import {CssBaseline, ThemeOptions, Toolbar, ThemeProvider, createTheme} from '@mui/material';



//Testing out themes here, in final implementation this would not be here
 const themeOptions = createTheme( {
    palette: {
        mode: 'light',
        primary: {
            main: '#6c6c40',
        },
        secondary: {
            main: '#5e2138',
        },
        background: {
            default: '#4A582B',
            paper: '#778D66',
        },
        text: {
            primary: '#fcfce1',
        },
    },
});

const StudentDashboard = () => {
    return (
        <ThemeProvider theme={themeOptions}>
            <div>
                <CssBaseline />
                <NavbarStudentPrototype />


            </div>
        </ThemeProvider>
    );
};

export default StudentDashboard;
