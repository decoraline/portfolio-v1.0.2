"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "./ui/Button";

export function ProjectModal({
  project,
  projects,
  onClose,
  onPrev,
  onNext,
}) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const idx = projects.findIndex((p) => p.id === project.id);
  const total = projects.length;

  // 0 = first open (revealUp), 1 = next (slideInRight), -1 = prev (slideInLeft)
  const [dir, setDir] = useState(0);
  const scrollRef = useRef(null);

  const handlePrev = useCallback(() => {
    setDir(-1);
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    setDir(1);
    onNext();
  }, [onNext]);

  // Reset scroll position when navigating to a different project.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [project.id]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, handlePrev, handleNext]);

  const slideAnim =
    dir === 1
      ? "slideInRight 0.52s cubic-bezier(0.22,1,0.36,1) both"
      : dir === -1
        ? "slideInLeft 0.52s cubic-bezier(0.22,1,0.36,1) both"
        : "revealUp 0.5s cubic-bezier(0.22,1,0.36,1) both";

  const arrowBtnClass =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-base text-[var(--text-inv)] backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.16]";

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[oklch(4%_0.01_20/0.78)] p-3 backdrop-blur-md sm:p-7"
      style={{ animation: "fadeIn 0.22s ease" }}
    >
      {!isMobile && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className={arrowBtnClass}
            style={{ left: 20 }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className={arrowBtnClass}
            style={{ right: 20 }}
          >
            →
          </button>
        </>
      )}

      <div
        className="flex w-full max-w-[880px] flex-col overflow-hidden rounded-2xl border border-[var(--dark-border)] bg-[var(--dark-2)] shadow-[0_48px_100px_oklch(2%_0.01_20/0.65)] sm:rounded-[28px]"
        style={{
          maxHeight: "calc(100vh - 56px)",
          animation: "modalIn 0.38s cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        {/* Image header — cross-fades on navigation via key change */}
        <div
          key={`img-${project.id}`}
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            height: isMobile ? 200 : 280,
            animation: "imageReveal 0.45s ease both",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 62% 38%, ${project.accent}, ${project.dark})`,
            }}
          />
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="880px"
            className="object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--dark-2) 0%, transparent 55%)",
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/[0.12] text-[0.9rem] text-[var(--text-inv)] backdrop-blur-md hover:bg-white/[0.2]"
          >
            ✕
          </button>
          <div
            className="absolute left-5 top-4 font-sans text-[0.7rem] font-medium tracking-[0.1em]"
            style={{ color: "oklch(70% 0.01 20)" }}
          >
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* Scroll shell — fixed, never animates */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* Inner content — slides on navigation via key remount */}
          <div
            key={`body-${project.id}`}
            className="px-6 pb-9 pt-4 sm:px-[52px] sm:pb-[52px] sm:pt-2"
            style={{ animation: slideAnim }}
          >
            <p
              className="mb-2.5 font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]"
              style={{ animation: "revealUp 0.42s ease 30ms both" }}
            >
              {project.category}
            </p>
            <h2
              className="mb-[22px] font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--text-inv)]"
              style={{
                animation: "revealUp 0.48s cubic-bezier(0.4,0,0.2,1) 80ms both",
              }}
            >
              {project.title}
            </h2>
            <p
              className="mb-[34px] font-sans text-[0.93rem] leading-[1.78] text-[var(--text-muted)] [text-wrap:pretty]"
              style={{ animation: "revealUp 0.48s ease 140ms both" }}
            >
              {project.overview ?? project.description}
            </p>
            <p
              className="mb-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]"
              style={{ animation: "revealUp 0.42s ease 200ms both" }}
            >
              Tech Stack
            </p>
            <div className="mb-10 flex flex-wrap gap-2">
              {project.tags.map((tag, ti) => (
                <span
                  key={tag}
                  className="inline-block"
                  style={{
                    animation: `slideUp 0.38s cubic-bezier(0.34,1.56,0.64,1) ${
                      230 + ti * 45
                    }ms both`,
                  }}
                >
                  <span className="inline-block rounded-full border border-white/[0.14] bg-white/[0.06] px-4 py-[7px] font-sans text-[0.8rem] text-[oklch(86%_0.007_20)]">
                    {tag}
                  </span>
                </span>
              ))}
            </div>
            <div
              className="flex flex-wrap gap-2.5"
              style={{ animation: "revealUp 0.42s ease 360ms both" }}
            >
              {project.siteUrl && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary">Visit site ↗</Button>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost">View on GitHub ↗</Button>
                </a>
              )}
              {isMobile && (
                <>
                  <Button variant="ghost" onClick={handlePrev}>
                    ← Prev
                  </Button>
                  <Button variant="ghost" onClick={handleNext}>
                    Next →
                  </Button>
                </>
              )}
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
