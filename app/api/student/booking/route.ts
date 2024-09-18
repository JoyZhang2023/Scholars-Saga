import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    const { date, time } = body;
    console.log({date, time});

    const user = await prisma.appointments.create({
        data: {
            selectedDate: date,
            selectedTime: time,
            updatedAt: date,
        }
    })

    return NextResponse.json(user, { status: 200 });
}
 