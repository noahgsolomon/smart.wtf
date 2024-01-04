"use client";

import { trpc } from "@/trpc/client";
import QuizHeading from "./quizheading";
import { useEffect, useState } from "react";
import Quiz from "./questionComponents/quiz/quiz";
import Sort from "./questionComponents/sort/sort";
import Understanding from "./questionComponents/understanding/understanding";

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
      <div className="flex h-screen w-screen items-center justify-center pt-20">
        <div className="flex flex-col items-center justify-center gap-2">
          {questions?.questions?.map((question) => {
            return (
              <div>
                {question.type === "QUIZ" &&
                question.quizzes ? null : question.type === "SORTING" &&
                  question.sorting ? null : question.type === "UNDERSTANDING" &&
                  question.understanding ? (
                  <Understanding
                    question={question.understanding?.questionMarkdown}
                    completed={false}
                    explanation={question.understanding.explanationMarkdown}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
