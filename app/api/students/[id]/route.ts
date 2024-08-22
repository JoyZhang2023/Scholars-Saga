import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split('/')[2], 10);

    const student = await prisma.students.findUnique({
      where: { id },
    });

    if (!student) {
      return new Response('Student not found', { status: 404 });
    }

    return new Response(JSON.stringify(student), { status: 200 });
  } catch (error) {
    console.error('Error fetching student:', error);
    return new Response('Error fetching student', { status: 500 });
  }
}
