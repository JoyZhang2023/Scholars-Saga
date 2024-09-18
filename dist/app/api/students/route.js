"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.GET = GET;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function POST(request) {
    try {
        const { first_name, last_name, email, user_type, enrollment_date, degree_path, profile_picture, password } = await request.json();
        // Ensure that the fields match the schema and are correctly passed
        const newStudent = await prisma.students.create({
            data: {
                first_name,
                last_name,
                email,
                user_type,
                enrollment_date: new Date(enrollment_date), // Ensure correct date format
                degree_path,
                profile_picture, // Optional field
                password, // Required field
            },
        });
        return new Response(JSON.stringify(newStudent), { status: 201 });
    }
    catch (error) {
        console.error('Error creating student:', error);
        return new Response('Error creating student', { status: 500 });
    }
}
async function GET() {
    try {
        const students = await prisma.students.findMany();
        return new Response(JSON.stringify(students), { status: 200 });
    }
    catch (error) {
        console.error('Error fetching students:', error);
        return new Response('Error fetching students', { status: 500 });
    }
}
