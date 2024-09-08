import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import ClassDropdown from "@/components/Class_Dropdown";

function EnrollStudent() {
    const [studentId, setStudentId] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleEnroll = async () => {
        if (!selectedClass) {
            setMessage('Please select a class.');
            return;
        }

        try {
            const response = await fetch('/api/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: parseInt(studentId, 10),
                    class_id: selectedClass,
                }),
            });

            if (response.ok) {
                setMessage('Student enrolled successfully!');
            } else {
                const errorMessage = await response.text();
                setMessage(`Failed to enroll student: ${errorMessage}`);
            }
        } catch (error) {
            setMessage('Error: ' + (error as Error).message);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f0f0f0"
        >
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Enroll Student in Class
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        label="Student ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <ClassDropdown onSelectClass={setSelectedClass} />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleEnroll}
                        style={{ marginTop: '16px' }}
                    >
                        Enroll
                    </Button>
                </Box>
                {message && (
                    <Typography
                        variant="body2"
                        color={message.includes('successfully') ? 'green' : 'error'}
                        style={{ marginTop: '16px' }}
                    >
                        {message}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}

export default EnrollStudent;

