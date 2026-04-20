"use client";
import { motion } from "framer-motion";
import "../styles/Modal.css";
import { useEffect } from "react";

const Modal = ({ onClose, project, onNext, onPrev, clickPosition }) => {
  // lock background scroll + ESC close
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-wrapper"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <section>
            <p className="category">{project.category}</p>

            <h1>{project.title}</h1>

            <p className="subtitle">{project.subtitle}</p>
          </section>

          <section>
            <img
              src={project.image}
              alt={project.title}
              className="modal-image"
            />
          </section>

          <section>
            <h2>Overview</h2>
            <p>{project.overview}</p>
          </section>

          <section>
            <h2>Tech Stack</h2>

            <div className="stack">
              {project.stack?.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <div className="left-buttons">
            {project.href && project.href !== "#" && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className=" pill-btn visit-btn"
              >
                Visit Site
              </a>
            )}

            <button onClick={onClose} className="pill-btn close-btn">
              Close
            </button>
          </div>

          <div className="right-buttons">
            <button onClick={onPrev} className="pill-btn">
              ← Previous
            </button>
            <button onClick={onNext} className="pill-btn">
              Next →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
