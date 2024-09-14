'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import styles from './signinform.module.css';

export default function SignInForm() {

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });


    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
   
  };

  // const { data: session} = useSession();


  // if (session?.user?.role === 'Admin') {
  //   router.push('/admin/admin-dashboard');
  //   router.refresh();
  // } else if (session?.user.role === 'Counselor') {
  //   router.push('/counselor/dashboard');
  //   router.refresh();
  // } else if (session?.user.role === 'Student') {
  //   router.push('/student/student-dashboard')
  //   router.refresh();
  // }

  return (
    <div>
        <h1 className={styles.header}>Scholar's Saga</h1>
        <form
          onSubmit={handleSubmit}
          className={styles.formContainer}
        >
          <h2 className={styles.formHeader}>Sign In</h2>
          <h4 className={styles.labelHeader}>Email</h4>
          <input
            name="email"
            className={styles.formInput}
            type="email" />
          <h4 className={styles.labelHeader}>Password</h4>
          <input
            name="password"
            className={styles.formInput}
            type="password" />
          <button type="submit" className={styles.submitButton}>Login</button>
        </form>
      </div>
  );
}