// pages/api/user/registerClasses.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.user?.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await prisma.students.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return res.status(404).json({ message: 'Student not found' });
  }

  if (req.method === 'GET') {
    const registeredClasses = await prisma.enrollment.findMany({
      where: { student_id: user.id },
      include: { class: true },
    });
    return res.status(200).json(registeredClasses.map(e => e.class));
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
