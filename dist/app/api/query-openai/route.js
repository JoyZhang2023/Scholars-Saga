"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const openai_1 = __importDefault(require("openai"));
// Initialize OpenAI API client
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
async function POST(request) {
    try {
        const { query } = await request.json();
        // Make a request to the OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use the model you prefer
            messages: [{ role: "user", content: query }],
        });
        return server_1.NextResponse.json({ response: completion.choices[0]?.message?.content });
    }
    catch (error) {
        console.error('Error handling request:', error);
        return server_1.NextResponse.json({ error: 'Failed to get response from OpenAI' }, { status: 500 });
    }
}
