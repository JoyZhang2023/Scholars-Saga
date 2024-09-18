"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sdk_1 = __importDefault(require("@anthropic-ai/sdk")); // Use the correct import based on the Anthropic documentation
dotenv_1.default.config(); // Load environment variables
const router = express_1.default.Router();
const anthropic = new sdk_1.default({
    apiKey: process.env.ANTHROPIC_API_KEY,
});
router.post('/query-claude', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter' });
    }
    try {
        const completion = await anthropic.completions.create({
            model: "claude-v1", // Use appropriate model
            prompt: query,
            max_tokens: 150,
        });
        // Access response content directly
        const userPrompt = completion.choices[0]?.text || '';
        res.json({ response: userPrompt });
    }
    catch (error) {
        console.error('Error querying Claude:', error);
        res.status(500).json({ error: 'Failed to query Claude' });
    }
});
exports.default = router;
