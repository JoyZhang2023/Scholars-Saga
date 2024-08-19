import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const {email, password} = await request.json();
        // validate email and password, maybe zod
        console.log({ email, password});
    } catch (e) {
        console.log({ e });
    }
    
    return NextResponse.json({message: 'success'});
}