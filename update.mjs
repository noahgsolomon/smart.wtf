import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const events = await openai.fineTuning.jobs.listEvents(
  "ftjob-ffXtUakGwvbLH8E00Ji7dFJa",
  {
    limit: 10,
  },
);

console.log(events);
