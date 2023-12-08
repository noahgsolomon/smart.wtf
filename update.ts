import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const validNote = async (note: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: `Evaluate the user's request for a note on the topic: "${note}". Determine whether the topic is appropriate and substantial enough for an academic or educational note. If the topic is inappropriate, offensive, lacks educational value, or is nonsensical, return a JSON object with the attribute 'valid' set to false. If the topic is appropriate and has enough depth for an in-depth exploration of 1,000+ words, return a JSON object with the following attributes: 'valid' (set to true), 'description' (a brief one-sentence description of the topic), 'title' (the suggested title for the note), and 'category' (choose from ENGLISH, MATH, SCIENCE, HISTORY, ARTS, MUSIC, LITERATURE, PHILOSOPHY, GEOGRAPHY, SOCIAL STUDIES, PHYSICAL EDUCATION, COMPUTER SCIENCE, ECONOMICS, BUSINESS STUDIES, PSYCHOLOGY, LAW, POLITICAL SCIENCE, ENVIRONMENTAL SCIENCE, ENGINEERING, MEDICINE, AGRICULTURE, ASTRONOMY).`,
        },
      ],

      response_format: { type: "json_object" },
    });

    const argumentsData = JSON.parse(
      response.choices[0]?.message.content ?? "{}",
    );

    return argumentsData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

console.log(await validNote("hello world"));
