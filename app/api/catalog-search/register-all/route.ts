import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Registering for classes via POST request
export async function POST(request: Request) {
  try {
    const { classIds, studentId } = await request.json();

    // Debugging
    console.log('Received classIDS: ', classIds);
    console.log('Received studentId: ', studentId);

    if (!classIds || !studentId) {
      return NextResponse.json({ message: 'Missing classIds or studentId' }, { status: 400 });
    }

    for (const classId of classIds) {
      // Fetch class information
      const classInfo = await prisma.classes.findUnique({
        where: { id: classId },
      });

      if (!classInfo) {
        return NextResponse.json({ message: `Class with ID ${classId} not found` }, { status: 404 });
      }

      // Check if class is full
      if (classInfo.current_enrollments >= classInfo.class_size) {
        return NextResponse.json({ message: `Class ${classInfo.class_name} is full` }, { status: 400 });
      }

      // Check for existing enrollment
      const existingEnrollment = await prisma.enrollment.findFirst({
        where: {
          student_id: studentId,
          class_id: classId,
        },
      });

      if (!existingEnrollment) {
        // Proceed with enrollment
        await prisma.enrollment.create({
          data: {
            student_id: studentId,
            class_id: classId,
          },
        });

        // Update class capacity
        await prisma.classes.update({
          where: { id: classId },
          data: { current_enrollments: { increment: 1 } },
        });
      }
    }

    return NextResponse.json({ message: 'Classes registered successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error registering classes:', error);
    return NextResponse.json({ message: 'Failed to register classes' }, { status: 500 });
  }
}
