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
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col gap-1 border-b pb-2">
                  <Image
                    src={"https://images.smart.wtf/machinelearning.png"}
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
                <div className="flex h-[390px] flex-col overflow-y-auto border-b">
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={1}
                      title={"Foundations  of Machine Learning"}
                      imageUrl={""}
                    />
                    <SectionCard
                      name={"Introduction to Machine Learning Concepts"}
                      imageUrl={"https://images.smart.wtf/ml-1-1.png"}
                    />
                    <SectionCard
                      name={'"Data Preprocessing Essentials'}
                      imageUrl={"https://images.smart.wtf/ml-1-2.png"}
                    />
                    <SectionCard
                      name={"Supervised vs Unsupervised Learning"}
                      imageUrl={"https://images.smart.wtf/ml-1-3.png"}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={2}
                      title={"Supervised Learning Algorithms"}
                      imageUrl={""}
                    />
                    <SectionCard
                      name={"Linear Regression Techniques"}
                      imageUrl={"https://images.smart.wtf/ml-2-1.png"}
                    />
                    <SectionCard
                      name={"Classification with Logistic Regression"}
                      imageUrl={"https://images.smart.wtf/ml-2-2.png"}
                    />
                    <SectionCard
                      name={"Decision Trees and Random Forests"}
                      imageUrl={"https://images.smart.wtf/ml-2-3.png"}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={3}
                      title={"Unsupervised Learning"}
                      imageUrl={""}
                    />
                    <SectionCard
                      name={"Clustering with K-Means"}
                      imageUrl={"https://images.smart.wtf/ml-3-1.png"}
                    />
                    <SectionCard
                      name={"Dimensionality Reduction with PCA"}
                      imageUrl={"https://images.smart.wtf/ml-3-2.png"}
                    />
                    <SectionCard
                      name={"Neural Networks and Deep Learning Basics"}
                      imageUrl={"https://images.smart.wtf/ml-3-3.png"}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex min-h-[50px] w-full items-center justify-between  p-2 ">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className="hidden w-full rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:block 2xl:hidden">
        <Carousel className="w-full">
          <CarouselContent className="flex flex-row">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-row items-center gap-8 border-b pb-2">
                  <Image
                    src={"https://images.smart.wtf/machinelearning.png"}
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
                <div className="hide-scrollbar flex max-h-[600px] min-h-[350px] flex-col gap-2 overflow-y-auto border-b">
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={1}
                      title={"Foundations  of Machine Learning"}
                      imageUrl={""}
                    />
                    <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
                      <SectionCard
                        name={"Introduction to Machine Learning Concepts"}
                        imageUrl={"https://images.smart.wtf/ml-1-1.png"}
                      />
                      <SectionCard
                        name={'"Data Preprocessing Essentials'}
                        imageUrl={"https://images.smart.wtf/ml-1-2.png"}
                      />
                      <SectionCard
                        name={"Supervised vs Unsupervised Learning"}
                        imageUrl={"https://images.smart.wtf/ml-1-3.png"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={2}
                      title={"Supervised Learning Algorithms"}
                      imageUrl={""}
                    />

                    <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
                      <SectionCard
                        name={"Linear Regression Techniques"}
                        imageUrl={"https://images.smart.wtf/ml-2-1.png"}
                      />
                      <SectionCard
                        name={"Classification with Logistic Regression"}
                        imageUrl={"https://images.smart.wtf/ml-2-2.png"}
                      />
                      <SectionCard
                        name={"Decision Trees and Random Forests"}
                        imageUrl={"https://images.smart.wtf/ml-2-3.png"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={3}
                      title={"Unsupervised Learning"}
                      imageUrl={""}
                    />
                    <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
                      <SectionCard
                        name={"Clustering with K-Means"}
                        imageUrl={"https://images.smart.wtf/ml-3-1.png"}
                      />
                      <SectionCard
                        name={"Dimensionality Reduction with PCA"}
                        imageUrl={"https://images.smart.wtf/ml-3-2.png"}
                      />
                      <SectionCard
                        name={"Neural Networks and Deep Learning Basics"}
                        imageUrl={"https://images.smart.wtf/ml-3-3.png"}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex min-h-[50px] w-full items-center justify-between p-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className="w-full rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:hidden">
        <Carousel className="w-full">
          <CarouselContent className="flex flex-row">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center gap-8 border-b pb-2">
                  <Image
                    src={"https://images.smart.wtf/machinelearning.png"}
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
                <div className="hide-scrollbar flex max-h-[600px] min-h-[350px] flex-col gap-2 overflow-y-auto border-b">
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={1}
                      title={"Foundations  of Machine Learning"}
                      imageUrl={""}
                    />
                    <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
                      <SectionCard
                        name={"Introduction to Machine Learning Concepts"}
                        imageUrl={"https://images.smart.wtf/ml-1-1.png"}
                      />
                      <SectionCard
                        name={'"Data Preprocessing Essentials'}
                        imageUrl={"https://images.smart.wtf/ml-1-2.png"}
                      />
                      <SectionCard
                        name={"Supervised vs Unsupervised Learning"}
                        imageUrl={"https://images.smart.wtf/ml-1-3.png"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={2}
                      title={"Supervised Learning Algorithms"}
                      imageUrl={""}
                    />
                    <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
                      <SectionCard
                        name={"Linear Regression Techniques"}
                        imageUrl={"https://images.smart.wtf/ml-2-1.png"}
                      />
                      <SectionCard
                        name={"Classification with Logistic Regression"}
                        imageUrl={"https://images.smart.wtf/ml-2-2.png"}
                      />
                      <SectionCard
                        name={"Decision Trees and Random Forests"}
                        imageUrl={"https://images.smart.wtf/ml-2-3.png"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    <ChapterDivider
                      chapter={3}
                      title={"Unsupervised Learning"}
                      imageUrl={""}
                    />
                    <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
                      <SectionCard
                        name={"Clustering with K-Means"}
                        imageUrl={"https://images.smart.wtf/ml-3-1.png"}
                      />
                      <SectionCard
                        name={"Dimensionality Reduction with PCA"}
                        imageUrl={"https://images.smart.wtf/ml-3-2.png"}
                      />
                      <SectionCard
                        name={"Neural Networks and Deep Learning Basics"}
                        imageUrl={"https://images.smart.wtf/ml-3-3.png"}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
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
