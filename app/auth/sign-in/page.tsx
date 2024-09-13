import { getServerSession } from 'next-auth';
import SignInForm from './form';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import styles from './signinform.module.css';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className={styles.body}>
      <SignInForm /> 
    </div>
  );
}
