import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('API Key: ', process.env.OPENAI_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get user input
    const { query } = await req.json();

    // Log the query for debugging
    console.log('User Query:', query);

    // Query OpenAI for natural language processing
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: query,
        },
      ],
    });

    const response = completion.choices[0]?.message?.content;

    // Log the response from OpenAI
    console.log('OpenAI Response:', response);

    // Format the response if needed
    // This part depends on how you want to parse and display the response

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    return NextResponse.json({ error: 'Something went wrong while querying OpenAI' }, { status: 500 });
  }
}
