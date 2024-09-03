import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const userType = url.searchParams.get('user_type');

    if (!id) {
      return new Response('Invalid ID', { status: 400 });
    }

    let user;

    if (userType === 'student') {
      user = await prisma.students.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!user) {
        return new Response('Student not found', { status: 400 });
      }
    } else if (userType === 'counselor') {
      user = await prisma.counselors.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!user) {
        return new Response('Counselor not found', { status: 404 });
      }
    } else {
      return new Response('Invalid user type', { status : 400 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Error fetching user', { status: 500 });
  }
}