"use client";

import { trpc } from "@/trpc/client";
import QuizHeading from "./quizheading";
import { useEffect, useState } from "react";
import Quiz from "./questionComponents/quiz/quiz";
import Sort from "./questionComponents/sort/sort";
import Understanding from "./questionComponents/understanding/understanding";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Page({
  params: { noteId },
  searchParams: { q },
}: {
  params: { noteId: string };
  searchParams: { q: string };
}) {
  const quizQuestionsQuery = trpc.quiz.getQuestions.useQuery({
    noteId: parseInt(noteId),
  });

  const [questions, setQuestions] = useState<
    typeof quizQuestionsQuery.data | null
  >(null);

  useEffect(() => {
    if (quizQuestionsQuery.data?.available) {
      console.log(quizQuestionsQuery.data.questions);
      setQuestions(quizQuestionsQuery.data);
    }
  }, [quizQuestionsQuery.isFetched]);

  return (
    <>
      <QuizHeading q={q} noteId={noteId} />
      <div className=" flex h-screen w-screen items-center justify-center overflow-x-hidden pt-12">
        <Carousel className="flex w-full flex-col items-center justify-center">
          <CarouselContent>
            {questions?.questions?.map((question) => {
              return (
                <CarouselItem className="flex items-center justify-center">
                  <div className="flex max-w-[800px] flex-col px-8">
                    {question.type === "QUIZ" && question.quizzes ? (
                      <Quiz
                        key={question.quizzes.id}
                        completed={false}
                        explanation={question.quizzes.explanationMarkdown}
                        //@ts-ignore
                        options={question.quizzes.options}
                        content={question.quizzes.questionMarkdown}
                        answer={question.quizzes.correctOption}
                      />
                    ) : question.type === "SORTING" && question.sorting ? (
                      <Sort
                        completed={false}
                        explanation={question.sorting.explanationMarkdown}
                        options={question.sorting.options}
                        question={question.sorting.questionMarkdown}
                        key={question.sorting.id}
                      />
                    ) : question.type === "UNDERSTANDING" &&
                      question.understanding ? (
                      <Understanding
                        key={question.understanding.id}
                        question={question.understanding?.questionMarkdown}
                        completed={false}
                        explanation={question.understanding.explanationMarkdown}
                      />
                    ) : null}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
