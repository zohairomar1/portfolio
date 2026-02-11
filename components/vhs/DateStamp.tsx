"use client";

import { useEffect, useState } from "react";

export function DateStamp() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDate(
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).toUpperCase()
      );
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="font-mono text-[10px] sm:text-sm text-right space-y-0.5"
      style={{
        color: "#FFA500",
        textShadow: "0 0 6px rgba(255, 165, 0, 0.5)",
      }}
      aria-hidden="true"
    >
      <p className="tracking-wider font-bold">{date}</p>
      <p className="tracking-wider">{time}</p>
    </div>
  );
}
