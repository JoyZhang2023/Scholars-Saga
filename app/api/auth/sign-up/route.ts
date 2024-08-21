import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import prisma from "@/lib/prisma";

export async function POST(request: Request) {

    try {
        const {email, password, role} = await request.json();
        // validate email and password, maybe zod

        const hashedpassword = await hash(password, 10);
        
        // sql insert user into db
        // const response = await sql` 
        //     INSERT INTO users (email, password, role)
        //     VALUES (${email}, ${hashedpassword}, ${role})`;
        
    } catch (e) {
        console.log({ e });
    }
    
    return NextResponse.json({message: 'success'});
}
