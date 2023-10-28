import { api } from "@/trpc/server";
import { ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fastSnail from "public/fastsnail.png";
import paint from "public/paint.png";
import garden from "public/garden.png";
import ProgressSpinner from "@/components/progressspinner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lighthouse from "public/lighthouse.png";

export default async function CourseOverview({
  params,
}: {
  params: { slug: string };
}) {
  const course = (await api.course.getCourseBySlug.query({ slug: params.slug }))
    .course;
  console.log(JSON.stringify(course, null, 2));

  return (
    <div className="flex flex-col items-center justify-center gap-16 px-10 pb-8">
      {/* <h1>{course?.name}</h1>
      <p>{course?.description}</p>
      <p>{course?.slug}</p> */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 text-center text-3xl">
          <p>Chapter 1:</p>
          <h1>Introduction to Web Performance and Optimization</h1>
        </div>
        <Link
          href={""}
          className="relative cursor-pointer rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:w-[800px]"
        >
          <div className=" flex flex-col justify-between sm:flex-row">
            <div className="flex flex-col justify-between p-4">
              <div className="gap- flex flex-col ">
                <h3 className="text-base lg:text-lg">
                  Unlock the Power of Web Performance
                </h3>
                <p className="max-w-[40ch] text-xs opacity-60 lg:text-sm">
                  why performance matters for user experience, SEO, and business
                  metrics.
                </p>
              </div>
              <ProgressSpinner progress={20} />
            </div>

            <div>
              <Image
                className="rounded-b-lg border-t border-t-border sm:w-[250px] sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-t-0 sm:border-border lg:w-[350px]"
                width={350}
                height={200}
                src={fastSnail}
                alt={"squidward"}
              />
            </div>
          </div>
        </Link>
        <Link
          href={""}
          className="relative cursor-pointer rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:w-[800px]"
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-black/30 dark:bg-black/50">
            <Lock className="h-4 w-4" />
          </div>
          <div className=" flex flex-col justify-between sm:flex-row">
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-base lg:text-lg">
                Understanding Website Speed Metrics
              </h3>
              <p className="max-w-[40ch] text-xs lg:text-sm">
                Introduction to key performance metrics such as First Contentful
                Paint (FCP), Time to Interactive (TTI), Largest Contentful Paint
                (LCP), and Cumulative Layout Shift (CLS).
              </p>
            </div>
            <div>
              <Image
                className="rounded-b-lg border-t border-t-border sm:w-[250px] sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-t-0 sm:border-border lg:w-[350px]"
                width={350}
                height={200}
                src={paint}
                alt={"squidward"}
              />
            </div>
          </div>
        </Link>
        <Link
          href={""}
          className="relative cursor-pointer rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:w-[800px]"
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-black/30 dark:bg-black/50">
            <Lock className="h-4 w-4" />
          </div>
          <div className=" flex flex-col justify-between sm:flex-row">
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-base lg:text-lg">
                Basic Principles of Web Optimization
              </h3>
              <p className="max-w-[40ch] text-xs lg:text-sm">
                Overview of the main areas of optimization: assets, code,
                server, and delivery. Introduction to the concept of
                "Performance Budgets."
              </p>
            </div>
            <div>
              <Image
                className="rounded-b-lg border-t border-t-border sm:w-[250px] sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-t-0 sm:border-border lg:w-[350px]"
                width={350}
                height={200}
                src={garden}
                alt={"squidward"}
              />
            </div>
          </div>
        </Link>
        <Link
          href={""}
          className="relative cursor-pointer rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:w-[800px]"
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-black/30 dark:bg-black/50">
            <Lock className="h-4 w-4" />
          </div>
          <div className=" flex flex-col justify-between sm:flex-row">
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-base lg:text-lg">
                Tools for Performance Measurement
              </h3>
              <p className="max-w-[40ch] text-xs lg:text-sm">
                Introduction to tools like Google Lighthouse, WebPageTest,
                Chrome DevTools, and more. Hands-on guide to running a basic
                performance audit
              </p>
            </div>
            <div>
              <Image
                className="rounded-b-lg border-t border-t-border sm:w-[250px] sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-t-0 sm:border-border lg:w-[350px]"
                width={350}
                height={200}
                src={lighthouse}
                alt={"squidward"}
              />
            </div>
          </div>
        </Link>
        <div className="flex flex-row justify-center gap-2">
          <Link
            className={cn(
              buttonVariants(),
              "flex flex-row gap-1 transition-all hover:gap-2",
            )}
            href={"?chapter=2"}
          >
            Chapter 2 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
