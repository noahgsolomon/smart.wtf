import { courseLikes, courses } from "@/server/db/schemas/courses/schema";
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
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await ctx.db.query.courses.findFirst({
        where: eq(courses.slug, input.slug),
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

      return { course: course };
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