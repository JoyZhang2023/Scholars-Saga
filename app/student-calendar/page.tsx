"use client";
import NavbarStudentPrototype from '@/components/Navbar_student';
import React, { FC } from 'react';
import {CssBaseline, ThemeOptions, Toolbar, ThemeProvider, createTheme} from '@mui/material';
import DateCalendarViews from "@/components/Calendar_student";
import {Box} from "@mui/system";




const StudentCalendar = () => {
    return (

            <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
                <NavbarStudentPrototype />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <DateCalendarViews />
                </Box>
            </Box>

    );
};

export default StudentCalendar;
