import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
function getClient() { return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "", baseURL: "https://api.deepseek.com/v1" }); }

export async function POST(req: NextRequest) {
  try {
    const { honoree, relationship, funnyTraits, cleanOrRaunchy } = await req.json();
    const prompt = `Write a hilarious roast speech:\nHonoree: ${honoree || "Person being roasted"}\nYour Relationship: ${relationship || "Friend/Sibling/Coworker"}\nFunny Traits/Stories: ${funnyTraits || "Embarrassing but relatable anecdotes"}\nLevel: ${cleanOrRaunchy || "Family-friendly but edgy"}\n\nMake it genuinely funny, self-deprecating where appropriate, warm-hearted beneath the jokes. Structure with: Opening zinger, 4-5 roast segments with stories, heartfelt ending.`;
    const completion = await getClient().chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 2000, temperature: 0.9 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No output." });
  } catch (e) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
