import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Box } from '@mui/material';


interface FutureCourse {
    id: number;
    courseName: string;
    term: string;
}

interface TermDetail {
    termName: string;
    courses: FutureCourse[];
}

interface AcademicTerm {
    year: string;
    terms: TermDetail[];
}

// Sample data
const academicPlan: AcademicTerm[] = [
    {
        year: "2024-2025",
        terms: [
            {
                termName: "Fall 2024",
                courses: [
                    { id: 1, courseName: 'Calculus III', term: 'Fall 2024' },
                    { id: 2, courseName: 'Organic Chemistry', term: 'Fall 2024' },
                ]
            },
            {
                termName: "Winter 2025",
                courses: [
                    { id: 3, courseName: 'Physics II', term: 'Winter 2025' }
                ]
            },
            {
                termName: "Spring 2025",
                courses: [
                    { id: 4, courseName: 'Literature', term: 'Spring 2025' }
                ]
            }
        ]
    },

];


const FutureCourses: React.FC = () => {
    return (
        <>
            {academicPlan.map((year) => (
                <Box key={year.year} marginY={4}>
                    <Typography variant="h6" gutterBottom>
                        Academic Year: {year.year}
                    </Typography>
                    {year.terms.map((term) => (
                        <React.Fragment key={term.termName}>
                            <Typography variant="subtitle1" gutterBottom>
                                Term: {term.termName}
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '40%' }}>Course Name</TableCell>
                                        <TableCell style={{ width: '30%' }}>Term</TableCell>
                                        <TableCell style={{ width: '30%' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {term.courses.map((course) => (
                                        <TableRow key={course.id}>
                                            <TableCell>{course.courseName}</TableCell>
                                            <TableCell>{course.term}</TableCell>
                                            <TableCell>
                                                <Button color="primary">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </React.Fragment>
                    ))}
                </Box>
            ))}
        </>
    );
};

export default FutureCourses;