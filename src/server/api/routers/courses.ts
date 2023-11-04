import {
  courseChapters,
  courseLikes,
  courses,
  subSections,
} from "@/server/db/schemas/courses/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const courseRouter = createTRPCRouter({
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
            },
          },
        },
      });

      if (!section) {
        return { section: null };
      }

      return { section: section };
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
