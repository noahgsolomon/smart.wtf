"use client";
import { Card, CardContent } from "@/components/ui/card";
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
    <>
      <div className="hidden h-full bg-card p-4 xl:block">
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col gap-1 border-b pb-2">
                  <Image
                    src={"/machinelearning.png"}
                    className="rounded-lg border"
                    alt="machine-learning"
                    width={500}
                    height={300}
                  />
                  <h2>Machine Learning</h2>
                  <p className="text-sm opacity-80">
                    Learn the basics of machine learning
                  </p>
                </div>
                <div className="flex flex-col gap-2 py-4">
                  <ChapterDivider />
                  <SectionCard />
                  <SectionCard />
                  <SectionCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex w-full flex-row justify-center">
          <Dot className="h-5 w-5 text-primary/30 transition-all" />
          <Dot className="h-5 w-5 text-primary transition-all" />
          <Dot className="h-5 w-5 text-primary/30 transition-all" />
        </div>
      </div>
      <div className="hidden w-full bg-card p-4 md:block xl:hidden">
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
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
        <div className="flex w-full flex-row justify-center">
          <Dot className="h-5 w-5 text-primary/30 transition-all" />
          <Dot className="h-5 w-5 text-primary transition-all" />
          <Dot className="h-5 w-5 text-primary/30 transition-all" />
        </div>
      </div>
      <div className="w-full border-t bg-card p-4 md:hidden">
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
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
        <div className="flex w-full flex-row justify-center">
          <Dot className="h-5 w-5 text-primary/30 transition-all" />
          <Dot className="h-5 w-5 text-primary transition-all" />
          <Dot className="h-5 w-5 text-primary/30 transition-all" />
        </div>
      </div>
    </>
  );
}
