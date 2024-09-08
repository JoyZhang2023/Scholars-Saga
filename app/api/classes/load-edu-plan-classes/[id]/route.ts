import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;  // The dynamic id from the URL

    if (!id) {
        return NextResponse.json({ error: 'class_id is required' }, { status: 400 });
    }

    try {
        // Fetch the class by its ID
        const classDetails = await prisma.classes.findUnique({
            where: {
                id: parseInt(id, 10),
            },
            select: {
                id: true,
                class_name: true,
                class_section: true,
                credits: true,
                description: true,
                fulfill_major_requirements: true,
                terms_offered: true,
                class_day: true,
                class_start_time: true,
                class_end_time: true,
                class_category: true,
                class_size: true,
                current_enrollments: true,
                professor: true,
            },
        });

        if (!classDetails) {
            return NextResponse.json({ error: 'Class not found' }, { status: 404 });
        }

        return NextResponse.json(classDetails, { status: 200 });
    } catch (error) {
        console.error('Error fetching class details:', error);
        return NextResponse.json({ error: 'Failed to fetch class details' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
