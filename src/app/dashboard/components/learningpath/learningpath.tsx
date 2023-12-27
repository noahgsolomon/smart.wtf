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
import { Dot } from "lucide-react";

export default function LearningPath() {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center rounded-lg bg-primary/30">
        <h2 className="rounded-lg border bg-card/60 p-2">Coming soon...</h2>
      </div>
      <div className="hidden h-full rounded-lg border bg-card p-4 2xl:block">
        <Carousel className="flex h-full w-full flex-col justify-between">
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col gap-1 border-b pb-2">
                  <Image
                    src={"/machinelearning.png"}
                    className="rounded-lg border"
                    alt="machine-learning"
                    width={400}
                    height={200}
                  />
                  <h2>Machine Learning</h2>
                  <p className="text-sm opacity-80">
                    Learn the basics of machine learning
                  </p>
                </div>
                <div className="h-[390px] overflow-y-auto border-b">
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider />
                    <SectionCard />
                    <SectionCard />
                    <SectionCard />
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider />
                    <SectionCard />
                    <SectionCard />
                    <SectionCard />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex h-[50px] w-full items-center justify-between bg-card p-2">
            <CarouselPrevious />
            <div className="flex flex-row gap-2">
              <Dot className="h-5 w-5 text-primary/30 transition-all" />
              <Dot className="h-5 w-5 text-primary transition-all" />
              <Dot className="h-5 w-5 text-primary/30 transition-all" />
            </div>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className="hidden w-full rounded-lg border bg-card p-4 shadow-md md:block 2xl:hidden">
        <Carousel className="w-full">
          <CarouselContent className="flex flex-row">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-row items-center gap-8 border-b pb-2">
                  <Image
                    src={"/machinelearning.png"}
                    className="rounded-lg border"
                    alt="machine-learning"
                    width={200}
                    height={100}
                  />
                  <div>
                    <h2>Machine Learning</h2>
                    <p className="text-sm opacity-80">
                      Learn the basics of machine learning
                    </p>
                  </div>
                </div>
                <div className="flex max-h-[350px] flex-col gap-2 overflow-y-auto border-b">
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider />
                    <div className="flex max-w-full flex-row gap-2 overflow-x-auto">
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider />
                    <div className="flex max-w-full flex-row gap-2 overflow-x-auto">
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex h-[50px] w-full items-center justify-between bg-card p-2">
            <CarouselPrevious />
            <div className="flex flex-row justify-center">
              <Dot className="h-5 w-5 text-primary/30 transition-all" />
              <Dot className="h-5 w-5 text-primary transition-all" />
              <Dot className="h-5 w-5 text-primary/30 transition-all" />
            </div>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className="w-full rounded-lg border bg-card p-4 shadow-md md:hidden">
        <Carousel className="w-full">
          <CarouselContent className="flex flex-row">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center gap-8 border-b pb-2">
                  <Image
                    src={"/machinelearning.png"}
                    className="rounded-lg border"
                    alt="machine-learning"
                    width={200}
                    height={100}
                  />
                  <div>
                    <h2>Machine Learning</h2>
                    <p className="text-sm opacity-80">
                      Learn the basics of machine learning
                    </p>
                  </div>
                </div>
                <div className="flex max-h-[350px] flex-col gap-2 overflow-y-auto border-b">
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider />
                    <div className="flex max-w-full flex-row gap-2 overflow-x-auto">
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider />
                    <div className="flex max-w-full flex-row gap-2 overflow-x-auto">
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                      <SectionCard />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex h-[50px] w-full items-center justify-between bg-card p-2">
            <CarouselPrevious />
            <div className="flex flex-row justify-center">
              <Dot className="h-5 w-5 text-primary/30 transition-all" />
              <Dot className="h-5 w-5 text-primary transition-all" />
              <Dot className="h-5 w-5 text-primary/30 transition-all" />
            </div>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
