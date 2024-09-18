// pages/api/user/registerClasses.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.user?.role) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await prisma.students.findUnique({
    where: { id: session.user.profile_id },
  });

  if (!user) {
    return res.status(404).json({ message: 'Student not found' });
  }

  if (req.method === 'GET') {
    const registeredClasses = await prisma.enrollment.findMany({
      where: { student_id: user.id },
      include: { classes: true },
    });
    return res.status(200).json(registeredClasses.map(e => e.classes));
  }

  if (req.method === 'POST') {
    const { classIds }: { classIds: number[] } = req.body;
    await prisma.enrollment.deleteMany({
      where: { student_id: user.id },
    });
    const enrollments = classIds.map(classId => ({
      student_id: user.id,
      class_id: classId,
    }));
    await prisma.enrollment.createMany({ data: enrollments });
    return res.status(200).json({ message: 'Registered classes updated' });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
