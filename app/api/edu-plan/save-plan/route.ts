import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Received request body:", JSON.stringify(body, null, 2));

        const { student_id, plan_name, plan_data } = body;

        // Convert student_id to an integer
        const studentIdInt = parseInt(student_id, 10);

        // Validate required fields
        if (!studentIdInt || !plan_name || !plan_data || plan_data.length === 0) {
            console.log("Invalid request body:", { student_id: studentIdInt, plan_name, plan_data });
            return NextResponse.json({ error: 'student_id, plan_name, and plan_data are required' }, { status: 400 });
        }

        const year = plan_data[0]?.year;
        if (!year) {
            console.log("Year is missing from plan_data");
            return NextResponse.json({ error: 'Year is required for the educational plan' }, { status: 400 });
        }

        // Validate the student exists
        const student = await prisma.students.findUnique({
            where: { id: studentIdInt },
        });

        if (!student) {
            console.log(`Invalid student_id: ${studentIdInt}`);
            return NextResponse.json({ error: 'Invalid student_id' }, { status: 400 });
        }

        // Check if a plan with the same name exists for the student
        const existingPlan = await prisma.edu_plan.findFirst({
            where: {
                student_id: studentIdInt,
                plan_name: plan_name,
            },
        });

        if (existingPlan) {
            console.log(`Plan with name "${plan_name}" already exists for student_id ${studentIdInt}`);
            return NextResponse.json({ error: 'A plan with this name already exists for this student' }, { status: 400 });
        }

        // Step 1: Save the new edu_plan, including the year
        const eduPlan = await prisma.edu_plan.create({
            data: {
                student_id: studentIdInt,
                plan_name,
                year, // Add year to the edu_plan creation
                created_at: new Date(),
            },
        });

        // Step 2: Prepare and save plan_data into edu_plan_courses
        const eduPlanCourses = [];
        for (const plan of plan_data) {
            for (const course of plan.courses) {
                eduPlanCourses.push({
                    edu_plan_id: eduPlan.id,
                    class_id: course.class_id,
                    term: plan.term,
                    year: plan.year, // Use the year from plan_data dynamically
                });
            }
        }

        // Step 3: Save the course data
        await prisma.edu_plan_courses.createMany({
            data: eduPlanCourses,
        });

        return NextResponse.json({ message: 'Education plan saved successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error saving education plan:', error);
        return NextResponse.json({ error: 'Error saving education plan' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


