import { getServerSession } from 'next-auth';
import SignInForm from './form';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function LoginPage() {
  
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main>
      <h2>Sign In Page</h2>
      <SignInForm />
    </main>  
  );
}
