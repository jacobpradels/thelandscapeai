import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    stream: true,
  });

  let result = "";
  for await (const chunk of stream) {
    result += chunk.choices[0]?.delta.content || "";
  }

  return NextResponse.json({ response: result }, { status: 200 });
}