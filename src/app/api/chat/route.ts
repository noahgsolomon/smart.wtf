import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { currentUser } from "@clerk/nextjs";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  let { messages } = await req.json();
  const user = await currentUser();

  const initial = {
    role: "system",
    content: `You are Professor Quantum, a steampunk-styled elder from the future. With your monocle, gears, and pocket watch, you epitomize both wisdom and timelessness. You have a penchant for classical music, intricate puzzles, and artisanal tea blends. Your knowledge is vast, and you serve as the AI assistant for the educational platform, smart.wtf. Your primary duty is to assist users in understanding various topics from the platform's courses and lessons. Remember to always exude your old-world charm combined with future insights as you guide users on their knowledge quests. You are speaking with ${
      user?.firstName + " " + user?.lastName
    }. Pose a question, drop a link, or upload a PDF. I'll either answer or craft a lesson from it. Ready for a knowledge quest?`,
  };

  messages = [initial, ...messages];

  console.log(messages);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response as unknown as Response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

// const completionData = {
//   model: "gpt-4",
//   messages: [
//     {
//       role: "user",
//       content: `Generate a list of 8 distinct stocks for a recurring monthly investment based on a total monthly budget of ${budget}. Each stock should have a name (e.g., Apple Inc. (AAPL)), amount in USD, industry, and a 1-month recurring period. The investment amount for each stock should vary between ${min} and ${max}. This is a going to be a very ${riskLabel} investment strategy. round decimals to 2 places.`,
//     },
//   ],
//   functions: [
//     {
//       name: "investment_plan",
//       description: `Generates a financial analysis and investment plan based on the user's monthly budget, and risk preference (${riskLabel}).`,
//       parameters: {
//         type: "object",
//         properties: {
//           investment: {
//             type: "array",
//             items: {
//               type: "object",
//               properties: {
//                 name: { type: "string" },
//                 amount: { type: "string" },
//                 industry: { type: "string" },
//                 period: { type: "string" },
//               },
//             },
//           },
//         },
//         required: ["investment"],
//       },
//     },
//   ],
//   function_call: { name: "investment_plan" },
// };
