import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex h-[calc(100vh)] items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            alertText: "text-primary",
            card: "shadow-md shadow-secondary rounded-lg border border-border bg-card",
            headerTitle: "text-primary",
            headerSubtitle: "text-primary opacity-60",
            socialButtonsBlockButton:
              "rounded-lg py-3 border border-secondary hover:bg-secondary",
            socialButtonsBlockButtonText: "text-secondary-foreground",
            footerActionText: "text-primary opacity-40",
            footerActionLink:
              "transition-all text-link hover:text-link-hover focus:outline-none focus:ring-0",
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;
