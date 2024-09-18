'use client';

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  user_type: string | null;
  password: string | null;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log('Received Email:', email);
    console.log('Received Password:', password);

    // Query students or counselors table
    let user: User | null = await prisma.students.findUnique({
      where: { email: email },
    }) as User | null;

    if (!user) {
      user = await prisma.counselors.findUnique({
        where: { email: email },
      }) as User | null;
    }

    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    console.log('User from DB:', user);

    const token = jwt.sign(
      { id: user.id, role: user.user_type },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token, user }, { status: 200 });
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ message: 'Error logging in' }, { status: 500 });
  }
}
