"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="2px"
        color="hsl(var(--progressBar))"
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  );
};

export default ProgressBarProvider;
