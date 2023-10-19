import React from "react";
import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <SignIn
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

export default LoginPage;
