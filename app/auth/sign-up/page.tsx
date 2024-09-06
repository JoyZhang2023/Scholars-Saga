import SignUpForm from "./form";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
    const session = await getServerSession();

    return (
        <SignUpForm />
    );
    
}