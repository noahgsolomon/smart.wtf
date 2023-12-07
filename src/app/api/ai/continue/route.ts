import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new OpenAIApi(configuration);

const markdownResponse = async (
  title: string,
  markdown: string,
  agentPrompt: string,
  agent: boolean,
) => {
  const responseFetch = await client.createChatCompletion({
    model: "gpt-4-1106-preview",
    temperature: agent ? 1.0 : 0.3,
    stream: true,
    messages: [
      {
        content: `${agentPrompt} Continue the markdown document on the specified topic, aiming for an additional 1,000 words. The document should not repeat what is already present in the previous content, and should focus on something new that is a logical next step for the material that has been previously discussed.

        It is mandatory to include at least one image to enhance the understanding of the topic. Please add placeholders for images where relevant with the format ![Search Query Text](image-N-asset), where N represents the order of the image (the first image would be image-1-asset, and so on). Provide their search queries in the square brackets but do not include the searchQueries visibly in the text; they should only be in the alt text of the image placeholders. If you believe an SVG format is best suited for an image, include 'filetype:svg' in its search query. Under the image, in italics, write a little description of the image.

        Ensure the final output is all in markdown format, and that the image placeholders are in the correct format.

        For mathematical expressions and code blocks, use appropriate markdown formatting. For example, for math we use RehypeKaTeX, and here are some math examples:

        - Simple expression: $$x$$ renders as x.
        - Power notation: $$x^2$$ renders as x^2.
        - Function with multiple variables: $$f(x, y, z)$$ renders as f(x, y, z).
        - Partial derivatives: $$\\frac{\\partial^2 f}{\\partial x \\partial y}$$ renders as \\frac{\\partial^2 f}{\\partial x \\partial y}.
        - Summation: $$\\sum_{i=1}^{n} i^2$$ renders as \\sum_{i=1}^{n} i^2.

        NOTE: In the examples above, I have used two backslashes where you see one. This is important because of the way strings resolve backslashes in JavaScript, requiring two backslashes to get one backslash in the string.`,
        role: "system",
      },
      {
        content: `Continue in markdown a detailed lesson on ${title}. The previous material which has already been written is as follows:
        
        ${markdown}`,
        role: "system",
      },
    ],
  });

  const stream = OpenAIStream(responseFetch);

  return new StreamingTextResponse(stream);
};

export async function POST(request: Request) {
  const { title, markdown, agentPrompt, agent } = await request.json();

  const stream = await markdownResponse(title, markdown, agentPrompt, agent);

  return stream;
}
