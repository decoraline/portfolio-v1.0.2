"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CarouselLayout } from "./CarouselLayout";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./Reveal";
import { PROJECTS } from "../data/projects";

export function ProjectsSection() {
  const [active, setActive] = useState(null);
  const idx = active ? PROJECTS.findIndex((p) => p.id === active.id) : -1;

  const goPrev = () =>
    setActive(PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]);
  const goNext = () => setActive(PROJECTS[(idx + 1) % PROJECTS.length]);

  return (
    <>
      <section
        id="projects"
        className="mx-auto w-full max-w-[1200px] px-5 pb-16 pt-16 sm:px-16 sm:pb-20 sm:pt-16"
      >
        <Reveal
          as="div"
          className="mb-12 flex items-baseline justify-between border-b border-[var(--dark-border)] pb-6"
        >
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold italic tracking-[-0.02em] text-[var(--text-inv)]">
            Projects
          </h2>
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {PROJECTS.length} projects
          </span>
        </Reveal>

        <CarouselLayout projects={PROJECTS} onOpen={setActive} />

        <FeaturedProject project={PROJECTS[0]} onOpen={setActive} />
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            key="modal-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProjectModal
              project={active}
              projects={PROJECTS}
              onClose={() => setActive(null)}
              onPrev={goPrev}
              onNext={goNext}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
