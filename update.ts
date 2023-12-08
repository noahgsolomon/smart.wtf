import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const imagePrompt = async (title: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:personal::8TEhcfKm",
      messages: [
        {
          role: "user",
          content: title,
        },
      ],
    });

    return response.choices[0]?.message.content;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const imageGeneration = async (prompt: string) => {
  const detailed8BitPreface =
    "Create an image in a detailed retro 8-bit style. The artwork should have a pixelated texture and should have vibrant coloring and scenery.";

  const fullPrompt = `${detailed8BitPreface} ${prompt} Remember, this is in retro 8-bit style`;

  const responseFetch = await openai.images.generate({
    model: "dall-e-3",
    prompt: fullPrompt,
    n: 1,
    size: "1792x1024",
    quality: "hd",
    style: "vivid",
    response_format: "url",
    user: "user-1234",
  });

  return responseFetch.data[0]?.url;
};

// console.log(await imagePrompt("Consensus Algorithms in Distributed Systems"));

console.log(
  await imageGeneration(
    "Create an image reminiscent of ancient cave paintings, with a modern twist. In a dimly lit cave, a group of stick figures from various backgrounds and cultures stand in a circle. Each figure is holding a smartphone or tablet, and they're all tapping away on their devices, symbolizing the exchange of information and communication in a distributed system. The cave walls, adorned with primitive drawings of animals and shapes, also have digital screens displaying complex mathematical algorithms and diagrams. This blend of ancient and modern elements portrays the evolution of consensus algorithms in a whimsical and thought-provoking manner.",
  ),
);
