import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { preferences } = await req.json();
        const prompt = `Based on the following preferences: "${preferences}", recommend 5 movies or TV shows. For each item, provide the title and specify whether it's a movie or TV show. Return the results as a JSON array of objects, each with 'title' and 'type' properties.`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);

        // Properly handle the response text extraction
        const text = result.responses[0].text; // Assuming responses is an array containing the generated text

        const recommendations = JSON.parse(text);
        return NextResponse.json({ recommendations });

    } catch (error) {
        console.error('Error fetching movie and TV show recommendations:', error.message);
        return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
    }
}
