"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const router = express_1.default.Router();
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
router.post('/query-openai', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter' });
    }
    try {
        const completion = await openai.completions.create({
            model: "text-davinci-003", // Use appropriate model
            prompt: query,
            max_tokens: 150,
        });
        // Access response content directly
        const userPrompt = completion.choices[0]?.text || '';
        res.json({ response: userPrompt });
    }
    catch (error) {
        console.error('Error querying OpenAI:', error);
        res.status(500).json({ error: 'Failed to query OpenAI' });
    }
});
exports.default = router;
