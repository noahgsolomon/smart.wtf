"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import SectionCard from "./sectioncard";
import ChapterDivider from "./chapterdivider";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

type learningPath = {
  title: string;
  description: string;
  imageUrl: string;
  progress: number;
  chapters: {
    title: string;
    sections: {
      title: string;
      imageUrl: string;
    }[];
  }[];
}[];

const learningPaths: learningPath = [
  {
    title: "Game Development",
    description: "Get your foot in the door with Game Development",
    imageUrl: "https://images.smart.wtf/gamedev.png",
    progress: 0,
    chapters: [
      {
        title: "Game Design Fundamentals",
        sections: [
          {
            title: "Understanding Game Genres and Player Experiences",
            imageUrl: "https://images.smart.wtf/gamedev-1-1.png",
          },
          {
            title: "Principles of Game Mechanics and Dynamics",
            imageUrl: "https://images.smart.wtf/gamedev-1-2.png",
          },
          {
            title: "Creating Engaging Game Worlds and Storylines",
            imageUrl: "https://images.smart.wtf/gamedev-1-3.png",
          },
        ],
      },
      {
        title: "Game Development Tools and Techniques",
        sections: [
          {
            title: "Introduction to Game Engines and Development Environments",
            imageUrl: "https://images.smart.wtf/gamedev-2-1.png",
          },
          {
            title: "2D and 3D Graphics Programming",
            imageUrl: "https://images.smart.wtf/gamedev-2-2.png",
          },
          {
            title: "Building Interactive Gameplay Systems",
            imageUrl: "https://images.smart.wtf/gamedev-2-3.png",
          },
        ],
      },
      {
        title: "Advanced Game Development Concepts",
        sections: [
          {
            title: "Artificial Intelligence in Games",
            imageUrl: "https://images.smart.wtf/gamedev-3-1.png",
          },
          {
            title: "Network Programming for Multiplayer Games",
            imageUrl: "https://images.smart.wtf/gamedev-3-2.png",
          },
          {
            title: "Optimizing Game Performance and Memory Management",
            imageUrl: "https://images.smart.wtf/gamedev-3-3.png",
          },
        ],
      },
      {
        title: "Publishing and Post-Development",
        sections: [
          {
            title: "Testing and Debugging Game Applications",
            imageUrl: "https://images.smart.wtf/gamedev-4-1.png",
          },
          {
            title: "Marketing Strategies for Indie Game Developers",
            imageUrl: "https://images.smart.wtf/gamedev-4-2.png",
          },
          {
            title: "Post-Launch Support and Community Building",
            imageUrl: "https://images.smart.wtf/gamedev-4-3.png",
          },
        ],
      },
    ],
  },
  {
    title: "Intro to Machine Learning",
    description: "Learn the basics of machine learning",
    imageUrl: "https://images.smart.wtf/machinelearning.png",
    progress: 45,
    chapters: [
      {
        title: "Foundations  of Machine Learning",
        sections: [
          {
            title: "Introduction to Machine Learning Concepts",
            imageUrl: "https://images.smart.wtf/ml-1-1.png",
          },
          {
            title: "Data Preprocessing Essentials",
            imageUrl: "https://images.smart.wtf/ml-1-2.png",
          },
          {
            title: "Supervised vs Unsupervised Learning",
            imageUrl: "https://images.smart.wtf/ml-1-3.png",
          },
        ],
      },
      {
        title: "Supervised Learning Algorithms",
        sections: [
          {
            title: "Linear Regression Techniques",
            imageUrl: "https://images.smart.wtf/ml-2-1.png",
          },
          {
            title: "Classification with Logistic Regression",
            imageUrl: "https://images.smart.wtf/ml-2-2.png",
          },
          {
            title: "Decision Trees and Random Forests",
            imageUrl: "https://images.smart.wtf/ml-2-3.png",
          },
        ],
      },
      {
        title: "Unsupervised Learning",
        sections: [
          {
            title: "Clustering with K-Means",
            imageUrl: "https://images.smart.wtf/ml-3-1.png",
          },
          {
            title: "Dimensionality Reduction with PCA",
            imageUrl: "https://images.smart.wtf/ml-3-2.png",
          },
          {
            title: "Neural Networks and Deep Learning Basics",
            imageUrl: "https://images.smart.wtf/ml-3-3.png",
          },
        ],
      },
    ],
  },
];

