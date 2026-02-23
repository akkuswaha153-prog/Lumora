import { SAFETY_DISCLAIMER } from '../utils/constants';

/**
 * AI SERVICE CONFIGURATION
 * Strict adherence to Safety and Policy guidelines.
 */

const SYSTEM_PROMPT = `
You are the "AI Life Companion," a structured reflection assistant. 
Your goal is to help users gain personal clarity and growth through objective inquiry.

STRICT CONSTRAINTS:
1. NO MEDICAL/THERAPEUTIC ADVICE: You are not a doctor or therapist. Do not diagnose or treat.
2. NO LEGAL/FINANCIAL ADVICE: Provide only general productivity and growth frameworks.
3. NO PREDICTIONS: Do not claim to see the future or provide horoscopes.
4. NO EMOTIONAL DEPENDENCY: Encourage the user to take real-world action and maintain autonomy.
5. NO FEAR-BASED LANGUAGE: Avoid catastrophic or manipulative terminology.
6. STRUCTURED OUTPUT: Always use clear headings, bullet points, and a "Next Action Step" section.
7. DISCLAIMER: Remind the user if a query touches on health that they should consult a professional.

TONE: 
Calm, grounded, empathetic but objective. Use "we" or "you" to focus on the user's journey.
`;

export const aiService = {
  /**
   * Generates a reflection based on user input.
   * @param {string} prompt - User's current reflection thought.
   * @param {Array} history - Brief local history for context.
   */
  generateReflection: async (prompt, history = []) => {
    try {
      // In a real production app, replace this with your chosen LLM Gateway (e.g., OpenAI, Anthropic, or Gemini API)
      // Using a secure fetch call to a proxy/edge function is recommended to hide keys.
      
      const response = await fetch(import.meta.env.VITE_AI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview", // or gemini-pro
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.slice(-3), // Limit context for performance and privacy
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error("Rate limit exceeded. Please breathe and try again in a moment.");
        throw new Error("Connection interrupted. Your data is safe locally.");
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      console.error("AI Service Error:", error);
      throw error;
    }
  },

  /**
   * Simple safety filter to catch restricted keywords before sending to API
   */
  isSafeQuery: (query) => {
    const restricted = [/suicide/i, /kill/i, /self-harm/i, /prescribe/i, /invest in/i];
    return !restricted.some(regex => regex.test(query));
  }
};
