import { enrollment } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { student_id, class_id } = await request.json();

        if (!student_id || !class_id) {
            return new NextResponse('Missing student id or class id', { status: 400 });
        }

        const studentIdNumber = Number(student_id);
        const classIdNumber = Number(class_id);


        const student = await prisma.students.findUnique({ where: { id: studentIdNumber } });
        const classItem = await prisma.classes.findUnique({ where: { id: classIdNumber } });

        if (!student || !classItem) {
            return new NextResponse('Invalid student id or class id', { status: 404 });
        }

        const existingEnrollment = await prisma.enrollment.findMany({
            where: {
                    student_id: studentIdNumber,
                    class_id: classIdNumber,
            },
        });

        if (existingEnrollment) {
            return new NextResponse('Student is already enrolled in this class', { status: 409 });
        }

        // Proceed to create the new enrollment
        const newEnrollment = await prisma.enrollment.create({
            data: {
                student_id: studentIdNumber,
                class_id: classIdNumber,
            },
        });

        return new NextResponse(JSON.stringify(newEnrollment), { status: 201 });
    } catch (error: any) {
        console.error('Error creating enrollment:', error);
        return new NextResponse(`Error creating enrollment: ${error.message}`, { status: 500 });
    }
}

export async function GET() {
    try {
        const enrollments = await prisma.enrollment.findMany();
        return new NextResponse(JSON.stringify(enrollments), { status: 200 });
    } catch (error) {
        console.error('Error getting enrollments:', error);
        return new NextResponse('Error getting enrollments', { status: 500 });
    }
}
