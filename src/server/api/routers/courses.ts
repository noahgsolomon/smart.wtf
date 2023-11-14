import {
  blocks,
  courseChapterSections,
  courseChapters,
  courseLikes,
  courseProgress,
  courses,
  latestActivity,
  subSections,
} from "@/server/db/schemas/courses/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { userCompletedBlocks } from "@/server/db/schemas/users/schema";
import { db } from "@/server/db";

export const courseRouter = createTRPCRouter({
  //getting progress for each section in chapter
  getChapterProgress: protectedProcedure
    .input(
      z.object({
        courseId: z.number(),
        chapter: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // Get the chapter that the user is trying to get the progress of.
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

      const sectionsPercentagesCompleted = [];

      // Calculate the completion percentage for each section.
      for (const section of chapter.courseChapterSections ?? []) {
        const subSectionsPercentagesCompleted = [];

        // Calculate the completion percentage for each subsection.
        for (const subSection of section.subSections ?? []) {
          let completedBlockCount = 0;
          // Count the number of blocks that the user has completed.
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
      // Get the course that the user is trying to get the progress of.
      const course = await ctx.db.query.courseProgress.findFirst({
        where: and(
          eq(courseProgress.userId, ctx.user_id),
          eq(courseProgress.courseId, input.courseId),
        ),
        columns: { id: true },
      });
      return { isCourseStarted: !!course };
    }),

  // Get the course that the user is trying to get the progress of.
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
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      // Get the course based on the slug.
      const course = await ctx.db.query.courses.findFirst({
        where: eq(courses.slug, input.slug),
        with: {
          courseChapters: {
            orderBy: (courseChapters, { asc }) => [asc(courseChapters.order)],
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
      try {
        const section = await ctx.db.query.subSections.findMany({
          where: eq(subSections.sectionId, input.sectionId),
          with: {
            courseChapterSections: {
              columns: { id: true },
              with: {
                course: { columns: { id: true } },
              },
            },
            blocks: {
              with: {
                interactiveComponents: {
                  columns: {
                    type: true,
                  },
                  with: { quizzes: true, understanding: true },
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
          return { section: null };
        }

        return { section: section };
      } catch (error) {
        console.error(
          `Error fetching section with ID: ${input.sectionId}`,
          error,
        ); // Log any errors
        throw error; // Rethrow the error to handle it according to your error handling policy
      }
    }),

  getNextSection: protectedProcedure
    .input(z.object({ sectionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const currentSection = await ctx.db.query.courseChapterSections.findFirst(
        {
          where: eq(courseChapterSections.id, input.sectionId),
          columns: {
            id: true,
            order: true,
            chapterId: true,
            description: true,
            name: true,
            imageUrl: true,
            implemented: true,
          },
        },
      );

      if (!currentSection) {
        return { nextSection: null };
      }

      const nextSection = await ctx.db.query.courseChapterSections.findFirst({
        where: and(
          eq(courseChapterSections.chapterId, currentSection.chapterId),
          eq(courseChapterSections.order, currentSection.order + 1),
        ),
        columns: {
          id: true,
          order: true,
          chapterId: true,
          description: true,
          name: true,
          imageUrl: true,
          implemented: true,
        },
      });

      if (!nextSection) {
        const nextChapterSection =
          await ctx.db.query.courseChapterSections.findFirst({
            where: and(
              eq(courseChapterSections.chapterId, currentSection.chapterId + 1),
              eq(courseChapterSections.order, 1),
            ),
            columns: {
              id: true,
              order: true,
              chapterId: true,
              description: true,
              name: true,
              imageUrl: true,
              implemented: true,
            },
          });

        if (!nextChapterSection) {
          return { nextSection: null };
        }

        return { nextSection: nextChapterSection };
      }

      return { nextSection: nextSection };
    }),

  setSubsectionCompleted: protectedProcedure
    .input(
      z.object({
        sectionId: z.number(),
        order: z.number(),
        finish: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Get the subsection that the user is trying to mark as completed.
        const subsection = await ctx.db.query.subSections.findFirst({
          where: and(
            eq(subSections.sectionId, input.sectionId),
            eq(subSections.order, input.order),
          ),
          columns: { id: true },
          with: {
            courseChapterSections: {
              with: {
                course: { columns: { id: true } },
              },
            },
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

        // If the subsection doesn't exist, return an error.
        if (!subsection) {
          return { status: "ERROR" };
        }

        for (const block of subsection.blocks) {
          // If the user has already completed this block, skip it.
          if (block.userCompletedBlocks.length !== 0) {
            continue;
          }
          // Otherwise, mark the block as completed.
          await ctx.db.insert(userCompletedBlocks).values({
            userId: ctx.user_id,
            blockId: block.id,
          });
        }
        return { status: "OK" };
      } catch (error) {
        return { status: "ERROR", error: error };
      }
    }),

  getLatestActivity: protectedProcedure.query(async ({ ctx }) => {
    const latestActivityVal = await ctx.db.query.latestActivity.findFirst({
      where: eq(latestActivity.userId, ctx.user_id),
      with: {
        subSections: { columns: { id: true, order: true } },
        courseChapterSections: {
          columns: { imageUrl: true, name: true, lessonNumber: true },
          with: {
            courseChapters: { columns: { id: true, order: true } },
            subSections: {
              columns: { id: true },
              with: {
                blocks: {
                  columns: { id: true },
                  with: {
                    userCompletedBlocks: { columns: { id: true } },
                  },
                },
              },
            },
            course: {
              columns: {
                slug: true,
                name: true,
                lessons: true,
              },
            },
          },
        },
      },
    });

    const subSectionsPercentagesCompleted = [];
    for (const subSection of latestActivityVal?.courseChapterSections
      .subSections ?? []) {
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

    const averagePercentageCompleted =
      subSectionsPercentagesCompleted.reduce(
        (acc, curr) => acc + curr.percentageCompleted,
        0,
      ) / (subSectionsPercentagesCompleted.length || 1);

    return {
      latest: {
        ...latestActivityVal,
        percentageCompleted: averagePercentageCompleted,
      },
    };
  }),

  setBlockCompleted: protectedProcedure
    .input(
      z.object({
        blockId: z.number(),
        courseId: z.number(),
        blockOrder: z.number(),
        sectionId: z.number(),
        subSectionOrder: z.number(),
        subSectionId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("hit");
      console.log(JSON.stringify(input, null, 2));
      await ctx.db.insert(userCompletedBlocks).values({
        userId: ctx.user_id,
        blockId: input.blockId,
      });
      const starting = await ctx.db.query.courseProgress.findFirst({
        where: and(
          eq(courseProgress.userId, ctx.user_id),
          eq(courseProgress.courseId, input.courseId),
        ),
      });
      if (!starting) {
        await ctx.db.insert(courseProgress).values({
          userId: ctx.user_id,
          courseId: input.courseId,
          progress: "STARTED",
          startedAt: new Date(),
        });
      }

      const nextBlock = await ctx.db.query.blocks.findFirst({
        where: and(
          eq(blocks.subSectionId, input.subSectionId),
          eq(blocks.order, input.blockOrder + 1),
        ),
        columns: { id: true },
      });
      console.log(nextBlock);
      if (nextBlock) {
        await ctx.db
          .delete(latestActivity)
          .where(eq(latestActivity.userId, ctx.user_id));

        await ctx.db.insert(latestActivity).values({
          userId: ctx.user_id!,
          courseId: input.courseId,
          sectionId: input.sectionId,
          subSectionId: input.subSectionId,
          blockId: nextBlock.id,
        });
        return { status: "OK" };
      } else {
        const nextSubsection = await ctx.db.query.subSections.findFirst({
          where: and(
            eq(subSections.sectionId, input.sectionId),
            eq(subSections.order, input.subSectionOrder + 1),
          ),
          columns: { id: true },
          with: {
            blocks: {
              columns: { id: true },
            },
          },
        });
        if (nextSubsection) {
          console.log("next subsection");
          await ctx.db
            .delete(latestActivity)
            .where(eq(latestActivity.userId, ctx.user_id));

          await ctx.db.insert(latestActivity).values({
            userId: ctx.user_id!,
            courseId: input.courseId,
            sectionId: input.sectionId,
            subSectionId: nextSubsection.id,
            blockId: nextSubsection.blocks[0]?.id ?? 0,
          });
        } else {
        }
      }
      // // If the user has finished the section, mark the next section as the latest activity.
      // if (input.finish === true) {
      //   const nextSection = await ctx.db.query.courseChapterSections.findFirst({
      //     where: and(
      //       eq(
      //         courseChapterSections.chapterId,
      //         subsection.courseChapterSections.chapterId,
      //       ),
      //       eq(
      //         courseChapterSections.order,
      //         subsection.courseChapterSections.order + 1,
      //       ),
      //     ),
      //     with: {
      //       subSections: {
      //         columns: { id: true },
      //         with: {
      //           blocks: true,
      //         },
      //       },
      //     },
      //   });

      //   // If there is no next section, mark the next chapter as the latest activity.
      //   if (!nextSection) {
      //     const nextChapterSection =
      //       await ctx.db.query.courseChapterSections.findFirst({
      //         where: eq(
      //           courseChapterSections.order,
      //           subsection.courseChapterSections.order + 1,
      //         ),
      //         columns: {
      //           id: true,
      //         },
      //         with: {
      //           course: { columns: { id: true } },
      //           subSections: {
      //             columns: { id: true },
      //             with: {
      //               blocks: true,
      //             },
      //           },
      //         },
      //       });
      //     if (!nextChapterSection) {
      //       return { status: "OK" };
      //     }

      //     await ctx.db
      //       .delete(latestActivity)
      //       .where(eq(latestActivity.userId, ctx.user_id));
      //     await ctx.db.insert(latestActivity).values({
      //       userId: ctx.user_id!,
      //       courseId: nextChapterSection.course?.id!,
      //       sectionId: nextChapterSection.id!,
      //       subSectionId: nextChapterSection.subSections[0]?.id!,
      //       blockId: nextChapterSection.subSections[0]?.blocks[0]?.id!,
      //     });
      //   } else {
      //     // If there is a next section, mark it as the latest activity.
      //     await ctx.db
      //       .delete(latestActivity)
      //       .where(eq(latestActivity.userId, ctx.user_id));
      //     await ctx.db.insert(latestActivity).values({
      //       userId: ctx.user_id!,
      //       courseId: subsection.courseChapterSections.course?.id!,
      //       sectionId: nextSection?.id!,
      //       subSectionId: nextSection?.subSections[0]?.id!,
      //       blockId: nextSection?.subSections[0]?.blocks[0]?.id!,
      //     });
      //   }
      //   // If the user has not finished the section, mark the next subsection as the latest activity.
      // } else {
      //   const nextSubsection = await ctx.db.query.subSections.findFirst({
      //     where: and(
      //       eq(subSections.sectionId, input.sectionId),
      //       eq(subSections.order, input.order + 1),
      //     ),
      //     columns: { id: true },
      //     with: {
      //       courseChapterSections: {
      //         with: { course: { columns: { id: true } } },
      //         columns: { id: true },
      //       },
      //       blocks: {
      //         columns: { id: true },
      //         with: {
      //           userCompletedBlocks: {
      //             columns: { id: true },
      //             where: eq(userCompletedBlocks.userId, ctx.user_id),
      //           },
      //         },
      //       },
      //     },
      //   });
      //   if (!nextSubsection) {
      //     return { status: "OK" };
      //   }
      //   await ctx.db
      //     .delete(latestActivity)
      //     .where(eq(latestActivity.userId, ctx.user_id));
      //   await ctx.db.insert(latestActivity).values({
      //     userId: ctx.user_id!,
      //     courseId: nextSubsection.courseChapterSections.course?.id!,
      //     sectionId: subsection.courseChapterSections.id!,
      //     subSectionId: nextSubsection?.id!,
      //     blockId: nextSubsection?.blocks[0]?.id!,
      //   });
      // }
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
