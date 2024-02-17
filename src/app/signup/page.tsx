import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = ({
  searchParams,
}: {
  searchParams: {
    noteTopic?: string;
    noteAgent?: string;
    noteCategory?: string;
    noteNextTopic?: string;
  };
}) => {
  return (
    <div className="flex h-[calc(100vh)] items-center justify-center">
      <SignUp
        redirectUrl={`/auth${
          searchParams.noteTopic &&
          searchParams.noteAgent &&
          searchParams.noteCategory &&
          searchParams.noteNextTopic
            ? `?noteTopic=${encodeURIComponent(
                searchParams.noteTopic,
              )}&noteAgent=${encodeURIComponent(
                searchParams.noteAgent,
              )}&noteCategory=${encodeURIComponent(
                searchParams.noteCategory,
              )}&noteNextTopic=${encodeURIComponent(
                searchParams.noteNextTopic,
              )}`
            : ""
        }`}
        appearance={{
          elements: {
            alertText: "text-primary",
            card: "shadow-md rounded-lg border border-border bg-card/70 md:w-[800px] max-w-[80%] mx-auto",
            headerTitle: "text-primary",
            headerSubtitle: "text-primary opacity-60",
            socialButtonsBlockButton:
              "ring-0 dark:border dark:border-secondary dark:hover:bg-secondary outline-none",
            socialButtonsIconButton:
              "ring-0 dark:border dark:border-secondary dark:hover:bg-secondary outline-none",
            socialButtonsBlockButtonText: "text-secondary-foreground",
            footerActionText: "text-primary opacity-40",
            footerActionLink:
              "transition-all text-blue hover:opacity-80 outline-none",
            socialButtonsBlockButtonArrow: "text-primary",
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;
