'use client';

import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import type { User } from 'next-auth';

type Props = {
  user: User,
  pagetype: string,
}

export default function SignInForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    // const { status } = useSession({
    //   required: true,
    //   onUnauthenticated() {
    //     // unauthenticated user, handled here
    //     console.log('Sign in fail')
    //   },
    // })
  };

  const { data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/home')
    }
  })

  if (session?.user?.role === 'Admin') {
    redirect('/admin/admin-dashboard')
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