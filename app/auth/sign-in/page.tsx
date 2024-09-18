'use server'
import SignInForm from './form';
import styles from './signinform.module.css';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {

  return (
    <div className={styles.body}>
      <SignInForm />
    </div>
  );
}
