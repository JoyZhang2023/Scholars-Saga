import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

// Registering for classes via POST request
export async function POST(request: Request) {
  try {
    const { classIds } = await request.json();
    const session = await getSession();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'Not Authenticated' }, { status: 401 });
    }

    const studentId = session.user.id;

    await prisma.enrollment.createMany({
      data: classIds.map((classId: number) => ({
        student_id: studentId,
        class_id: classId,
        registered_at: new Date(),
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ message: 'Classes registered successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error registering classes:', error);
    return NextResponse.json({ message: 'Error registering classes' }, { status: 500 });
  }
}

// GET request for searching classes
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionType = searchParams.get('sectionType') || ''; // Example parameter
    const classId = searchParams.get('classId') || ''; // Example parameter

    // Query classes based on criteria
    const classes = await prisma.classes.findMany({
      where: {
        class_category: {
          contains: sectionType, // Modify based on your schema
        },
        id: classId ? parseInt(classId) : undefined, // Handle specific class ID if passed
      },
    });

    if (!classes || classes.length === 0) {
      return NextResponse.json({ message: 'No classes found matching your criteria.' }, { status: 404 });
    }

    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error('Error searching for classes:', error);
    return NextResponse.json({ message: 'Error searching for classes' }, { status: 500 });
  }
}
