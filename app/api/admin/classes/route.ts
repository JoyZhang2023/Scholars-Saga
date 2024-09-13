import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

// POST request for creating a class
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    const {
      class_section, professor, class_category, class_day,
      class_start_time, class_end_time, description,
      credits, class_name, class_size, fulfill_major_requirements, terms_offered
    } = data;

    const newClass = await prisma.classes.create({
      data: {
        class_section,
        professor,
        class_category,
        class_day,
        class_start_time: new Date(class_start_time),
        class_end_time: new Date(class_end_time),
        description,
        credits: parseInt(credits, 10),
        current_enrollments: 0,
        class_name,
        class_size: parseInt(class_size, 10),
        fulfill_major_requirements,
        terms_offered,
      },
    });

    return NextResponse.json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json({ error: 'Error creating class' }, { status: 500 });
  }
}

// DELETE request for deleting a class by id
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Class ID is required' }, { status: 400 });
    }

    const deletedClass = await prisma.classes.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deletedClass);
  } catch (error) {
    console.error('Error deleting class:', error);
    return NextResponse.json({ error: 'Error deleting class' }, { status: 500 });
  }
}
