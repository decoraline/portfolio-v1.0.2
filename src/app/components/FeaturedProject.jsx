"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";
import { Reveal } from "./Reveal";
import { Button } from "./ui/Button";

export function FeaturedProject({ project, onOpen }) {
  const [hover, setHover] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const ref = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true });
  }

  return (
    <Reveal className="mt-14">
      <p className="mb-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
        Featured project
      </p>

      <div
        ref={ref}
        onClick={() => onOpen(project)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          setSpot((s) => ({ ...s, on: false }));
        }}
        onMouseMove={handleMouseMove}
        className="relative cursor-pointer overflow-hidden rounded-3xl border transition-colors duration-300"
        style={{
          borderColor: hover
            ? "oklch(100% 0 0 / 0.22)"
            : "var(--dark-border)",
        }}
      >
        {spot.on && (
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background: `radial-gradient(350px circle at ${spot.x}px ${spot.y}px, oklch(100% 0 0 / 0.06), transparent 65%)`,
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[400px]">
          {/* Image */}
          <div className="relative min-h-[240px] overflow-hidden md:min-h-[400px]">
            <div
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                background: `radial-gradient(ellipse at 55% 45%, ${project.accent}, ${project.dark})`,
                transform: hover ? "scale(1.06)" : "scale(1)",
              }}
            />
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: hover ? "scale(1.06)" : "scale(1)" }}
            />
            {!isMobile && (
              <div
                className="absolute inset-y-0 right-0 w-20"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--dark-2))",
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between gap-6 bg-[var(--dark-2)] p-7 sm:p-12">
            <div>
              <p className="mb-3.5 font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {project.category}
              </p>
              <h3 className="mb-[18px] font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-inv)]">
                {project.title}
              </h3>
              <p className="mb-6 font-sans text-[0.9rem] leading-[1.75] text-[var(--text-muted)] [text-wrap:pretty]">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="whitespace-nowrap rounded-full border border-white/[0.14] bg-white/[0.09] px-[11px] py-1 font-sans text-[0.7rem] font-medium tracking-[0.04em] text-[oklch(82%_0.008_20)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="flex flex-wrap gap-2.5"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="primary" onClick={() => onOpen(project)}>
                View case study
              </Button>
              {project.siteUrl && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost">Visit site ↗</Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
