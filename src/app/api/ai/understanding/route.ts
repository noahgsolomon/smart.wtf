import { OpenAI } from "openai";

type UnderstandRequest = Request & {
  body: {
    question: string;
    answer: string;
  };
};
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: UnderstandRequest) {
  try {
    const requestBody = await req.json();
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `A user is answering the question: "${requestBody.question}". Their answer is: "${requestBody.answer}". Please return a JSON object with a 'response' object that contains a boolean 'correct'.`,
        },
      ],
      functions: [
        {
          name: "question_answer",
          description: `Determines if a user's answer to a question is correct along with explanation.`,
          parameters: {
            type: "object",
            properties: {
              response: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    correct: { type: "boolean" },
                    explanation: { type: "string" },
                  },
                },
              },
            },
            required: ["response"],
          },
        },
      ],
      function_call: { name: "question_answer" },
      model: "gpt-4-1106-preview",
    });

    const responseBody = JSON.parse(
      completion.choices[0]?.message.function_call?.arguments!,
    );

    return new Response(
      JSON.stringify({
        status: 200,
        body: {
          data: {
            correct: responseBody.response[0].correct,
          },
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        body: {
          error: "Internal Server Error",
          message: error,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
