"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { User, type Note } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  Clock,
  Copy,
  Download,
  GraduationCap,
  Info,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { AnimatePresence, motion } from "framer-motion";
import { useRegenerate } from "./useRegenerate";
import { useContinue } from "./useContinue";
import { toast } from "sonner";
import Link from "next/link";
import { useAddingNote } from "@/utils/hooks/useaddingnote";
import { useGenerationType } from "@/utils/hooks/usegenerationtype";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Page({ params }: { params: { noteId: string } }) {
  const retrieveNoteQuery = trpc.notes.getNote.useQuery({
    id: parseInt(params.noteId),
  });

  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [following, setFollowing] = useState(false);

  const generateQuizMutation = trpc.quiz.generateQuiz.useMutation({
    onSuccess: () => {
      setGeneratingQuiz(false);
      toast.success("Quiz Generated");
    },
    onError: (err) => {
      console.log(err);
      setGeneratingQuiz(false);
    },
  });

  const isQuizActiveQuery = trpc.quiz.isQuizAvailable.useQuery({
    noteId: parseInt(params.noteId),
  });

  const router = useRouter();

  const [imageMutationCalled, setImageMutationCalled] = useState(false);
  const [note, setNote] = useState<Note | null>(null);
  const [, setImageSrc] = useState<string | null>(null);

  const [agentMarkdown, setAgentMarkdown] = useState("");

  const [generating, setGenerating] = useState(false);
  const [generatingQuiz, setGeneratingQuiz] = useState(true);
  const [requestedQuiz, setRequestedQuiz] = useState(false);

  const { setAgent, setNoteId, setTopic } = useAddingNote();
  const { setIsOpen } = useGenerationType();

  const createNoteMutation = trpc.notes.createNote.useMutation({
    onSuccess: (data) => {
      if (data) {
        if (data.valid) {
          setNoteId(data.noteId!);
          setTopic(note?.nextTopic!);
          setAgent(
            note?.agents! as {
              name: "rick" | "patrick" | "mrburns" | "bender";
              id: number;
            },
          );
          setIsOpen(true);
          setGenerating(false);
        } else {
          toast.error("Invalid topic");
          setGenerating(false);
        }
      }
      setGenerating(false);
    },
    onError: () => {
      setGenerating(false);
    },
  });

  const {
    handleRegenerate: agentHandleRegenerate,
    regenerating: agentRegenerating,
  } = useRegenerate({
    note: { id: note?.id!, title: note?.title! },
    markdown: agentMarkdown,
    setMarkdown: setAgentMarkdown,
    agent: true,
    agentPrompt: note?.agents.prompt,
  });

  const { continuing: agentContinuing, handleContinue: agentHandleContinue } =
    useContinue({
      note: { id: note?.id!, title: note?.title! },
      markdown: agentMarkdown,
      setMarkdown: setAgentMarkdown,
      agent: true,
      agentPrompt: note?.agents.prompt,
    });

  const [hasAgentRegenerated, setHasAgentRegenerated] = useState(false);

  useEffect(() => {
    if (note?.markdown) {
    } else {
      if (
        note &&
        note.id &&
        note.title &&
        !hasAgentRegenerated &&
        !note.agents_markdown
      ) {
        setHasAgentRegenerated(true);
        agentHandleRegenerate();
        setFollowing(true);
      }
    }
  }, [note, agentMarkdown, agentHandleRegenerate]);

  const createImageMutation = trpc.notes.createImage.useMutation({
    onSuccess: (data) => {
      setImageSrc(data.imageUrl!);
      setNote((prev) => (prev ? { ...prev, imageUrl: data.imageUrl! } : null));
    },
  });

  useEffect(() => {
    const note = retrieveNoteQuery.data?.note;
    if (note) {
      setNote(note);
      if (note.agents_markdown && agentMarkdown === "") {
        setAgentMarkdown(note.agents_markdown);
      }

      if (!note.imageUrl && !imageMutationCalled) {
        setImageMutationCalled(true);
        createImageMutation.mutate({
          id: note.id,
          title: note.title,
        });
      } else if (note.imageUrl) {
        setImageSrc(note.imageUrl);
      }
    } else if (retrieveNoteQuery.isFetched) {
      console.log("Note not found");
      router.push("/404");
    }
  }, [
    retrieveNoteQuery.data,
    retrieveNoteQuery.isSuccess,
    params.noteId,
    imageMutationCalled,
    createImageMutation,
  ]);

  useEffect(() => {
    const quizGenerated = isQuizActiveQuery.data?.available;
    if (quizGenerated) {
      setGeneratingQuiz(false);
    } else {
      if (note?.title && generatingQuiz && !requestedQuiz) {
        setRequestedQuiz(true);
        setTimeout(() => {
          generateQuizMutation.mutate({
            noteId: parseInt(params.noteId),
            noteTitle: note?.title!,
          });
        }, 7500);
      }
    }
  }, [note?.title]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop < lastScrollTop) {
        setFollowing(false);
        setLastScrollTop(currentScrollTop);
        return;
      }
      setLastScrollTop(currentScrollTop);

      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        setFollowing(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    if ((agentContinuing || agentRegenerating) && following) {
      const scrollDown = () => {
        window.scrollTo(0, document.body.scrollHeight);
      };
      scrollDown();
    }
  }, [agentMarkdown, following]);

  if (retrieveNoteQuery.isLoading || !note) {
    return <></>;
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const handleCopyClick = () => {
    const textToCopy = agentMarkdown;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
        toast.error("Error copying to clipboard");
      });
  };

  const handleDownloadClick = () => {
    const textToDownload = agentMarkdown;

    const element = document.createElement("a");
    const file = new Blob([textToDownload], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${note?.title}${" " + note?.agents.name}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success("Downloaded");
  };

  const scrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex flex-col gap-8 pt-8 md:pt-0">
            <div className="flex justify-center px-0 pb-4 pt-48 md:px-4 lg:pt-64 ">
              <div className="relative px-8 py-2 pb-24">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <h1 className="max-w-[15ch] text-5xl">{note?.title}</h1>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="flex flex-row items-center gap-1 text-sm opacity-60">
                      <Clock className="h-3 w-3" />
                      {note?.minutes ?? 0} min read
                    </p>
                    <Badge
                      /*@ts-ignore*/
                      variant={note?.category
                        .toLowerCase()
                        .split(" ")
                        .map((word, index) =>
                          index === 0
                            ? word
                            : word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join("")}
                    >
                      #{note?.category}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className={cn(
                        buttonVariants({
                          variant: "default",
                        }),
                        `flex flex-row items-center gap-1 ${
                          generatingQuiz ? "opacity-50" : ""
                        }`,
                      )}
                      href={`${generatingQuiz ? "" : `/quiz/${note?.id}/play`}`}
                    >
                      <GraduationCap className="h-5 w-4" />
                      {generatingQuiz ? "Generating Quiz..." : "Quiz"}
                    </Link>
                    <div className="flex flex-row gap-2">
                      <Button onClick={handleCopyClick} variant={"ghost"}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleDownloadClick} variant={"ghost"}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-1 text-sm text-primary/50">
                    {agentRegenerating ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-1">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </div>
                        <p>
                          This should take a few minutes. Please stay on this
                          screen.
                        </p>
                      </div>
                    ) : (
                      <>
                        <Info className="h-3 w-3 " />
                        <p>
                          note: we're not always right, click{" "}
                          <Button
                            variant={"link"}
                            className="text-primay/80 m-0 p-0 font-bold"
                            onClick={agentHandleRegenerate}
                          >
                            here
                          </Button>{" "}
                          to regenerate
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="absolute -top-[125px] left-8 ">
                  <Image
                    src={`https://images.smart.wtf${note?.agents.pfp!}`}
                    alt="agent"
                    width={100}
                    height={100}
                    className="rounded-full border border-border bg-secondary/90"
                  />
                </div>
                <div className="prose prose-slate pt-12 dark:prose-invert">
                  <Markdown
                    components={{
                      code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className ?? "");
                        return match ? (
                          <div>
                            <p className="code-language">{match[1]}</p>
                            <pre className={cn(className)}>
                              <code>{children}</code>
                            </pre>
                          </div>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[
                      rehypeKatex,
                      slug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "wrap",
                        },
                      ],
                      rehypeHighlight,
                    ]}
                  >
                    {agentMarkdown}
                  </Markdown>
                </div>
                <div
                  className={`${
                    !following ? "" : "opacity-0"
                  } fixed bottom-6 left-0 right-0 mx-auto  flex w-full justify-center transition-all`}
                >
                  <Button
                    onClick={() => {
                      setFollowing(true);
                      scrollDown();
                    }}
                    className="rounded-full"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                {!agentRegenerating &&
                  !agentContinuing &&
                  !agentRegenerating &&
                  !agentContinuing && (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row items-center gap-2 pt-8">
                        <Button
                          disabled={generating}
                          onClick={agentHandleContinue}
                          className="flex flex-row gap-1 py-5"
                        >
                          Continue
                        </Button>
                        {/*TODO: FIX */}
                        {/* <p>or</p>

                        <Button
                          disabled={generating}
                          variant={"secondary"}
                          className="flex flex-row gap-1  py-5"
                          onClick={() => {
                            setGenerating(true);
                            createNoteMutation.mutate({
                              agentId: note?.agent_id ?? 1,
                              title: note?.nextTopic!,

                            });
                          }}
                        >
                          {generating ? "Generating" : note?.nextTopic}
                        </Button> */}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
