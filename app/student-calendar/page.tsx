"use client";
import NavbarStudentPrototype from '@/components/Navbar_student';
import React, { FC } from 'react';
import {Box} from "@mui/system";
<<<<<<< HEAD
import Register_Component from "@/components/Register_Component";
import Educational_Plan from "@/components/Educational_Plan_Creator";
import Educational_Plan_Creator from "@/components/Educational_Plan_Creator";
import EduPlanCreator from "@/components/Edu_Plan";
=======
import Theme_Component from "@/components/Theme_Component";
>>>>>>> main




const StudentCalendar = () => {
    return (
<<<<<<< HEAD
        <ThemeProvider theme={themeOptions}>
            <CssBaseline />
            <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
                <NavbarStudentPrototype />
                <Box sx={{ flexGrow: 1, p: 3, mt: 6 }}>
                    <EduPlanCreator/>
                </Box>
=======
        <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
            <NavbarStudentPrototype />
            <Box sx={{ flexGrow: 1, p: 3, mt: 5 }}>
                <Theme_Component />
>>>>>>> main
            </Box>
        </Box>
    );
};

export default StudentCalendar;
