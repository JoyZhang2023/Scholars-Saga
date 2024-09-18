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
const express_1 = __importDefault(require("express"));
const openai_1 = require("openai");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
router.post('/query-openai', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.body;
    try {
        const completion = yield openai.createCompletion({
            model: 'text-davinci-003', // Choose the appropriate model
            prompt: query,
            max_tokens: 150,
        });
        const responseData = completion.data;
        const userPrompt = responseData.choices[0].text;
        const dbResult = yield getClassesFromDatabase(userPrompt);
        res.json({ response: dbResult });
    }
    catch (error) {
        console.error('Error querying OpenAI:', error);
        res.status(500).json({ error: 'Failed to query OpenAI' });
    }
}));
const getClassesFromDatabase = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    let subject;
    let startTime;
    if (prompt.includes('math')) {
        subject = 'Math';
    }
    else if (prompt.includes('science')) {
        subject = 'Science';
    }
    if (prompt.includes('after 10 am')) {
        startTime = '10:00:00';
    }
    else if (prompt.includes('before 12 pm')) {
        startTime = '12:00:00';
    }
    const classes = yield prisma.classes.findMany({
        where: Object.assign(Object.assign({}, (subject ? { class_category: subject } : {})), (startTime ? { startTime: { gt: startTime } } : {})),
    });
    return classes.length ? JSON.stringify(classes) : 'No classes found based on your query.';
});
exports.default = router;
