"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.GET = GET;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { first_name, last_name, email, user_type, enrollment_date, degree_path, profile_picture, password } = yield request.json();
            // Ensure that the fields match the schema and are correctly passed
            const newStudent = yield prisma.students.create({
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
    });
}
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const students = yield prisma.students.findMany();
            return new Response(JSON.stringify(students), { status: 200 });
        }
        catch (error) {
            console.error('Error fetching students:', error);
            return new Response('Error fetching students', { status: 500 });
        }
    });
}
