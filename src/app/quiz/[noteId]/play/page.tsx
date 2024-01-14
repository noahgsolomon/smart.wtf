"use client";

import { trpc } from "@/trpc/client";
import QuizHeading from "./quizheading";
import { useEffect, useState } from "react";
import Quiz from "./questionComponents/quiz/quiz";
import Sort from "./questionComponents/sort/sort";
import Understanding from "./questionComponents/understanding/understanding";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Page({
  params: { noteId },
}: {
  params: { noteId: string };
}) {
  const quizQuestionsQuery = trpc.quiz.getQuestions.useQuery({
    noteId: parseInt(noteId),
  });

  const [questions, setQuestions] = useState<
    typeof quizQuestionsQuery.data | null
  >(null);

  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Record<number, boolean>>([]);

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (quizQuestionsQuery.data?.available) {
      setQuestions(quizQuestionsQuery.data);
    } else {
      setQuestions(null);
    }
  }, [quizQuestionsQuery.isFetched]);

  return (
    <>
      <QuizHeading
        api={api}
        completed={completed}
        current={current}
        questions={questions!}
      />
      <div className="relative flex h-screen w-screen items-center justify-center overflow-x-hidden pt-12">
        <Carousel
          setApi={setApi}
          className="flex w-full flex-col items-center justify-center"
        >
          <CarouselContent>
            {questions?.questions?.map((question, index) => {
              return (
                <CarouselItem
                  key={question.id}
                  className="flex h-[100vh] items-center justify-center"
                >
                  <div className="flex max-w-[800px] flex-col px-8">
                    {question.type === "QUIZ" && question.quizzes ? (
                      <Quiz
                        index={index}
                        key={question.quizzes.id}
                        completed={completed[index] ?? false}
                        explanation={question.quizzes.explanationMarkdown}
                        //@ts-ignore
                        options={question.quizzes.options}
                        setCompleted={setCompleted}
                        content={question.quizzes.questionMarkdown}
                        answer={question.quizzes.correctOption}
                        api={api}
                        questionCount={questions?.questions?.length ?? 0}
                      />
                    ) : question.type === "SORTING" && question.sorting ? (
                      <Sort
                        index={index}
                        completed={completed[index] ?? false}
                        explanation={question.sorting.explanationMarkdown}
                        options={question.sorting.options}
                        setCompleted={setCompleted}
                        question={question.sorting.questionMarkdown}
                        key={question.sorting.id}
                        api={api}
                        questionCount={questions?.questions?.length ?? 0}
                      />
                    ) : question.type === "UNDERSTANDING" &&
                      question.understanding ? (
                      <Understanding
                        index={index}
                        key={question.understanding.id}
                        question={question.understanding?.questionMarkdown}
                        completed={completed[index] ?? false}
                        setCompleted={setCompleted}
                        explanation={question.understanding.explanationMarkdown}
                        api={api}
                        questionCount={questions?.questions?.length ?? 0}
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
