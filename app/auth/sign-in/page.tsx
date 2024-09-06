import { getServerSession } from 'next-auth';
import SignInForm from './form';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
// import { authOptions } from '@/lib/auth';
import { AdminUser } from '@/app/admin/admin-dashboard/AdminProfile';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function LoginPage() {
  
  const session = await getServerSession(authOptions);
  console.log(session)


  return (
    <main>
      <AdminUser />
      <h2>Sign In Page</h2>
      <p>Server Session Info</p>
      <pre>{JSON.stringify(session)}</pre>
      <SignInForm />
    </main>  
  );
}
