"use client";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    category: "Web Development",
    categoryColor: "border-violet-400 text-violet-600 bg-violet-50",
    buttonColor: "bg-violet-200 text-violet-700 hover:bg-violet-300",
    imageBg: "bg-violet-50",
    shadowColor: "#7D6FA1",
    image: "/images/portfolioWeb.png",
    title: "Portfolio Website v1.0.2",
    description:
      "Designed and developed a modern portfolio featuring a fully responsive layout, an animated header, and interactive UI elements. Includes a resizeable navigation bar and project modals to showcase work in a clean, engaging format. ",
    overview:
      "This project is the second, modernized, version of my portfolio built to showcase my work and skills in a more polished, concise, way. I used Tailwind CSS for styling, Unicorn Studio to create a dynamin animated header, and Aceternity UI components for the navigation bar. Each project is displayed through a modal system that allows for more detailed descriptions without cluttering the main layout.",
    href: "#",
    stack: [
      "Next.js",
      "React",
      "CSS",
      "JavaScript",
      "Git",
      "Tailwind",
      "Unicorn Studio",
      "Aceternity",
    ],
    width: "col-span-2",
  },
  {
    category: "Web Development",
    categoryColor: "border-violet-400 text-violet-600 bg-violet-50",
    buttonColor: "bg-violet-200 text-violet-700 hover:bg-violet-300",
    imageBg: "bg-violet-50",
    shadowColor: "#7D6FA1",
    image: "/images/blog.png",
    title: "Windows 98 Simulation",
    description:
      "Built an interactive blog page that recreates a Windows 98-style desktop experience. This page features draggable and resizeable application windows, a taskbar with minimize and restore behavior, interactable desktop icons, a snake game, and a replica of Paint for user engagement.",
    overview:
      "This project is part of a retro-inspired personal website built with Next.js and React. I built the blog page of my website to mimic the windows 98 desktop. This page features apps that open, windows that can be dragged and resized, a very simplified version of the snake game, and a replica of the classic Paint application to give visitors something to do.",
    href: "https://decoraline.neocities.org/blog ",
    stack: ["Next.js", "React", "CSS", "JavaScript", "Git"],
  },
  {
    category: "Game Development",
    categoryColor: "border-mauve-400 text-mauve-600 bg-mauve-50",
    buttonColor: "bg-mauve-200 text-mauve-700 hover:bg-mauve-300",
    imageBg: "bg-mauve-50",
    shadowColor: "#BA8A94",
    image: "/images/game screenshots/Farming System/Farming.png",
    title: "Restaurant Life in Aurelia",
    description:
      "RLIA is a game I'm working on based on the farming game Stardew Valley with a few mysteries to solve! I got the idea from the Isekai anime genre. In Isekai anime's, the protagonist gets transported to a new world where they will usually have some kind of overpowered ability, and a mission to work towards.",
    overview:
      "In RLIA, the player character wakes up in an unknown house in a place called Aurelia. They don't have any memory of who they are, or how they got there. While they try to regain their memory, they decide to start working at a nearby restaurant that has been closed since the owner went missing! The player will be able to serve customers with food made from the produce they grow in their farm, or use products bought from the local store for slighty lower quality meals. Join them on their journey of figuring out what happened to the missing restaurant owner, and rediscovering who they were in their past life!",
    href: "#",
    stack: ["Unity", "C#", "Git"],
  },
  {
    category: "Web Development",
    categoryColor: "border-violet-400 text-violet-600 bg-violet-50",
    buttonColor: "bg-violet-200 text-violet-700 hover:bg-violet-300",
    imageBg: "bg-violet-50",
    shadowColor: "#7D6FA1",
    image: "/images/review-page.png",
    title: "Book Reviews Website",
    description:
      "Created a responsive book review page in React that uses useMemo to generate dynamic genre filters from book data and useState to manage active genres, ratings, and grid/list view switching.",
    overview:
      "This project is part of a retro-inspired personal website built with Next.js and React. It stores book data in a consistent model and offers filtering by genre and rating. Users can switch between a grid and list view; each card includes the book cover, information about the book, star ratings, and an expandable review. The layout emphasizes maintainability with the useMemo Hook.",
    href: "https://decoraline.neocities.org/reviews-books",
    stack: ["Next.js", "React", "CSS", "JavaScript", "Git"],
    width: "col-span-2",
  },
  {
    category: "Web Development",
    categoryColor: "border-violet-400 text-violet-600 bg-violet-50",
    buttonColor: "bg-violet-200 text-violet-700 hover:bg-violet-300",
    imageBg: "bg-violet-50",
    shadowColor: "#7D6FA1",
    image: "/images/neocities.png",
    title: "Neocities Style Personal Website",
    description:
      "Built a responsive, homepage in Next.js with a reusable sidebar navigation and small modular widgets, demonstrating clean layout patterns and data driven UI.",
    overview:
      "This project is part of a retro-inspired personal website built with Next.js and React. This site organizes content into a three-column layout: a left sidebar, a central column for the main content of the website, and a right sidebar. Each column consisting of content that shows off my personality and creativity with some fun interactive iframes/widgets for visitors. The design features reusable components making the site easy to maintain and expand upon.",
    href: "https://decoraline.neocities.org/home",
    stack: ["Next.js", "React", "CSS", "JavaScript", "Git"],
    width: "col-span-2",
  },
  {
    category: "Web Development",
    categoryColor: "border-violet-400 text-violet-600 bg-violet-50",
    buttonColor: "bg-violet-200 text-violet-700 hover:bg-violet-300",
    imageBg: "bg-violet-50",
    shadowColor: "#7D6FA1",
    image: "/images/landingPage.png",
    title: "Interavtive Nintendo DS Style Landing Page",
    description:
      "Built an interactive Nintendo DS style landing page for my personal website using Next.js + React. I used useState to implement a three-state UI, the closed nintendo, the open nintendo with a splash screen, and the menu that shows the cartridges.",
    overview:
      "This project is part of a retro-inspired personal website built with Next.js and React, designed to evoke feelings of nostalgia. The site features an interactive Nintendo DS-style interface where users can open the console, and navigate through the website either by using the cartridges or the navigation bar on the homepage. I implemented ifrrames for embedded content and crafted smooth transitions.",
    href: "https://decoraline.neocities.org ",
    stack: ["Next.js", "React", "CSS", "JavaScript", "Git"],
  },
];

