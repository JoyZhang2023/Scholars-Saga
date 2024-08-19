import { NextResponse } from "next/server";
import { hash } from 'bcrypt';

export async function POST(request: Request) {

    try {
        const {email, password} = await request.json();
        // validate email and password, maybe zod
        console.log({ email, password});

        const hashedpassword = await hash(password, 10);

        // sql insert user into db
        
    } catch (e) {
        console.log({ e });
    }
    
    return NextResponse.json({message: 'success'});
}
