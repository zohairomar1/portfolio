"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypeWriter({
  text,
  speed = 70,
  delay = 0,
  className = "",
  onComplete,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Instant mode: skip animation entirely
    if (speed === 0) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      const typeNext = () => {
        if (charIndex < text.length) {
          setDisplayText(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeNext, speed + Math.random() * 30);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      };
      typeNext();
    };

    timeout = setTimeout(startTyping, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  // Blinking cursor - slow and steady
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span
        className={`inline-block w-[0.08em] h-[0.9em] bg-primary ml-1 align-middle transition-opacity duration-200 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
        style={{ marginBottom: "0.1em" }}
      />
    </span>
  );
}
