"use client";
import NavbarStudentPrototype from '@/components/Navbar_student';
import React, { FC } from 'react';
import {CssBaseline, ThemeOptions, Toolbar, ThemeProvider, createTheme} from '@mui/material';
import DateCalendarViews from "@/components/Calendar_student";
import {Box} from "@mui/system";


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


const StudentCalendar = () => {
    return (
        <ThemeProvider theme={themeOptions}>
            <CssBaseline />
            <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
                <NavbarStudentPrototype />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <DateCalendarViews />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default StudentCalendar;
