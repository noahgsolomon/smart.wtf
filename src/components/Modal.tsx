"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const onDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      router.back();
    }, 150); // match this with the transition duration
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    setIsVisible(true);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className={`fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-full"
      >
        {children}
      </div>
    </div>
  );
}
