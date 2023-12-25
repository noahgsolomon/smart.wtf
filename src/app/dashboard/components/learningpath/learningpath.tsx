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
    <div className="h-full p-4">
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
              <Carousel
                opts={{
                  align: "start",
                }}
                orientation="vertical"
                className="z-30 mb-16 mt-16 w-full"
              >
                <CarouselContent className="max-h-[250px]">
                  <CarouselItem key={index}>
                    <ChapterDivider />
                  </CarouselItem>
                  <CarouselItem key={index}>
                    <SectionCard />
                  </CarouselItem>
                  <CarouselItem key={index}>
                    <SectionCard />
                  </CarouselItem>
                  <CarouselItem key={index}>
                    <SectionCard />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
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
  );
}
