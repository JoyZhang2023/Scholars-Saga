
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';


interface PastCourse {
    id: number;
    courseName: string;
    term: string;
    grade: string;
}

interface TermDetail {
    termName: string;
    courses: PastCourse[];
}

interface AcademicTerm {
    year: string;
    terms: TermDetail[];
}

// Sample data
const academicHistory: AcademicTerm[] = [
    {
        year: "2022-2023",
        terms: [
            {
                termName: "Fall 2022",
                courses: [
                    { id: 1, courseName: 'Calculus II', term: 'Fall 2022', grade: 'A-' },
                    { id: 2, courseName: 'General Chemistry', term: 'Fall 2022', grade: 'B+' },
                ]
            },
            {
                termName: "Spring 2023",
                courses: [
                    { id: 3, courseName: 'Calculus III', term: 'Spring 2023', grade: 'B' }
                ]
            }
        ]
    },

];

const PastCourses: React.FC = () => {

    return (
        <>
            {academicHistory.map((year, yearIndex) => (
                <Box key={yearIndex} sx={{ marginBottom: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Academic Year: {year.year}
                    </Typography>
                    {year.terms.map((term, termIndex) => (
                        <Box key={termIndex} sx={{ marginTop: 2, marginBottom: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Term: {term.termName}
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '40%' }}>Course Name</TableCell>
                                        <TableCell style={{ width: '30%' }}>Term</TableCell>
                                        <TableCell style={{ width: '30%' }}>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {term.courses.map((course) => (
                                        <TableRow key={course.id}>
                                            <TableCell>{course.courseName}</TableCell>
                                            <TableCell>{course.term}</TableCell>
                                            <TableCell>{course.grade}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    ))}
                </Box>
            ))}
        </>
    );
};

export default PastCourses;

