import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';


type User = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    primaryAdvisor: number;
    programID: number;
    birthDate: string;

};
const ManageUsers: React.FC = () => {
    const [user, setUser] = useState<User>({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '0123456789',
        primaryAdvisor: 3,
        programID: 2,
        birthDate: '07/17/2001'

    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        console.log('Updated user:', user);
        // The work here would handle the writing to the database
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Edit User: {user.name}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Primary Advisor ID"
                            variant="outlined"
                            name="primaryAdvisor"
                            type="number"
                            value={user.primaryAdvisor}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Program ID"
                            variant="outlined"
                            name="programID"
                            type="number"
                            value={user.programID}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Birthday"
                            variant="outlined"
                            name="birthDate"
                            type="string"
                            value={user.birthDate}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            sx={{ width: '100%' }}
                        >
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ManageUsers;