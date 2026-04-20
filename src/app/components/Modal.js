"use client";
import { motion } from "framer-motion";
import "../styles/Modal.css";

const Modal = ({ onClose, project, onNext, onPrev, clickPosition }) => {
  return (
    <motion.div
      className="modal-wrapper"
      initial={{
        clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
      }}
      animate={{
        clipPath: `circle(150vw at ${clickPosition.x}px ${clickPosition.y}px)`,
      }}
      exit={{
        clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="modal-content">
        {/* CLOSE BUTTON */}
        {/* <button onClick={onClose} className="close-button">
          &times;
        </button> */}

        {/* PAGE CONTENT */}
        <div className="space-y-12">
          {/* HERO SECTION */}
          <section>
            <p className="text-sm uppercase tracking-widest text-black-500">
              {project.category}
            </p>

            <h1 className="text-4xl font-bold mt-2">{project.title}</h1>

            <p className="text-lg text-gray-600 mt-4">{project.subtitle}</p>
          </section>

          {/* IMAGE SECTION */}
          <section>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto rounded-lg object-cover object-top"
            />
          </section>

          {/* DESCRIPTION SECTION */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{project.overview}</p>
          </section>

          {/* STACK SECTION */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>

            <div className="flex flex-wrap gap-2 mt-2">
              {project.stack?.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* LINKS SECTION */}
          <div className="flex justify-between mt-10">
            <section className="flex gap-4 pt-4">
              {project.href && project.href !== "#" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  Visit Site
                </a>
              )}

              <button onClick={onClose} className="px-4 py-2 border rounded-lg">
                Close
              </button>
            </section>

            <section className="flex gap-4 pt-4">
              <button onClick={onPrev} className="px-4 py-2 rounded-lg border">
                ← Previous
              </button>

              <button onClick={onNext} className="px-4 py-2 rounded-lg border">
                Next →
              </button>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
