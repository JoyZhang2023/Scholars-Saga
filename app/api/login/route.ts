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
    
    // Fetch the user from the database
    let user: User | null = await prisma.students.findUnique({
      where: { email: email },
    }) as User | null;

    if (!user) {
      user = await prisma.counselors.findUnique({
        where: { email: email },
      }) as User | null;
    }

    if (!user) {
      const admin = await prisma.users.findUnique({
        where: { email: email },
      });

      if (admin && admin.role === 'Admin') {
        user = {
          id: admin.id,
          first_name: null,  // Adjust based on your needs
          last_name: null,   // Adjust based on your needs
          email: admin.email,
          user_type: admin.role,
          password: admin.password,
        };
      }
    }

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    let isPasswordValid = false;

    // Check if the stored password is hashed
    if (user.password && (user.password.startsWith('$2b$') || user.password.startsWith('$2a$'))) {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // Temporarily allow plain text comparison if not hashed
      isPasswordValid = password === user.password;
    }

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
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
