"use client";
import NavbarStudentPrototype from '@/components/Navbar_student';
import React, { FC } from 'react';
import {Box} from "@mui/system";
import Theme_Component from "@/components/Theme_Component";




const StudentCalendar = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
            <NavbarStudentPrototype />
            <Box sx={{ flexGrow: 1, p: 3, mt: 5 }}>
                <Theme_Component />
            </Box>
        </Box>
    );
};

export default StudentCalendar;
