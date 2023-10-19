import { Button } from "@/components/ui/button";
import HeroBlob from "@/components/ui/heroblob";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { ArrowRight, BrainCog, Check, X } from "lucide-react";

export default function Home() {
  return (
    <main className="relative mt-20 flex flex-col items-center justify-center gap-4">
      <HeroBlob />
      <div className="mt-[100px] flex w-[90%] flex-col items-center justify-center bg-opacity-60 text-4xl lg:w-[75%]">
        <div className="flex flex-col items-center justify-center gap-8 ">
          <h1 className="max-w-[10ch] text-center text-6xl font-bold">
            Innovative Learning Experiences.
          </h1>
          <p className="text-center text-2xl opacity-60">
            Where Books Meet Interactive Brilliance.
          </p>
        </div>
        <div className="mt-8 flex h-[800px] w-full items-center justify-center rounded-lg border border-border bg-background opacity-80 shadow-md shadow-secondary">
          <QuestionMarkIcon className="animate-breathe h-10 w-10 text-primary blur-sm" />
        </div>
        <div className="mb-[100px] mt-10 flex flex-col items-center justify-center gap-8 rounded-lg p-3 md:w-full">
          <h3>Choose your fighter</h3>
          <div className="flex w-full flex-col justify-center gap-8 md:flex-row">
            <div className="rounded-lg border border-border p-8 shadow-md">
              <div>
                <div className="flex flex-col">
                  <h3 className="text-2xl">Noob</h3>
                  <p className="text-4xl">$0</p>
                  <p className="text-lg opacity-60">for the uninitiated</p>
                </div>
                <ul className="mt-10">
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Customizable themes
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Advanced searching capabilities
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Visualize and organize content
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Notifications and reminders
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg opacity-60">
                    <X className={"h-4 w-4 text-red-500"} />
                    AI-driven content suggestions
                  </li>{" "}
                  <li className="flex flex-row items-center gap-2 text-lg opacity-60">
                    <X className={"h-4 w-4 text-red-500"} />
                    Import of PDFs and books
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg opacity-60">
                    <X className={"h-4 w-4 text-red-500"} />
                    Collaborative capabilities
                  </li>
                </ul>
                <Button
                  variant={"outline"}
                  className="z-10 mt-10 bg-background"
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative rounded-lg border border-border p-8 shadow-md">
              <div>
                <div className="flex flex-col">
                  <h3 className="text-2xl">Pro</h3>
                  <p className="text-4xl">
                    $10 <span className="text-lg">{"  "}/ month</span>
                  </p>
                  <p className="text-lg opacity-60">for the pro</p>
                </div>
                <ul className="mt-10">
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Customizable themes
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Advanced searching capabilities
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Visualize and organize content
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Notifications and reminders
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    AI-driven content suggestions
                  </li>{" "}
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Import of PDFs and books
                  </li>
                  <li className="flex flex-row items-center gap-2 text-lg">
                    <Check className="h-4 w-4 text-green-500" />
                    Collaborative capabilities
                  </li>
                </ul>
                <Button className="z-10 mt-10">
                  Upgrade Now <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
