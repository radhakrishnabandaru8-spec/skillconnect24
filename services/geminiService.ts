import { GoogleGenAI } from "@google/genai";
import { User } from '../types';

const getAI = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey });
}

export const getSkillBuddyResponse = async (prompt: string, user: User): Promise<string> => {
  try {
    const ai = getAI();
    
    const userProfileSummary = `
      User Name: ${user.name}
      User Bio: ${user.bio}
      User Skills: ${user.skills.join(', ')}
    `;

    const systemInstruction = `
      You are "SkillBuddy", a helpful and friendly assistant for the SkillConnect platform.
      Your goal is to help users with their career development by suggesting courses and jobs, and offering advice.
      You MUST be concise and encouraging.
      Here is the current user's profile:
      ${userProfileSummary}
      
      When suggesting courses or jobs, refer to the user's skills.
      When asked for career tips, provide short, actionable advice.
      Keep your responses under 100 words.
      Format your response using simple markdown for readability (e.g., bolding, bullet points).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    return "I'm sorry, I encountered an error while processing your request. Please check the console for details.";
  }
};