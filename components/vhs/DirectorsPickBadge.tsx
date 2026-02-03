"use client";

interface DirectorsPickBadgeProps {
  className?: string;
  size?: "sm" | "md";
}

export function DirectorsPickBadge({ className = "", size = "md" }: DirectorsPickBadgeProps) {
  const isSm = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono tracking-wider whitespace-nowrap ${
        isSm ? "text-[9px] px-2 py-0.5" : "text-[10px] px-3 py-1"
      } ${className}`}
      style={{
        background: "hsl(var(--primary))",
        color: "hsl(var(--background))",
        boxShadow: "0 0 12px hsl(var(--primary) / 0.5), 0 0 24px hsl(var(--primary) / 0.2)",
        animation: "directors-pick-pulse 2s ease-in-out infinite",
      }}
    >
      <span aria-hidden="true">★</span>
      DIRECTOR&apos;S PICK
    </span>
  );
}
