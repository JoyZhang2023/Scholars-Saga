"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const query_claude_1 = __importDefault(require("../app/api/ai_assistant/query-claude")); // Adjust path as needed
const app = (0, express_1.default)();
// Middleware for parsing JSON requests
app.use(express_1.default.json());
// Route for AI assistant
app.use('/api/ai_assistant', query_claude_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
