import React from "react";
import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <div className="flex h-[calc(100vh)] items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            alertText: "text-primary",
            card: "shadow-none rounded-lg border border-border bg-card",
            headerTitle: "text-primary",
            headerSubtitle: "text-primary opacity-60",
            socialButtonsBlockButton:
              "ring-0 dark:border dark:border-secondary dark:hover:bg-secondary outline-none",
            socialButtonsIconButton:
              "ring-0 dark:border dark:border-secondary dark:hover:bg-secondary outline-none",
            socialButtonsBlockButtonText: "text-secondary-foreground",
            footerActionText: "text-primary opacity-40",
            footerActionLink:
              "transition-all text-blue hover:opacity-80 focus:outline-none focus:ring-0",
          },
        }}
      />
    </div>
  );
};

export default LoginPage;
