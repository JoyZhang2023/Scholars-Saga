import React from 'react';
import { Container, Avatar, Typography, Paper, Box } from '@mui/material';
import styles from '../components/styles/ProfilePage.module.css';

interface UserProfileProps {
    user: {
        name: string;
        email: string;
        profilePictureUrl?: string;
        type: 'student' | 'counselor';
    } & (
        | {
            type: 'student';
            studentId: string;
            enrollmentDate: string;
            degreePath: string;
        }
        | {
            type: 'counselor';
            counselorId: string;
            department: string,
            officeLocation: string;
        }
    );
}

const ProfilePage: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <Container>
            <Paper elevation={3}>
                <Box className={styles.profileBox} display="flex" flexDirection="column" alignItems="center" p={2}>
                    <Avatar
                        src={user.profilePictureUrl} /* || placeholderImage */
                        sx={{ width: 120, height: 120, marginBottom: 2 }}
                    />
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography variant="body1">Email: {user.email}</Typography>
                    {user.type === 'student' ? (
                        <>
                            <Typography variant="body1">Student ID: {user.studentId}</Typography>
                            <Typography variant="body1">Enrollment Date: {user.enrollmentDate}</Typography>
                            <Typography variant="body1">Degree Path: {user.degreePath}</Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="body1">Counselor ID: {user.counselorId}</Typography>
                            <Typography variant="body1">Department: {user.department}</Typography>
                            <Typography variant="body1">Office Location: {user.officeLocation}</Typography>
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
