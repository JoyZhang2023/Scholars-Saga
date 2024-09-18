"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const sdk_1 = __importDefault(require("@anthropic-ai/sdk")); // Use the correct import based on the Anthropic documentation
const anthropic = new sdk_1.default({
    apiKey: process.env.ANTHROPIC_API_KEY,
});
async function POST(request) {
    try {
        const { query } = await request.json();
        // Make a request to the Anthropic API
        const response = await anthropic.completions.create({
            model: "claude-v1", // Replace with the correct model if needed
            prompt: query,
            max_tokens: 150, // Adjust based on your needs
        });
        return server_1.NextResponse.json({ response: response.choices[0]?.text });
    }
    catch (error) {
        console.error('Error handling request:', error);
        return server_1.NextResponse.json({ error: 'Failed to get response from Claude' }, { status: 500 });
    }
}
