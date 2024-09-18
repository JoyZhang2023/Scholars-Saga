"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const prisma_1 = __importDefault(require("../../../../lib/prisma"));
async function GET(request) {
    try {
        const url = new URL(request.url);
        const id = parseInt(url.pathname.split('/')[2], 10);
        const student = await prisma_1.default.students.findUnique({
            where: { id },
        });
        if (!student) {
            return new Response('Student not found', { status: 404 });
        }
        return new Response(JSON.stringify(student), { status: 200 });
    }
    catch (error) {
        console.error('Error fetching student:', error);
        return new Response('Error fetching student', { status: 500 });
    }
}
