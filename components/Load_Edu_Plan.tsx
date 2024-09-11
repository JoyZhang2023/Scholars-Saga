import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, Button, Typography, CircularProgress } from '@mui/material';

interface CourseItem {
    id: number;
    content: string;
    credits: number;
}

interface CoursesByTerm {
    [term: string]: CourseItem[];
}

interface EduPlan {
    id: number;
    plan_name: string;
    year: string;
    edu_plan_courses: {
        class_id: number;
        term: string;
        year: string;
    }[];
}

interface LoadPlanFormProps {
    studentId: string;
    setAllCoursesByYear: React.Dispatch<React.SetStateAction<{ [year: string]: CoursesByTerm }>>;
}

const LoadPlanForm: React.FC<LoadPlanFormProps> = ({ studentId, setAllCoursesByYear }) => {
    const [availablePlans, setAvailablePlans] = useState<EduPlan[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/edu-plan/load-plan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ student_id: studentId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch plans');
                }

                const data = await response.json();
                setAvailablePlans(data.plans);
            } catch (error) {
                console.error('Error loading plans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, [studentId]);

    const handlePlanLoad = async () => {
        if (!selectedPlanId) return;

        const selectedPlan = availablePlans.find(plan => plan.id === selectedPlanId);
        if (!selectedPlan) return;

        // Clear the current columns before loading the new plan
        setAllCoursesByYear({
            '2024-2025': { Fall: [], Winter: [], Spring: [], Summer: [] },
            '2025-2026': { Fall: [], Winter: [], Spring: [], Summer: [] },
            '2026-2027': { Fall: [], Winter: [], Spring: [], Summer: [] },
        });

        const loadedCoursesByYear: { [year: string]: CoursesByTerm } = {
            '2024-2025': { Fall: [], Winter: [], Spring: [], Summer: [] },
            '2025-2026': { Fall: [], Winter: [], Spring: [], Summer: [] },
            '2026-2027': { Fall: [], Winter: [], Spring: [], Summer: [] },
        };

        for (const course of selectedPlan.edu_plan_courses) {
            const { term, year, class_id } = course;

            try {
                const response = await fetch(`/api/classes/load-edu-plan-classes/${class_id}`);
                const courseDetails = await response.json();

                if (!courseDetails || !courseDetails.class_section || !courseDetails.credits) {
                    console.error(`Invalid course details for class_id: ${class_id}`);
                    continue;
                }

                const courseData = {
                    id: courseDetails.id,
                    content: courseDetails.class_section,
                    credits: courseDetails.credits,
                };

                if (!loadedCoursesByYear[year]) {
                    loadedCoursesByYear[year] = { Fall: [], Winter: [], Spring: [], Summer: [] };
                }

                if (loadedCoursesByYear[year][term]) {
                    loadedCoursesByYear[year][term].push(courseData);
                } else {
                    console.error(`Invalid term "${term}" in year "${year}"`);
                }

            } catch (error) {
                console.error(`Error loading course details for class_id: ${class_id}`, error);
            }
        }

        setAllCoursesByYear(loadedCoursesByYear);
    };

    return (
        <Box sx={{ textAlign: 'center' }}>  {/* Center the content */}
            <Typography variant="h6">Load EduPlan</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value as number)}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="" disabled>Select a Plan</MenuItem>
                    {availablePlans.map(plan => (
                        <MenuItem key={plan.id} value={plan.id}>
                            {plan.plan_name} ({plan.year})
                        </MenuItem>
                    ))}
                </Select>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={handlePlanLoad}
                disabled={!selectedPlanId}
                sx={{ marginTop: 2 }}
            >
                Load Plan
            </Button>
        </Box>
    );
};

export default LoadPlanForm;
