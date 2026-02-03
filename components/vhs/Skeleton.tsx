export function VHSSkeleton({ className = "" }: { className?: string }) {
  return <div className={`vhs-skeleton ${className}`} />;
}

export function ProjectCardSkeleton() {
  return (
    <div className="vhs-card p-4 h-full">
      {/* Chapter info row */}
      <div className="flex items-center gap-2 mb-3">
        <VHSSkeleton className="h-3 w-24" />
        <VHSSkeleton className="h-4 w-6 rounded-sm" />
      </div>
      {/* Title */}
      <VHSSkeleton className="h-5 w-3/4 mb-2" />
      {/* Stack */}
      <VHSSkeleton className="h-3 w-full mb-3" />
      {/* Pitch lines */}
      <VHSSkeleton className="h-3 w-full mb-1.5" />
      <VHSSkeleton className="h-3 w-2/3" />
      {/* View indicator */}
      <div className="mt-4">
        <VHSSkeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function LessonCardSkeleton() {
  return (
    <div className="vhs-card px-4 py-4">
      <div className="flex items-center gap-3">
        <VHSSkeleton className="h-5 w-5 rounded shrink-0" />
        <VHSSkeleton className="h-5 w-3/5" />
      </div>
    </div>
  );
}

export function BlooperCardSkeleton() {
  return (
    <div className="vhs-card p-4 h-full">
      <div className="flex items-start gap-3">
        <VHSSkeleton className="h-6 w-10 shrink-0" />
        <div className="flex-1 space-y-2">
          <VHSSkeleton className="h-4 w-2/3" />
          <VHSSkeleton className="h-3 w-full" />
          <VHSSkeleton className="h-3 w-full" />
          <VHSSkeleton className="h-3 w-4/5" />
        </div>
      </div>
    </div>
  );
}

export function TimelineCardSkeleton() {
  return (
    <div className="relative">
      {/* Timeline dot placeholder */}
      <div
        className="absolute left-4 w-3 h-3 -translate-x-1/2 rounded-full vhs-skeleton"
        style={{ top: "1.5rem" }}
      />
      <div className="vhs-card p-5">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div className="space-y-2">
            <VHSSkeleton className="h-5 w-48" />
            <VHSSkeleton className="h-4 w-32" />
          </div>
          <div className="space-y-1.5 text-right">
            <VHSSkeleton className="h-3 w-28 ml-auto" />
            <VHSSkeleton className="h-3 w-20 ml-auto" />
          </div>
        </div>
        {/* Stack */}
        <VHSSkeleton className="h-3 w-3/4 mb-4" />
        {/* Bullet lines */}
        <div className="space-y-2">
          <VHSSkeleton className="h-3 w-full" />
          <VHSSkeleton className="h-3 w-5/6" />
          <VHSSkeleton className="h-3 w-full" />
        </div>
      </div>
    </div>
  );
}
