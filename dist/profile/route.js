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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function GET(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = new URL(request.url);
            const id = parseInt(url.searchParams.get('id') || '', 10);
            if (isNaN(id)) {
                return new Response('Invalid student ID', { status: 400 });
            }
            const student = yield prisma_1.default.students.findUnique({
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
    });
}
