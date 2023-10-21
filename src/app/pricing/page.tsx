import BrainBlob from "@/components/ui/blobs/brainblob";
import { CheckCircle2, MousePointer2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SmartWtfPng from "public/smartwtf.png";

const Page = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg p-3 pt-10">
        <h3 className="text-center text-3xl">Wanna be smart? Join the crew.</h3>
        <div className="relative rounded-lg border border-border bg-card p-8 pb-4 opacity-80 shadow-md">
          <BrainBlob />
          <div className="flex flex-col">
            <p className="text-center text-5xl">
              <span className="text-4xl line-through opacity-50">$15</span> $5
              <span className="text-xl">{"  "}/ month</span>
            </p>
            <p className="mt-2 flex w-full justify-center text-center text-sm opacity-40">
              cancel anytime.
            </p>
          </div>
          <ul className="mt-10 space-y-2 text-left">
            <li className="flex flex-row items-center gap-2 text-xl">
              <CheckCircle2 className="h-4 w-4 opacity-60" />
              Interactive Diagrams
            </li>
            <li className="flex flex-row items-center gap-2 text-xl">
              <CheckCircle2 className="h-4 w-4  opacity-60" />
              Embedded Quizzes
            </li>
            <li className="flex flex-row items-center gap-2 text-xl">
              <CheckCircle2 className="h-4 w-4 opacity-60" />
              Interactive Code Snippets
            </li>
            <li className="flex flex-row items-center gap-2 text-xl">
              <CheckCircle2 className="h-4 w-4  opacity-60" />
              Simulators
            </li>
            <li className="flex flex-row items-center gap-2 text-xl">
              <CheckCircle2 className="h-4 w-4  opacity-60" />
              Discussion Forums
            </li>
            <li className="flex flex-row items-center gap-2 text-xl">
              <CheckCircle2 className="h-4 w-4  opacity-60" />
              Gamification
            </li>
          </ul>
          <div className="z-10 mb-4 mt-10 w-full max-w-[40ch] text-center text-xl text-primary md:px-32">
            Click to purchase.
          </div>
          <div className="flex items-center justify-center">
            <Link href="/signup">
              <div className="relative">
                <Image
                  width="80"
                  height="80"
                  src={SmartWtfPng}
                  alt="brain"
                  className="animate-pulse cursor-pointer transition-all hover:scale-110"
                />
                <div className="mouse1 absolute">
                  <MousePointer2 className="text-link opacity-80" />
                  <div className="rounded-lg bg-link-hover px-2 py-1 text-xs text-secondary opacity-50">
                    Noah
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
