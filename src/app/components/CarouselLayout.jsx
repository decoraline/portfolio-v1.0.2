"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "./ui/Button";

export function CarouselLayout({ projects, onOpen }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const CW = isMobile ? 240 : 300;
  const GAP = 12;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const target = active * (CW + GAP) - track.clientWidth / 2 + CW / 2;
    track.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active, CW]);

  const go = (n) => setActive((n + projects.length) % projects.length);

  const cardHeight = isMobile ? 300 : 360;

  return (
    <div>
      <div
        ref={trackRef}
        className="flex overflow-x-auto px-0.5 pb-5 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap: GAP, userSelect: "none" }}
      >
        {projects.map((p, i) => {
          const isActive = i === active;
          return (
            <div key={p.id} className="flex-shrink-0">
              <ProjectCard
                project={p}
                isActive={isActive}
                width={CW}
                height={cardHeight}
                priority={i === 0}
                onClick={() => (isActive ? onOpen(p) : go(i))}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to project ${i + 1}`}
              className="h-1.5 rounded-full border-0 p-0 transition-all duration-300"
              style={{
                width: i === active ? 22 : 6,
                background:
                  i === active ? "var(--text-inv)" : "var(--dark-border)",
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => go(active - 1)}
            ariaLabel="Previous project"
            className="px-[14px] py-2"
          >
            ←
          </Button>
          <Button variant="primary" onClick={() => onOpen(projects[active])}>
            View project
          </Button>
          <Button
            variant="ghost"
            onClick={() => go(active + 1)}
            ariaLabel="Next project"
            className="px-[14px] py-2"
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
}
