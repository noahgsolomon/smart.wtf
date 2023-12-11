"use client";

import AddNote from "@/app/dashboard/components/notes/addnote";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Folder, Hash, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function NotesMenu() {
  const [isMathOpen, setIsMathOpen] = useState(false);

  const toggleMath = () => {
    setIsMathOpen(!isMathOpen);
  };

  return (
    <div className="mb-24 ml-24 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-8 border-b border-border pb-2">
          <h1>Notes</h1>
          <div>|</div>
          <AddNote />
        </div>
        <div className="relative ">
          <Input placeholder="search here" value={""} />
          <Search className="absolute right-2 top-2 h-4 w-4" />
        </div>
        <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto overflow-x-hidden">
          <div>
            <div
              onClick={toggleMath}
              className="group flex cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80"
            >
              <div className="flex flex-row items-center gap-2">
                <ChevronDown className="h-4 w-4" />
                <Folder className="h-6 w-6 fill-math/50 text-math " />
                Math
              </div>
              <div className="flex flex-row items-center gap-2 ">
                <Hash className="h-4 w-4" />1
              </div>
            </div>
            {isMathOpen && (
              <div
                className={`transition-max-height duration-500 ease-in-out ${
                  isMathOpen ? "max-h-[1000px]" : "max-h-0"
                }`}
                style={{ overflow: "hidden" }}
              >
                <div className="flex flex-col gap-2 py-2 pl-8">
                  <div className="flex cursor-pointer flex-row items-center gap-6 rounded-lg border border-border p-1 transition-all hover:-translate-y-0.5">
                    <Image
                      className="rounded-lg border border-border"
                      width={75}
                      height={75}
                      src={"https://images.smart.wtf/note-1-image.png"}
                      alt="note"
                    />
                    <h5 className="font-bold">Partial Derivatives</h5>
                  </div>
                  <div className="flex cursor-pointer flex-row items-center gap-6 rounded-lg border border-border p-1 transition-all hover:-translate-y-0.5">
                    <Image
                      className="rounded-lg border border-border"
                      width={75}
                      height={75}
                      src={"https://images.smart.wtf/note-1-image.png"}
                      alt="note"
                    />
                    <h5 className="font-bold">Partial Derivatives</h5>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className=" h-4 w-4" />
            <Folder className="h-6 w-6 fill-computerScience/50 text-computerScience" />
            Computer Science
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="h-6 w-6 fill-socialStudies/50 text-socialStudies" />
            Social Studies
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="h-6 w-6 fill-geography/50 text-geography" />
            Geography
          </div>
          {/* <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-philosophy fill-philosophy/50 h-6 w-6" />
            philosophy
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-literature fill-literature/50 h-6 w-6" />
            literature
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-music fill-music/50 h-6 w-6" />
            Music
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-arts fill-arts/50 h-6 w-6" />
            Arts
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-history fill-history/50 h-6 w-6" />
            History
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-science fill-science/50 h-6 w-6" />
            Science
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-physicalEducation fill-physicalEducation/50 h-6 w-6" />
            physicalEducation
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-economics fill-economics/50 h-6 w-6" />
            economics
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-businessStudies fill-businessStudies/50 h-6 w-6" />
            businessStudies
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-psychology fill-psychology/50 h-6 w-6" />
            psychology
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-law fill-law/50 h-6 w-6" />
            law
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-politicalScience fill-politicalScience/50 h-6 w-6" />
            politicalScience
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-environmentalScience fill-environmentalScience/50 h-6 w-6" />
            environmentalScience
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-engineering fill-engineering/50 h-6 w-6" />
            engineering
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-medicine fill-medicine/50 h-6 w-6" />
            medicine
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-agriculture fill-agriculture/50 h-6 w-6" />
            agriculture
          </div>
          <div className="group flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80">
            <ChevronDown className="h-4 w-4" />
            <Folder className="text-astronomy fill-astronomy/50 h-6 w-6" />
            astronomy
          </div> */}
        </div>
      </div>
    </div>
  );
}
