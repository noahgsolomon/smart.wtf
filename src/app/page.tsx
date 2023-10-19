import { Button } from "@/components/ui/button";
import FishBlob from "@/components/ui/blobs/fishblob";
import HeroBlob from "@/components/ui/blobs/heroblob";
import {
  BookMarked,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Fish,
  HelpCircle,
} from "lucide-react";
import SuccessBlob from "@/components/ui/blobs/successblob";
import LibraryBlob from "@/components/ui/blobs/libraryblob";
import BrainBlob from "@/components/ui/blobs/brainblob";
import { BarChartIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <main className="relative mt-20 flex flex-col items-center justify-center gap-4">
      <HeroBlob />
      <div className="mt-[100px] flex w-[90%] flex-col items-center justify-center bg-opacity-60 text-4xl lg:w-[75%]">
        <div className="flex flex-col items-center justify-center gap-8 ">
          <h1 className="max-w-[10ch] text-center text-6xl font-bold">
            smart.wtf
          </h1>
          <p className="text-center text-2xl opacity-60">
            Where Books Meet Interactive Brilliance.
          </p>
        </div>
        <div className="mt-8 flex h-[800px] w-full items-center justify-center rounded-lg border border-border bg-card opacity-60 shadow-md shadow-secondary">
          <HelpCircle className="animate-breathe h-10 w-10 text-primary blur-[1px]" />
        </div>
        {/* <div className="mt-96">
          <div className="relative w-full max-w-full">
            <div className="animate-blob bg-blob1 absolute -top-20 right-0 h-72 w-72 rounded-full opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animate-blob animation-delay-2000 bg-blob2 absolute -top-32 right-20 h-72 w-72 rounded-full opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animate-blob animation-delay-4000 bg-blob3 absolute -bottom-10 right-40 h-72 w-72 rounded-full opacity-70 mix-blend-multiply blur-xl filter"></div>
          </div>
        </div> */}

        <section className="mb-20 mt-20 flex w-full flex-col gap-16">
          <h3 className="text-center text-4xl">"wtf do you have to offer?"</h3>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Dive Deep, Interactively</h3>
              <p className="max-w-[35ch] text-sm">
                <span className="font-bold">Engage with Content:</span> Learn
                with the depth of a book, enriched with interactive
                demonstrations. Our platform isn't just about reading; it's
                about engaging deeply with every piece of information.
                Simulations, animations, and interactive elements make
                understanding complex topics a breeze.
              </p>
            </div>
            <div>
              <div className="relative flex h-[400px] w-[400px] items-center justify-center rounded-lg border border-border bg-card opacity-80">
                <Fish className="animate-breathe text-fish h-10 w-10 blur-[1px]" />
                <FishBlob />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <div className="relative flex h-[400px] w-[400px] items-center justify-center rounded-lg border border-border bg-card opacity-80">
                <BookOpenCheck className="animate-breathe text-success h-10 w-10 blur-[1px]" />
                <SuccessBlob />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Ask as You Learn</h3>
              <p className="max-w-[35ch] text-sm">
                <span className="font-bold">AI everything:</span> Highlight text
                and pose questions directly to our tailored AI, specialized for
                the content at hand. This isn't just any AI — it's imbued with a
                unique personality crafted from the text you're reading. While
                diving into content, effortlessly bookmark passages, jot down
                notes, and receive instantaneous insights, clarifications, and
                suggestions. Your learning becomes a seamless conversation.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Your Library, Supercharged</h3>
              <p className="max-w-[35ch] text-sm">
                <span className="font-bold">Import, Digest, Understand:</span>
                Bring your own books or PDFs and experience them like never
                before. With our advanced tools, notes, and highlights, you can
                digest and internalize content efficiently. We transform your
                reading material into an immersive learning experience.
              </p>
            </div>
            <div>
              <div className="relative flex h-[400px] w-[400px] items-center justify-center rounded-lg border border-border bg-card opacity-80">
                <BookMarked className="text-library animate-breathe h-10 w-10 blur-[1px]" />
                <LibraryBlob />
              </div>
            </div>
          </div>
        </section>

        <div className="mb-[100px] mt-10 flex w-full flex-col items-center justify-center gap-8 rounded-lg p-3">
          <h3 className="flex flex-row items-center gap-2">
            Wanna be smart? Join the crew.
            <Brain className="text-brain h-8 w-8" />
          </h3>
          <div className="relative rounded-lg border border-border bg-card p-8 pb-4 opacity-80 shadow-md">
            <BrainBlob />
            <div className="flex flex-col">
              <p className="text-center text-5xl">
                <span className="text-4xl line-through opacity-50">$15</span> $5
                <span className="text-xl">{"  "}/ month</span>
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
            <Button className="z-10 mt-10 w-full p-6 px-32 text-xl">
              Start your 7 day free trial
            </Button>
            <p className="mt-1 text-center text-base opacity-60">
              {"(no credit card required)"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
