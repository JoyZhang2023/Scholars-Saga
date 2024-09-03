import React from 'react';
import { Container, Avatar, Typography, Paper, Box } from '@mui/material';
import styles from '../components/styles/ProfilePage.module.css';

interface UserProfileProps {
    user: {
        first_name: string;
        last_name: string;
        email: string;
        profile_picture: string;
        user_type: string;
    } & (
        | {
            user_type: 'student';
            id: number;
            enrollment_date: string; // Format to be adjusted from DATE in SQL
            degree_path: string;
        }
        | {
            user_type: 'counselor';
            id: string; // Adjust this field if your database has counselors
            department: string;
            office_location: string;
        }
    );
}

const ProfilePage: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <Container>
            <Paper elevation={3}>
                <Box className={styles.profileBox} display="flex" flexDirection="column" alignItems="center" p={2}>
                    <Avatar
                        src={user.profile_picture ? user.profile_picture : "/images/generic_profile_pic.png"}
                        sx={{ width: 120, height: 120, marginBottom: 2, objectFit: 'cover' }}
                    />
                    <Typography variant="body1">Name: {user.first_name} {user.last_name}</Typography>
                    <Typography variant="body1">Email: {user.email}</Typography>
                    {user.user_type === 'student' ? (
                        <>
                            <Typography variant="body1">Student ID: {user.id}</Typography>
                            <Typography variant="body1">Enrollment Date: {new Date(user.enrollment_date).toLocaleDateString()}</Typography>
                            <Typography variant="body1">Degree Path: {user.degree_path}</Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="body1">Counselor ID: {user.id}</Typography>
                            <Typography variant="body1">Department: {user.department}</Typography>
                            <Typography variant="body1">Office Location: {user.office_location}</Typography>
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