export default function LearningPath() {
  return (
    <div className="relative">
      <Badge
        className="absolute -right-2 -top-2 z-10 p-1 text-sm md:-right-6"
        variant={"history"}
      >
        Coming Soon
      </Badge>
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center rounded-lg bg-primary/30"></div> */}
      <div className="hidden rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 2xl:flex">
        <Carousel className="flex h-full w-full flex-col justify-between">
          <CarouselContent className="h-[690px]">
            {learningPaths.map(
              ({ chapters, description, title, imageUrl, progress }, index) => (
                <CarouselItem key={index}>
                  <div className="flex w-full flex-col gap-1 border-b pb-2">
                    <div className="relative flex h-[200px] w-full items-center justify-center rounded-lg border bg-secondary px-2">
                      <Image
                        src={imageUrl}
                        alt={title}
                        className=" rounded-lg border"
                        width={315}
                        height={180}
                      />
                    </div>

                    <h2>{title}</h2>
                    <p className="text-sm opacity-80">{description}</p>
                    {progress > 0 && (
                      <Progress
                        className="h-4 border-2 border-border"
                        indicatorClassName="bg-blue/80 rounded-r-lg"
                        value={progress}
                      />
                    )}
                    <Link
                      href="/signup"
                      className={buttonVariants({
                        className: "flex items-center gap-1",
                      })}
                    >
                      {progress === 0 ? "Begin" : "Continue"}
                    </Link>
                  </div>
                  <div className=" flex h-full flex-col overflow-y-auto border-b pb-[320px]">
                    {chapters.map((chapter, index) => (
                      <div key={index} className="flex flex-col gap-2 py-4">
                        <ChapterDivider
                          key={index}
                          chapter={index + 1}
                          title={chapter.title}
                          imageUrl=""
                        />
                        {chapter.sections.map((section, index) => (
                          <SectionCard
                            link="/signup"
                            key={index}
                            name={section.title}
                            imageUrl={section.imageUrl}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="pb-[200px]"></div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <div className="flex h-[50px] w-full items-center justify-between border-t p-2 ">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className="hidden w-full rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:block 2xl:hidden">
        <Carousel className="w-full">
          <CarouselContent className="flex flex-row">
            {learningPaths.map(
              ({ chapters, description, title, imageUrl }, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-row items-center gap-8 border-b pb-2">
                    <Image
                      src={imageUrl}
                      className="rounded-lg border"
                      alt={title}
                      width={210}
                      height={120}
                    />
                    <div>
                      <h2>{title}</h2>
                      <p className="text-sm opacity-80">{description}</p>
                    </div>
                  </div>
                  <div className=" flex max-h-[600px] min-h-[350px] flex-col gap-2 overflow-y-auto">
                    {chapters.map((chapter, index) => (
                      <div key={index} className="flex flex-col gap-2 py-4">
                        <ChapterDivider
                          chapter={index + 1}
                          title={chapter.title}
                          imageUrl=""
                        />
                        <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
                          {chapter.sections.map((section, index) => (
                            <SectionCard
                              link="/signup"
                              key={index}
                              name={section.title}
                              imageUrl={section.imageUrl}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <div className="flex min-h-[50px] w-full items-center justify-between border-t p-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className="w-full rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:hidden">
        <Carousel className="w-full">
          <CarouselContent className="flex flex-row">
            {learningPaths.map(
              ({ chapters, description, title, imageUrl }, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center gap-8 border-b pb-2">
                    <Image
                      src={imageUrl}
                      className="rounded-lg border"
                      alt={title}
                      width={210}
                      height={120}
                    />
                    <div>
                      <h2>{title}</h2>
                      <p className="text-sm opacity-80">{description}</p>
                    </div>
                  </div>
                  <div className=" flex max-h-[600px] min-h-[350px] flex-col gap-2 overflow-y-auto border-b">
                    {chapters.map((chapter, index) => (
                      <div className="flex flex-col gap-2 py-4" key={index}>
                        <ChapterDivider
                          chapter={index + 1}
                          title={chapter.title}
                          imageUrl=""
                        />
                        <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
                          {chapter.sections.map((section, index) => (
                            <SectionCard
                              link="/signup"
                              key={index}
                              name={section.title}
                              imageUrl={section.imageUrl}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <div className="flex min-h-[50px] w-full items-center justify-between p-2 ">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
