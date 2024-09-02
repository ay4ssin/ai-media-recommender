import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { preferences } = await req.json();

        // Validate preferences
        if (!preferences) {
            return NextResponse.json({ error: 'Preferences not provided' }, { status: 400 });
        }

        const prompt = `Based on the following preferences: "${preferences}", recommend 5 books. For each book, provide the title and author. Return the results as a JSON array of objects, each with 'title' and 'author' properties.`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Ensure model object is correctly instantiated
        if (!model) {
            throw new Error('Failed to instantiate the generative model.');
        }

        const result = await model.generateContent(prompt);

        // Validate result and responses
        if (!result || !result.responses || result.responses.length === 0) {
            throw new Error('No responses returned from the AI model.');
        }

        // Extract response text
        const rawText = result.responses[0]?.text;

        if (!rawText) {
            throw new Error('Response text is undefined.');
        }

        // Clean the response text (e.g., remove Markdown or unexpected characters)
        // Basic example: remove any leading or trailing backticks or code blocks
        const cleanedText = rawText
            .replace(/^```json/, '')   // Remove any leading JSON code block markers
            .replace(/```$/, '')       // Remove any trailing code block markers
            .trim();                   // Remove any extra whitespace

        // Parse JSON response
        let recommendations;
        try {
            recommendations = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', parseError.message);
            return NextResponse.json({ error: 'Failed to parse AI response as JSON' }, { status: 500 });
        }

        return NextResponse.json({ recommendations });

    } catch (error) {
        console.error('Error fetching book recommendations:', error.message);
        return NextResponse.json({ error: 'Failed to fetch recommendations: ' + error.message }, { status: 500 });
    }
}
