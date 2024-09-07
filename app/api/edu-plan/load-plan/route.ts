// API route to fetch all plans for a specific student
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { student_id } = body;

        if (!student_id) {
            return NextResponse.json({ error: 'student_id is required' }, { status: 400 });
        }

        const plans = await prisma.edu_plan.findMany({
            where: { student_id: parseInt(student_id, 10) },
            include: { edu_plan_courses: true },
        });

        return NextResponse.json({ plans }, { status: 200 });
    } catch (error) {
        console.error('Error loading plans:', error);
        return NextResponse.json({ error: 'Error loading plans' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


