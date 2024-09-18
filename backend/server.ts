import express from 'express';
import aiAssistantRouter from '../app/api/ai_assistant/query-openai'; // Update path if needed

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Route for AI assistant
app.use('/api/ai_assistant', aiAssistantRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
