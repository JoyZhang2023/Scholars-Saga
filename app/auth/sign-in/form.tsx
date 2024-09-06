'use client';

import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';

export default function SignInForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

  };

  const { data: session} = useSession();
  const router = useRouter();

  if (session?.user?.role === 'Admin') {
    router.push('/admin/admin-dashboard');
    router.refresh();
  } else if (session?.user.role === 'Counselor') {
    router.push('/counselor/dashboard');
    router.refresh();
  } else if (session?.user.role === 'Student') {
    router.push('/student/student-dashboard')
    router.refresh();
  }

  

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        name="email"
        className="border border-black text-black"
        type="email"
      />
      <input
        name="password"
        className="border border-black  text-black"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}