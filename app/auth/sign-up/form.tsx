'use client';

import { FormEvent } from "react";

export default async function SignUpForm() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch(`../api/auth/sign-up`, {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        });
        console.log({ response });
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <div>
                <label>Enter your email:</label>
                <input type="email" name="email" id="email" required/>
            </div>
            <div>
                <label>Enter your password:</label>
                <input type="password" name="password" id="password"/>
            </div>
            <button className="display: table-row" type="submit">Sign Up</button>
        </form>
    );
    
}