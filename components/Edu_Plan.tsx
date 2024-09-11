import React, { useState } from 'react';

import { Box, Grid } from '@mui/material';
import LoadPlanForm from "@/components/Load_Edu_Plan";
import PlanBuilder from "@/components/Educational_Plan_Creator";


const EduPlanCreator: React.FC = () => {
    const [allCoursesByYear, setAllCoursesByYear] = useState<{ [year: string]: CoursesByTerm }>({
        '2024-2025': { Fall: [], Winter: [], Spring: [], Summer: [] },
        '2025-2026': { Fall: [], Winter: [], Spring: [], Summer: [] },
        '2026-2027': { Fall: [], Winter: [], Spring: [], Summer: [] },
    });

    const studentId = "1"; // Mock student ID, session management logic would replace it here

    return (
        <Box sx={{ padding: 0 }}>

            <Grid container spacing={2}>
                <Grid item xs={5} md={2} mt = {6}>
                    <LoadPlanForm studentId={studentId} setAllCoursesByYear={setAllCoursesByYear} />
                </Grid>

                <Grid item xs={12} md={10}>
                    <PlanBuilder allCoursesByYear={allCoursesByYear} setAllCoursesByYear={setAllCoursesByYear} />
                </Grid>
            </Grid>

        </Box>
    );
};


export default EduPlanCreator;
