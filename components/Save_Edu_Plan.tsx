import React, { useState } from 'react';
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";

interface CourseItem {
    id: number;
    content: string;
    credits: number;
}

interface CoursesByTerm {
    [term: string]: CourseItem[];
}

interface SavePlanFormProps {
    allCoursesByYear: { [year: string]: CoursesByTerm };
}

const SavePlanForm: React.FC<SavePlanFormProps> = ({ allCoursesByYear }) => {
    const [studentIdError, setStudentIdError] = useState<boolean>(false);
    const [studentId, setStudentId] = useState<string>('');
    const [planName, setPlanName] = useState<string>(''); // New state for plan name
    const [planNameError, setPlanNameError] = useState<boolean>(false);

    const handleSave = async () => {
        if (!studentId || !planName) {
            setStudentIdError(!studentId);
            setPlanNameError(!planName);
            return;
        }

        try {
            const planData = [];
            for (const year in allCoursesByYear) {  // Dynamic year from allCoursesByYear
                for (const term in allCoursesByYear[year]) {
                    const courses = allCoursesByYear[year][term].map(course => ({
                        class_id: course.id,
                        term: term,
                        year: year,
                    }));

                    if (courses.length > 0) {
                        planData.push({
                            year: year,
                            term: term,
                            courses: courses,
                        });
                    }
                }
            }

            console.log("Sending plan_data:", {
                student_id: studentId,
                plan_name: planName,
                plan_data: planData,
            });

            const response = await fetch('/api/edu-plan/save-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: studentId,
                    plan_name: planName,
                    plan_data: planData, // Plan data with dynamic years included
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save the plan.');
            }

            alert('Plan saved successfully!');
        } catch (error) {
            console.error('Error saving plans:', error);
            alert('There was an error saving the plan.');
        }
    };




    const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentId(e.target.value);
        if (e.target.value) {
            setStudentIdError(false);
        }
    };

    return (
        <Box>
            <TextField
                label="Student ID"
                variant="outlined"
                value={studentId}
                onChange={handleStudentIdChange}
                size='small'
                error={studentIdError}
                helperText={studentIdError ? 'Student ID is required' : ''}
                required
            />
            <TextField
                label="Plan Name"
                variant="outlined"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                size='small'
                error={planNameError}
                helperText={planNameError ? 'Plan name is required' : ''}
                required
                sx={{ marginLeft: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginLeft: 2 }}>
                Save Plan
            </Button>
        </Box>
    );
};

export default SavePlanForm;
