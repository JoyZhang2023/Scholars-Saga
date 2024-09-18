import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003", // Use the appropriate model
      prompt: query,
      max_tokens: 150,
    });

    const userPrompt = completion.choices[0]?.text || '';

    return NextResponse.json({ response: userPrompt });
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    return NextResponse.json({ error: 'Failed to query OpenAI' }, { status: 500 });
  }
}
