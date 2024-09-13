import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { classIds, studentId } = req.body;

    if (!classIds || !studentId) {
        return res.status(400).json({ message: 'Missing classIds or studentId' });
    }

    try {
        for (const classId of classIds) {
            // Fetch class information
            const classInfo = await prisma.classes.findUnique({
                where: { id: classId }
            });

            if (!classInfo) {
                return res.status(404).json({ message: `Class with ID ${classId} not found` });
            }

            // Check if class is full
            if (classInfo.current_enrollments === null || classInfo.class_size === null) {
                return res.status(500).json({ message: `Class data is incomplete` });
            }

            if (classInfo.current_enrollments >= classInfo.class_size) {
                return res.status(400).json({ message: `Class ${classInfo.class_name} is full` });
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

        res.status(200).json({ message: 'Classes registered successfully!' });
    } catch (error) {
        console.error('Error registering classes:', error);
        res.status(500).json({ message: 'Failed to register classes' });
    }
}
