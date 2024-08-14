import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, Grid, TextField, Button, Typography } from '@mui/material';

const ToggleForm: React.FC = () => {

    const [selectedOption, setSelectedOption] = useState<'student' | 'counselor' | 'admin'>('student');

    const [formData, setFormData] = useState<any>({});

    const [submittedData, setSubmittedData] = useState<{ type: string, data: any } | null>(null);

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newRole = event.target.value as 'student' | 'counselor' | 'admin';
        setSelectedOption(newRole);

        setFormData({});
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setSubmittedData({
            type: selectedOption,
            data: formData,
        });
    };


    const renderFormFields = () => {
        switch (selectedOption) {
            case 'student':
                return (
                    <Grid container spacing={4}>
                        <Grid item xs={12} mt = {4}>
                            <TextField
                                label="Full Name"
                                name="studentName"
                                value={formData.studentName || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="studentEmail"
                                value={formData.studentEmail || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="studentPassword"
                                type="password"
                                value={formData.studentPassword || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                name="studentNumber"
                                type="number"
                                value={formData.studentNumber || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                );
            case 'counselor':
                return (
                    <Grid container spacing={4}>
                        <Grid item xs={12} mt = {4}>
                            <TextField
                                label="Full Name"
                                name="counselorName"
                                value={formData.counselorName || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="counselorEmail"
                                value={formData.counselorEmail || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="counselorPassword"
                                type="password"
                                value={formData.counselorPassword || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                name="counselorNumber"
                                type="number"
                                value={formData.counselorNumber || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                );
            case 'admin':
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} mt = {4}>
                            <TextField
                                label="Full Name"
                                name="adminName"
                                value={formData.adminName || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Role"
                                name="adminRole"
                                value={formData.adminRole || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    };


    const renderSubmittedData = () => {
        if (!submittedData) return null;

        return (
            <Box mt={4}>
                <Typography variant="h6">Submitted {submittedData.type} Data:</Typography>
                <pre>{JSON.stringify(submittedData.data, null, 2)}</pre>
            </Box>
        );
    };

    return (
        <Box mt={4} px={3} py={2} component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={selectedOption}
                    label="Role"
                    onChange={handleSelectChange}
                >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="counselor">Counselor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </Select>
            </FormControl>

            {renderFormFields()}

            <Box mt={4} display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>


            {renderSubmittedData()}
        </Box>
    );
};

export default ToggleForm;