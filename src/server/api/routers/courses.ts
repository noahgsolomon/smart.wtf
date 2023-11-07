import {
  courseChapters,
  courseLikes,
  courses,
  subSections,
} from "@/server/db/schemas/courses/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { userCompletedBlocks } from "@/server/db/schemas/users/schema";

export const courseRouter = createTRPCRouter({
  getChapterProgress: protectedProcedure
    .input(
      z.object({
        courseId: z.number(),
        chapter: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const chapter = await ctx.db.query.courseChapters.findFirst({
        where: and(
          eq(courseChapters.courseId, input.courseId),
          eq(courseChapters.order, input.chapter),
        ),
        columns: { id: true },
        with: {
          courseChapterSections: {
            columns: { id: true },
            with: {
              subSections: {
                columns: { id: true },
                with: {
                  blocks: {
                    columns: { id: true },
                    with: {
                      userCompletedBlocks: {
                        columns: { id: true },
                        where: eq(userCompletedBlocks.userId, ctx.user_id),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!chapter) {
        return { status: "ERROR", data: [] };
      }

      // Assuming sectionsPercentagesCompleted is already declared.
      const sectionsPercentagesCompleted = [];

      for (const section of chapter.courseChapterSections ?? []) {
        const subSectionsPercentagesCompleted = [];
        for (const subSection of section.subSections ?? []) {
          let completedBlockCount = 0;
          for (const block of subSection.blocks ?? []) {
            if (block.userCompletedBlocks.length !== 0) {
              completedBlockCount++;
            }
          }
          // Guard against division by zero if there are no blocks.
          const totalBlocks = subSection.blocks.length || 1;
          const percentageCompleted =
            totalBlocks > 0 ? (completedBlockCount / totalBlocks) * 100 : 0;

          subSectionsPercentagesCompleted.push({
            subSectionId: subSection.id,
            percentageCompleted: percentageCompleted,
          });
        }

        // Calculate the average completion percentage for the section.
        const averagePercentageCompleted =
          subSectionsPercentagesCompleted.reduce(
            (acc, curr) => acc + curr.percentageCompleted,
            0,
          ) / (subSectionsPercentagesCompleted.length || 1); // Guard against division by zero if there are no subsections.

        sectionsPercentagesCompleted.push({
          sectionId: section.id,
          percentageCompleted: averagePercentageCompleted,
        });
      }

      // Do something with sectionsPercentagesCompleted, like returning it or logging it.

      return { status: "OK", data: sectionsPercentagesCompleted };
    }),
  isCourseStarted: protectedProcedure
    .input(
      z.object({
        courseId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const course = await ctx.db.query.courses.findFirst({
        where: eq(courses.id, input.courseId),
        columns: { id: true },
        with: {
          courseChapters: {
            columns: { id: true },
            where: eq(courseChapters.order, 1),
            with: {
              courseChapterSections: {
                columns: { id: true },
                where: eq(subSections.order, 1),
                with: {
                  subSections: {
                    columns: { id: true },
                    with: {
                      blocks: {
                        columns: { id: true },
                        with: {
                          userCompletedBlocks: {
                            columns: { id: true },
                            where: eq(userCompletedBlocks.userId, ctx.user_id),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      for (const section of course?.courseChapters[0]?.courseChapterSections ??
        []) {
        for (const block of section?.subSections[0]?.blocks ?? []) {
          if (block.userCompletedBlocks.length !== 0) {
            return { isCourseStarted: true };
          }
        }
      }

      return { isCourseStarted: false };
    }),
  getCourses: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.query.courses.findMany({
      with: {
        instructor: {
          columns: {
            name: true,
          },
        },
        courseLikes: {
          where: eq(courseLikes.userId, ctx.user_id),
          columns: {
            courseId: true,
          },
        },
      },
    });

    // for each course, check whether the current user has liked it or not. this is in the course_likes table,
    // and it exists if the there is a row with the course_id and the user_id, and join this in the courses return

    return { courses: courses };
  }),

  getCourseBySlug: protectedProcedure
    .input(z.object({ slug: z.string(), chapter: z.number() }))
    .query(async ({ ctx, input }) => {
      const course = await ctx.db.query.courses.findFirst({
        where: eq(courses.slug, input.slug),
        with: {
          courseChapters: {
            where: eq(courseChapters.order, input.chapter),
            with: {
              courseChapterSections: {
                columns: {
                  id: true,
                  implemented: true,
                  name: true,
                  description: true,
                  imageUrl: true,
                  order: true,
                },
              },
            },
          },
        },
      });

      if (!course) {
        return { course: null };
      }

      return { course: course };
    }),

  getCourseSection: protectedProcedure
    .input(z.object({ sectionId: z.number() }))
    .query(async ({ ctx, input }) => {
      console.log(`Fetching section with ID: ${input.sectionId}`); // Log the input

      try {
        const section = await ctx.db.query.subSections.findMany({
          where: eq(subSections.sectionId, input.sectionId),
          with: {
            blocks: {
              with: {
                interactiveComponents: {
                  columns: {
                    type: true,
                  },
                  with: { quizzes: true, questions: true },
                },
                userCompletedBlocks: {
                  where: eq(userCompletedBlocks.userId, ctx.user_id),
                  columns: {
                    blockId: true,
                  },
                },
              },
            },
          },
        });

        if (!section) {
          console.log(`No section found for ID: ${input.sectionId}`); // Log when no section is found
          return { section: null };
        }

        console.log(`Section found: ${JSON.stringify(section, null, 2)}`); // Log the found section
        return { section: section };
      } catch (error) {
        console.error(
          `Error fetching section with ID: ${input.sectionId}`,
          error,
        ); // Log any errors
        throw error; // Rethrow the error to handle it according to your error handling policy
      }
    }),

  setSubsectionCompleted: protectedProcedure
    .input(z.object({ sectionId: z.number(), order: z.number() }))
    .mutation(async ({ ctx, input }) => {
      console.log(
        `[${new Date().toISOString()}] - Start setSubsectionCompleted mutation`,
      );
      console.log(`[${new Date().toISOString()}] - Input received: `, input);

      try {
        console.log(
          `[${new Date().toISOString()}] - Querying subsection with sectionId: ${
            input.sectionId
          } and order: ${input.order}`,
        );
        const subsection = await ctx.db.query.subSections.findFirst({
          where: and(
            eq(subSections.sectionId, input.sectionId),
            eq(subSections.order, input.order),
          ),
          columns: { id: true },
          with: {
            blocks: {
              columns: { id: true },
              with: {
                userCompletedBlocks: {
                  columns: { id: true },
                  where: eq(userCompletedBlocks.userId, ctx.user_id),
                },
              },
            },
          },
        });

        console.log(
          `[${new Date().toISOString()}] - Subsection query result: `,
          subsection,
        );

        if (!subsection) {
          console.log(`[${new Date().toISOString()}] - No subsection found`);
          return { status: "ERROR" };
        }

        for (const block of subsection.blocks) {
          console.log(
            `[${new Date().toISOString()}] - Processing block with ID: ${
              block.id
            }`,
          );
          if (block.userCompletedBlocks.length !== 0) {
            console.log(
              `[${new Date().toISOString()}] - Block ID: ${
                block.id
              } already completed by user ID: ${ctx.user_id}`,
            );
            continue;
          }
          console.log(
            `[${new Date().toISOString()}] - Marking block ID: ${
              block.id
            } as completed for user ID: ${ctx.user_id}`,
          );
          await ctx.db.insert(userCompletedBlocks).values({
            userId: ctx.user_id,
            blockId: block.id,
          });
          console.log(
            `[${new Date().toISOString()}] - Block ID: ${
              block.id
            } marked as completed`,
          );
        }

        console.log(
          `[${new Date().toISOString()}] - Completed processing all blocks for subsection ID: ${
            input.sectionId
          }`,
        );
        return { status: "OK" };
      } catch (error) {
        console.error(
          `[${new Date().toISOString()}] - Error in setSubsectionCompleted mutation: `,
          error,
        );
        return { status: "ERROR", error: error };
      }
    }),

  setBlockCompleted: protectedProcedure
    .input(z.object({ blockId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(userCompletedBlocks).values({
        userId: ctx.user_id,
        blockId: input.blockId,
      });
    }),

  addLike: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const like = await ctx.db.query.courseLikes.findFirst({
        where: and(
          eq(courseLikes.courseId, input.courseId),
          eq(courseLikes.userId, ctx.user_id),
        ),
      });

      if (like) {
        await ctx.db.delete(courseLikes).where(eq(courseLikes.id, like.id));
      } else {
        await ctx.db.insert(courseLikes).values({
          courseId: input.courseId,
          userId: ctx.user_id,
        });
      }
    }),
});
