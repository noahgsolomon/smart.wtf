import { eq, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { notes } from "@/server/db/schemas/notes/schema";
import { z } from "zod";
import OpenAI from "openai";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/server/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const emojis = {
//   ENGLISH: [
//     "📚",
//     "🖋️",
//     "📖",
//     "✒️",
//     "📝",
//     "📕",
//     "📗",
//     "📘",
//     "📙",
//     "📓",
//     "📔",
//     "📒",
//     "📃",
//     "📜",
//     "📰",
//     "🗞️",
//     "📑",
//     "👩‍🏫",
//     "👨‍🏫",
//     "🏫",
//   ],
//   MATH: [
//     "📐",
//     "📏",
//     "📈",
//     "📉",
//     "🔢",
//     "🧮",
//     "📚",
//     "👩‍🔬",
//     "👨‍🔬",
//     "🔬",
//     "📖",
//     "🏫",
//     "💹",
//     "🔭",
//     "🔎",
//     "📏",
//   ],
//   SCIENCE: ["🔬", "🧬", "🧪", "🌡️", "🔭", "🧫", "🧲", "🔩", "🧯", "🔮", "🧪"],
//   HISTORY: [
//     "🏰",
//     "🗿",
//     "📜",
//     "⚔️",
//     "🕰️",
//     "🧭",
//     "📯",
//     "🏺",
//     "🗡️",
//     "🛡️",
//     "🔱",
//     "⚱️",
//     "🏛️",
//     "👑",
//     "📚",
//     "📖",
//     "🏫",
//     "📰",
//     "🗞️",
//     "📜",
//   ],
//   ARTS: [
//     "🎨",
//     "🖌️",
//     "🖼️",
//     "🎭",
//     "📷",
//     "🎬",
//     "🎤",
//     "🎵",
//     "🎶",
//     "🎻",
//     "🎷",
//     "🎹",
//     "🎺",
//     "🪕",
//     "📹",
//     "🎞️",
//     "🖋️",
//     "📽️",
//     "🧶",
//     "🎯",
//   ],
//   MUSIC: [
//     "🎵",
//     "🎶",
//     "🎤",
//     "🎧",
//     "🎷",
//     "🎸",
//     "🎹",
//     "🥁",
//     "🎻",
//     "🎺",
//     "🪕",
//     "📯",
//     "🔊",
//     "📻",
//     "🎙️",
//     "🎚️",
//     "🎛️",
//     "🎼",
//     "🎉",
//     "📀",
//   ],
//   LITERATURE: [
//     "📚",
//     "📖",
//     "✍️",
//     "📕",
//     "🔖",
//     "📜",
//     "📙",
//     "📘",
//     "📗",
//     "📓",
//     "📔",
//     "📒",
//     "📝",
//     "🖋️",
//     "🖊️",
//     "🖌️",
//     "🖍️",
//     "📰",
//     "🗞️",
//     "📚",
//   ],
//   PHILOSOPHY: [
//     "🤔",
//     "💭",
//     "📜",
//     "👴",
//     "📚",
//     "📖",
//     "✍️",
//     "🏛️",
//     "👩‍🏫",
//     "👨‍🏫",
//     "🧠",
//     "📝",
//     "🗿",
//     "🔮",
//     "🌌",
//     "🪐",
//     "🌍",
//     "👁️",
//     "🕉️",
//     "🔯",
//   ],
//   GEOGRAPHY: [
//     "🌍",
//     "🌋",
//     "🏞️",
//     "🗺️",
//     "🌐",
//     "🏔️",
//     "🌊",
//     "🏝️",
//     "🏜️",
//     "🌅",
//     "🌄",
//     "🌠",
//     "🪐",
//     "🌌",
//     "🌁",
//     "🌉",
//     "🌏",
//     "🌎",
//     "🌖",
//     "🌘",
//   ],
//   "SOCIAL STUDIES": [
//     "🏛️",
//     "👥",
//     "🌍",
//     "💬",
//     "📊",
//     "🏫",
//     "📰",
//     "🗞️",
//     "📚",
//     "📖",
//     "🗺️",
//     "🌐",
//     "👩‍🏫",
//     "👨‍🏫",
//     "🔍",
//     "📝",
//     "📑",
//     "📈",
//     "📉",
//     "💼",
//   ],
//   "PHYSICAL EDUCATION": [
//     "⚽",
//     "🏀",
//     "🏋️‍♂️",
//     "🤸‍♀️",
//     "🚴‍♀️",
//     "🏐",
//     "🏈",
//     "🏓",
//     "🏸",
//     "🏒",
//     "🥋",
//     "🎾",
//     "🥊",
//     "🥅",
//     "🤾‍♀️",
//     "🤾‍♂️",
//     "🏊‍♀️",
//     "🏊‍♂️",
//     "🤽‍♀️",
//     "🤽‍♂️",
//   ],
//   "COMPUTER SCIENCE": [
//     "💻",
//     "🖥️",
//     "🔌",
//     "🕹️",
//     "👩‍💻",
//     "👨‍💻",
//     "🖱️",
//     "🖲️",
//     "💾",
//     "📀",
//     "🧮",
//     "🔋",
//     "📡",
//     "🔍",
//     "🔒",
//     "🔑",
//     "📊",
//     "📈",
//     "📉",
//     "📚",
//   ],
//   ECONOMICS: [
//     "💹",
//     "💰",
//     "📉",
//     "📈",
//     "🏦",
//     "🪙",
//     "🏧",
//     "📊",
//     "💳",
//     "💸",
//     "🧾",
//     "📑",
//     "📚",
//     "📖",
//     "📜",
//     "🖋️",
//     "🖊️",
//     "📝",
//     "🔍",
//     "🏪",
//   ],
//   "BUSINESS STUDIES": [
//     "👔",
//     "💼",
//     "📈",
//     "🏢",
//     "📊",
//     "💳",
//     "💰",
//     "📉",
//     "🏦",
//     "💹",
//     "🧾",
//     "📑",
//     "📚",
//     "📖",
//     "📝",
//     "📰",
//     "🗞️",
//     "📎",
//     "🖇️",
//     "🗃️",
//   ],
//   PSYCHOLOGY: [
//     "🧠",
//     "💭",
//     "👀",
//     "🤯",
//     "🗣️",
//     "📚",
//     "📖",
//     "🔍",
//     "🔬",
//     "👩‍🏫",
//     "👨‍🏫",
//     "💡",
//     "📝",
//     "🧐",
//     "🕵️‍♂️",
//     "🕵️‍♀️",
//     "🔮",
//     "🎭",
//     "🖼️",
//     "📰",
//   ],
//   LAW: [
//     "⚖️",
//     "👩‍⚖️",
//     "📜",
//     "🔒",
//     "🚔",
//     "🏛️",
//     "📚",
//     "📖",
//     "🖋️",
//     "🖊️",
//     "📝",
//     "🔍",
//     "🔐",
//     "🔑",
//     "📰",
//     "🗞️",
//     "👮‍♂️",
//     "👮‍♀️",
//     "📎",
//     "🖇️",
//   ],
//   "POLITICAL SCIENCE": [
//     "🏛️",
//     "🗳️",
//     "👩‍⚖️",
//     "💬",
//     "🌐",
//     "📚",
//     "📖",
//     "📜",
//     "📰",
//     "🗞️",
//     "📝",
//     "🖋️",
//     "🖊️",
//     "🎙️",
//     "📡",
//     "📈",
//     "📉",
//     "🏫",
//     "👩‍🏫",
//     "👨‍🏫",
//   ],
//   "ENVIRONMENTAL SCIENCE": [
//     "🌱",
//     "🌏",
//     "♻️",
//     "🌳",
//     "🌲",
//     "🌍",
//     "🌎",
//     "🌊",
//     "🏞️",
//     "🏔️",
//     "🏝️",
//     "🏜️",
//     "🌐",
//     "🌬️",
//     "🌪️",
//     "🔥",
//     "💧",
//     "🌧️",
//     "🌦️",
//     "🌄",
//   ],
//   ENGINEERING: [
//     "⚙️",
//     "🔧",
//     "🔩",
//     "🏗️",
//     "🔬",
//     "🔭",
//     "🔌",
//     "🚀",
//     "🚧",
//     "🏭",
//     "🏠",
//     "🏡",
//     "🏢",
//     "🏣",
//     "🏤",
//     "🌉",
//     "🌁",
//     "🛤️",
//     "🚂",
//     "🚅",
//   ],
//   MEDICINE: [
//     "💊",
//     "🔬",
//     "🩺",
//     "🩹",
//     "🧬",
//     "🏥",
//     "🚑",
//     "🩸",
//     "🔬",
//     "🧪",
//     "👩‍⚕️",
//     "👨‍⚕️",
//     "🩻",
//     "🦠",
//     "💉",
//     "🌡️",
//     "🔭",
//     "🚿",
//     "🛌",
//     "🦷",
//   ],
//   AGRICULTURE: [
//     "🚜",
//     "🌾",
//     "🐄",
//     "🍏",
//     "🌽",
//     "🍅",
//     "🥕",
//     "🍇",
//     "🍉",
//     "🌻",
//     "👩‍🌾",
//     "👨‍🌾",
//     "🏡",
//     "🐖",
//     "🐔",
//     "🥬",
//     "🍒",
//     "🍋",
//     "🍓",
//     "🐑",
//   ],
//   ASTRONOMY: [
//     "🌌",
//     "🚀",
//     "🌠",
//     "🔭",
//     "🌕",
//     "🌛",
//     "🌜",
//     "🪐",
//     "🌟",
//     "🌞",
//     "🌏",
//     "🌍",
//     "🌎",
//     "🌑",
//     "🌒",
//     "🌓",
//     "🌔",
//     "🌙",
//     "☄️",
//     "💫",
//   ],
// };

// function getRandomEmoji(category: NoteCategories): string {
//   const emojisForCategory = emojis[category];
//   return (
//     emojisForCategory[Math.floor(Math.random() * emojisForCategory.length)] ??
//     "📚"
//   );
// }

export const notesRouter = createTRPCRouter({
  deleteNote: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(notes).where(eq(notes.id, input.id));
    }),
  createImage: publicProcedure
    .input(z.object({ title: z.string(), id: z.number() }))
    .mutation(async ({ input: { title, id } }) => {
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

      const imageUrl = await imageGeneration((await imagePrompt(title)) ?? "");

      if (!imageUrl) {
        throw new Error("Image URL not found in response");
      }

      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch image from URL");
      }

      const arrayBuffer = await imageResponse.arrayBuffer();
      const imageData = Buffer.from(arrayBuffer);

      const s3Client = new S3Client({ region: "us-east-1" });

      await s3Client.send(
        new PutObjectCommand({
          Bucket: "smartimagebucket",
          Key: `note-${id}-image.png`,
          Body: imageData,
          ContentType: "image/png",
        }),
      );

      await db
        .update(notes)
        .set({
          imageUrl: `https://images.smart.wtf/note-${id}-image.png`,
        })
        .where(eq(notes.id, id));

      return { imageUrl };
    }),

  validateTopic: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input: { title } }) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              role: "system",
              content:
                title !== "RANDOM"
                  ? `Assess the user's request for an academic or educational note on the topic '${title}'. Verify if the topic is suitable for an educational context. The criteria for a valid topic include appropriateness, educational value, and the potential for an in-depth exploration of at least 1,000 words. If the topic fails to meet these criteria (i.e., it is inappropriate, offensive, lacks educational value, or is nonsensical), return a JSON object with 'valid': false. For valid topics, return a JSON object with 'valid': true, the 'title' of the topic, 'nextTopic' being a topic that would be a good progression or next step from this one, and the appropriate 'category'. The category must be one of the following: ENGLISH, MATH, SCIENCE, HISTORY, ARTS, MUSIC, LITERATURE, PHILOSOPHY, GEOGRAPHY, SOCIAL STUDIES, PHYSICAL EDUCATION, COMPUTER SCIENCE, ECONOMICS, BUSINESS STUDIES, PSYCHOLOGY, LAW, POLITICAL SCIENCE, ENVIRONMENTAL SCIENCE, ENGINEERING, MEDICINE, AGRICULTURE, ASTRONOMY. Ensure the category is an exact match from these options.`
                  : `Create a random educational topic that is detailed and precise, very specific like for example: "Encoding Sentences Using Transformer Models" or "The Assassination of Julius Caesar: A Detailed Account" or "Investigating the Gut Microbiome's Influence on Overall Wellness" or "Decoding Ancient Scripts: The Rosetta Stone's Role in Understanding Hieroglyphics" or "Delving into Chaos Theory: The Butterfly Effect and Predictability in Complex Systems" or "Unveiling Geometry in Art: The Mathematical Structure in M.C. Escher's Work" or "The Rise of Quantum Algorithms: Breaking the Boundaries of Classical Computing" or "The Intricacies of Cryptocurrency Mining and Blockchain Technology". The topic should not be broad; it must be specific and niche, offering a focused subject for in-depth exploration. It should be something hyper-specific, fascinating, and intellectually stimulating. In one of these categories: ENGLISH, MATH, SCIENCE, HISTORY, ARTS, MUSIC, LITERATURE, PHILOSOPHY, GEOGRAPHY, SOCIAL STUDIES, PHYSICAL EDUCATION, COMPUTER SCIENCE, ECONOMICS, BUSINESS STUDIES, PSYCHOLOGY, LAW, POLITICAL SCIENCE, ENVIRONMENTAL SCIENCE, ENGINEERING, MEDICINE, AGRICULTURE, ASTRONOMY. Return a JSON object with 'valid': true, a 'description' of the topic of in 1 short sentence, the 'title' of the topic, 'nextTopic' being a topic that would be a good progression or next step from this one, and the appropriate 'category'. The category must be one of the categories above. Ensure the category is an exact match from these options.`,
            },
          ],

          response_format: { type: "json_object" },
        });

        const argumentsData = JSON.parse(
          response.choices[0]?.message.content ?? "{}",
        );

        if (!argumentsData.valid) {
          return { valid: false };
        }

        return {
          valid: true,
          category: argumentsData.category,
          description: argumentsData.description,
          nextTopic: argumentsData.nextTopic,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }),

  createNote: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        agentId: z.number(),
        category: z.string(),
        nextTopic: z.string(),
      }),
    )
    .mutation(
      async ({ ctx, input: { title, agentId, category, nextTopic } }) => {
        const [newNote] = await db
          .insert(notes)
          .values({
            agent_id: agentId,
            user_id: ctx.user_id,
            title,
            category,
            markdown: "",
            description: "",
            emoji: "",
            minutes: 13,
            nextTopic: nextTopic ?? "",
          })
          .execute();

        return { valid: true, noteId: newNote.insertId };
      },
    ),

  // recommendedNotes: protectedProcedure.query(async ({ ctx }) => {
  //   // const userNotes = await ctx.db.query.notes.findMany({
  //   //   where: eq(notes.user_id, ctx.user_id),
  //   //   columns: {
  //   //     title: true,
  //   //   },
  //   // });
  //   // try {
  //   //   const response = await openai.chat.completions.create({
  //   //     model: "gpt-3.5-turbo-1106",
  //   //     messages: [
  //   //       {
  //   //         role: "system",
  //   //         content: `Based on the user's previous learning topics, including ${userNotes
  //   //           .map((note) => note.title)
  //   //           .join(
  //   //             ", ",
  //   //           )}, generate a list of 3 new study topics as similar or adjacent topics. Return these recommendations in JSON format, with each recommended topic represented as a simple string title under the 'notes' array. The titles should be a relevant emoji followed by the topic. Avoid including descriptions or details—only the titles of the topics are required. These recommendations should be distinct, relevant, and suitable for the user's continued educational progression.`,
  //   //       },
  //   //     ],
  //   //     response_format: { type: "json_object" },
  //   //   });
  //   //   return JSON.parse(response.choices[0]?.message.content ?? "{}").notes;
  //   // } catch (error) {
  //   //   console.error("Error fetching data:", error);
  //   // }
  // }),

  findRandomNotes: publicProcedure.query(async () => {
    const randomNotes = await db.execute(
      sql`SELECT image_url, title, agent_id, id
            FROM notes
            WHERE image_url IS NOT NULL AND agents_markdown IS NOT NULL AND agents_markdown <> ''
            ORDER BY RAND()
            LIMIT 20;`,
    );
    return randomNotes[0] as any;
  }),

  getUserNotes: protectedProcedure.query(async ({ ctx }) => {
    const notesFetch = await ctx.db.query.notes.findMany({
      where: eq(notes.user_id, ctx.user_id),
      with: {
        agents: true,
      },
    });

    return { notes: notesFetch };
  }),

  getNote: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const noteFetch = await db.query.notes.findFirst({
        where: eq(notes.id, input.id),
        with: {
          agents: true,
        },
      });

      if (!noteFetch) {
        throw new Error("Note not found");
      }

      return { note: noteFetch };
    }),

  updateNote: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        markdown: z.string(),
        agent: z.boolean(),
        minutes: z.number(),
      }),
    )
    .mutation(async ({ ctx, input: { id, markdown, agent, minutes } }) => {
      if (agent) {
        await ctx.db
          .update(notes)
          .set({ agents_markdown: markdown, minutes })
          .where(eq(notes.id, id));
      } else {
        await ctx.db
          .update(notes)
          .set({ markdown, minutes })
          .where(eq(notes.id, id));
      }
    }),

  updateImages: protectedProcedure
    .input(
      z.object({
        images: z.array(
          z.object({ asset: z.string(), searchQuery: z.string() }),
        ),
      }),
    )
    .mutation(async ({ input: { images } }) => {
      if (!images) throw new Error("No images provided");

      const replacements = [];

      for (const image of images) {
        const imageFetch = await fetch(
          `https://www.googleapis.com/customsearch/v1?q=${encodeURI(
            image.searchQuery,
          )}&cx=${process.env.GOOGLE_CX}&searchType=image&key=${
            process.env.GOOGLE_API_KEY
          }&num=1`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        const imageResponse = await imageFetch.json();

        if (!imageResponse.items || imageResponse.items.length === 0) {
          throw new Error("Image not found");
        }

        replacements.push({
          asset: image.asset,
          link: imageResponse.items[0].link,
        });
      }

      return { replacements };
    }),
});
