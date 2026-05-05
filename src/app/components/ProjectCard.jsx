"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export function ProjectCard({
  project,
  isActive,
  width,
  height,
  onClick,
  onMouseEnter,
  variant = "carousel",
  priority = false,
}) {
  const showTags = variant === "carousel" ? isActive : false;
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true });
  }

  function handleMouseLeave() {
    setSpot((s) => ({ ...s, on: false }));
  }

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width, height }}
      className={`group relative cursor-pointer overflow-hidden rounded-[20px] transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        variant === "carousel"
          ? isActive
            ? "scale-[1.05] border border-white/20 opacity-100 shadow-[0_20px_55px_oklch(4%_0.01_20/0.45)]"
            : "scale-[0.96] border border-transparent opacity-45"
          : "border border-white/[0.06]"
      }`}
    >
      {/* Background — fallback gradient + real screenshot */}
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
        sizes="(max-width: 640px) 240px, (max-width: 1024px) 360px, 480px"
        priority={priority}
        className="object-cover object-top"
      />

      {/* Masked backdrop blur — fades from blurred (bottom) to clear (top) */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 42%, transparent 68%)",
          maskImage:
            "linear-gradient(to top, black 0%, black 42%, transparent 68%)",
        }}
      />

      {/* Dark gradient for text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(8% 0.01 20 / 0.9) 0%, oklch(8% 0.01 20 / 0.18) 52%, transparent 75%)",
        }}
      />

      {/* Spotlight on hover */}
      {spot.on && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `radial-gradient(350px circle at ${spot.x}px ${spot.y}px, oklch(100% 0 0 / 0.065), transparent 65%)`,
          }}
        />
      )}

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 z-[5] px-6 pb-6">
        <div
          className="transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            transform: showTags ? "translateY(-50px)" : "translateY(0)",
          }}
        >
          <p className="mb-1.5 font-sans text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/50">
            {project.category}
          </p>
          <h3 className="font-serif text-[1.35rem] font-semibold leading-[1.15] tracking-tight text-white/95">
            {project.title}
          </h3>
        </div>

        {showTags && (
          <div
            key={`tags-${project.id}`}
            className="absolute inset-x-6 bottom-6 flex flex-wrap gap-1.5"
          >
            {project.tags.slice(0, 3).map((tag, ti) => (
              <span
                key={tag}
                className="inline-block"
                style={{
                  animation: `slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) ${
                    60 + ti * 55
                  }ms both`,
                }}
              >
                <Badge>{tag}</Badge>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/[0.14] bg-white/[0.09] px-[11px] py-1 font-sans text-[0.7rem] font-medium tracking-[0.04em] text-[oklch(82%_0.008_20)]">
      {children}
    </span>
  );
}
