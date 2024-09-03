import { getServerSession } from 'next-auth';
import SignInForm from './form';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { authOptions } from '@/lib/auth';
import { red } from '@mui/material/colors';

interface pageProps {}

export default async function LoginPage({prop}: {prop: pageProps}) {
  <SignInForm />
  const session = await getServerSession(authOptions);
  console.log(session);
  if(session) {
    if (session.user.role == 'Admin') {
      redirect('/');
    } else if ( session.user.role == 'Counselor') {
      redirect('/counselor/dashboard');
    } else if (session.user.role == 'Student') {
      redirect('/student-dashboard');
    } else {
      redirect('/home');
    }
  }
}
