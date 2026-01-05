import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRoadmap(userData: { goal: string; currentSkill: string; hoursPerWeek: number }) {
  const { goal, currentSkill, hoursPerWeek } = userData;
  
  const systemPrompt = `
    You are an expert career coach and technical mentor. 
    Create a highly personalized learning roadmap for a user who wants to achieve: "${goal}".
    
    User Context:
    - Current related skill: ${currentSkill}
    - Time Commitment: ${hoursPerWeek} hours/week

    Requirements:
    1. Break the goal into logical, chronological steps.
    2. For each step, provide 2 high-quality free learning resources (e.g., MDN, YouTube, documentation).
    3. Estimate hours per step, consistent with the user's weekly availability.
    4. Return ONLY valid JSON (no markdown) with exactly this shape:
       {
         "goal": string,
         "totalEstimatedWeeks": number,
         "steps": [
           {
             "title": string,
             "description": string,
             "estimatedHours": number,
             "resources": [
               { "label": string, "url": string },
               { "label": string, "url": string }
             ]
           }
         ]
       }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Generate a roadmap for ${goal}` }
    ],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error('OpenAI returned an empty response message content');
  }

  return JSON.parse(content);
}