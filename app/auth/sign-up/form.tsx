'use client';

import { FormEvent } from "react";

export default function SignUpForm() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
                role: formData.get('role'),
            }),
        });

        const data = await response.json();
        console.log(data);
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
            <div>
                <select name="role">
                    <option value="C">Counselor</option>
                    <option value="S">Student</option>
                </select>
            </div>
            <button className="display: table-row" type="submit">Sign Up</button>
        </form>
    );
    
}