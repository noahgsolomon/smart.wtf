import { OpenAI } from "openai";

type UnderstandRequest = Request & {
  body: {
    note: string;
  };
};
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: UnderstandRequest) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Generate a series of questions on the topic "${req.body.note}". The questions should be a mix of understanding, quiz, and sorting types. For 'understanding' questions, provide a question that assesses comprehension of the topic. For 'quiz' questions, offer multiple-choice questions related to the topic with a correct option. For 'sorting' questions, create statements that need to be arranged in a logical or sequential order. Ensure that each question is accompanied by its markdown-formatted text and any necessary options or answers for evaluation. Do not include any of the question options in the questionMarkdown!! The questions function must be called and should contain a mix of quiz, understanding, and sorting questions. It should be 4 questions total.
          
          For mathematical expressions and code blocks, use appropriate markdown formatting. For example, for math we use RehypeKaTeX, and here are some math examples:

        - Simple expression: $$x$$ renders as x.
        - Power notation: $$x^2$$ renders as x^2.
        - Function with multiple variables: $$f(x, y, z)$$ renders as f(x, y, z).
        - Partial derivatives: $$\\frac{\\partial^2 f}{\\partial x \\partial y}$$ renders as \\frac{\\partial^2 f}{\\partial x \\partial y}.
        - Summation: $$\\sum_{i=1}^{n} i^2$$ renders as \\sum_{i=1}^{n} i^2.

        NOTE: In the examples above, I have used two backslashes where you see one. This is important because of the way strings resolve backslashes in JavaScript, requiring two backslashes to get one backslash in the string.
        
        REMEMBER, YOU MUST GENERATE 4 DIFFERENT QUESTIONS! NO MORE, NO LESS.`,
        },
      ],
      functions: [
        {
          name: "questions",
          description: `Generates a list of questions which each can be either a quiz, understanding, or a sorting question.`,
          parameters: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    quiz: {
                      type: "object",
                      properties: {
                        correctOption: { type: "number" },
                        questionMarkdown: { type: "string" },
                        answerMarkdown: { type: "string" },
                        options: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              order: { type: "number" },
                              option: { type: "string" },
                            },
                          },
                        },
                      },
                      required: [
                        "correctOption",
                        "questionMarkdown",
                        "answerMarkdown",
                        "options",
                      ],
                    },
                    understanding: {
                      type: "object",
                      properties: {
                        questionMarkdown: { type: "string" },
                        answerMarkdown: { type: "string" },
                      },
                      required: ["answerMarkdown", "questionMarkdown"],
                    },
                    sorting: {
                      type: "object",
                      properties: {
                        questionMarkdown: { type: "string" },
                        answerMarkdown: { type: "string" },
                        options: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              order: { type: "number" },
                              option: { type: "string" },
                            },
                          },
                        },
                      },
                      required: [
                        "options",
                        "order",
                        "questionMarkdown",
                        "answerMarkdown",
                      ],
                    },
                  },
                },
              },
            },
            required: ["quiz", "understanding", "sorting"],
          },
        },
      ],
      function_call: { name: "questions" },
      model: "gpt-3.5-turbo-1106",
    });

    const responseBody = await JSON.parse(
      completion.choices[0]?.message.function_call?.arguments!,
    );

    console.log(responseBody.questions.length);

    if (responseBody.questions.length !== 4) {
      await POST(req);
      return;
    }

    for (const question of responseBody.questions) {
      if (question.quiz) {
        console.log("quiz", question.quiz);
      }
      if (question.understanding) {
        console.log("understanding", question.understanding);
      }
      if (question.sorting) {
        console.log("sorting", question.sorting);
      }
    }

    return new Response(
      JSON.stringify({
        status: 200,
        body: {
          questions: responseBody.questions,
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