export default function ProjectCards() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => {
    setSelectedIndex(index);
    setSelectedProject(projects[index]);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const goNext = () => {
    const nextIndex = (selectedIndex + 1) % projects.length;
    setSelectedIndex(nextIndex);
    setSelectedProject(projects[nextIndex]);
  };

  const goPrev = () => {
    const prevIndex = (selectedIndex - 1 + projects.length) % projects.length;

    setSelectedIndex(prevIndex);
    setSelectedProject(projects[prevIndex]);
  };

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-[1600] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className={`flex flex-col ${project.width}`}>
            {/* <div
              className={`self-start mb-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest ${project.categoryColor}`}
            >
              {project.category}
            </div> */}

            <div
              className={`card-ring rounded-2xl border border-gray-200 bg-white flex flex-col flex-1 transition-transform duration-300 hover:scale-[1.02]`}
              style={{
                boxShadow: `0 4px 20px -2px ${project.shadowColor}40`,
                "--ring-color": project.shadowColor,
              }}
            >
              <div className="rounded-2xl overflow-hidden flex flex-col flex-1">
                <div className={`relative h-64 w-full ${project.imageBg}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-fit object-cover object-top"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="mt-4 flex w-full items-center justify-between">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setClickPosition({
                          x: rect.left + rect.width / 2,
                          y: rect.top + rect.height / 2,
                        });

                        openModal(idx);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition ${project.buttonColor}`}
                    >
                      Learn More
                    </button>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg font-medium transition ${project.buttonColor} inline-block text-center`}
                    >
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {selectedProject && (
          <Modal
            key="modal"
            project={selectedProject}
            onClose={closeModal}
            onNext={goNext}
            onPrev={goPrev}
            clickPosition={clickPosition}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
