"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 80);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-[1000] w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(22px)" : "blur(0px)",
        boxShadow: visible ? "0 8px 40px oklch(4% 0.01 20 / 0.38)" : "none",
        width: visible ? "min(740px, calc(100% - 32px))" : "100%",
        y: visible ? 14 : 0,
        borderRadius: visible ? 99 : 0,
        background: visible ? "oklch(11% 0.012 20 / 0.9)" : "transparent",
        borderColor: visible ? "oklch(100% 0 0 / 0.11)" : "transparent",
      }}
      transition={{
        type: "tween",
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(
        "relative z-[60] mx-auto hidden h-14 w-full flex-row items-center justify-between self-start border border-transparent px-7 lg:flex",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, visible }) => {
  const [hovered, setHovered] = useState(null);

  const baseColor = visible ? "oklch(62% 0.012 20)" : "oklch(28% 0.025 20)";
  const hoverColor = visible ? "oklch(96% 0.005 20)" : "oklch(17% 0.02 20)";

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn("hidden flex-row items-center gap-7 lg:flex", className)}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          target={item.target}
          rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative font-sans text-[0.90rem] font-bold transition-colors duration-200"
          style={{ color: hovered === idx ? hoverColor : baseColor }}
        >
          {item.name}
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(22px)" : "blur(0px)",
        boxShadow: visible ? "0 8px 40px oklch(4% 0.01 20 / 0.38)" : "none",
        width: visible ? "calc(100% - 32px)" : "100%",
        y: visible ? 12 : 0,
        borderRadius: visible ? 24 : 0,
        background: visible ? "oklch(11% 0.012 20 / 0.9)" : "transparent",
      }}
      transition={{
        type: "tween",
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(
        "relative z-50 mx-auto flex h-14 w-full flex-col items-center justify-center px-5 lg:hidden",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className, visible }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          className={cn(
            "absolute inset-x-4 top-[68px] z-50 flex flex-col gap-1 rounded-2xl border border-[var(--dark-border)] bg-[oklch(13%_0.012_20/0.97)] p-2 backdrop-blur-xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick, visible }) => {
  const color = visible ? "oklch(96% 0.005 20)" : "oklch(17% 0.02 20)";
  return (
    <button
      onClick={onClick}
      aria-label="Menu"
      className="flex flex-col items-end gap-[5px] bg-transparent p-2"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            rotate: isOpen && i === 0 ? 45 : isOpen && i === 2 ? -45 : 0,
            y: isOpen && i === 0 ? 7 : isOpen && i === 2 ? -7 : 0,
            opacity: isOpen && i === 1 ? 0 : 1,
            scaleX: isOpen && i === 1 ? 0 : 1,
            background: color,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="block h-[1.5px] w-[22px] rounded-full"
        />
      ))}
    </button>
  );
};

export const NavbarLogo = ({ visible }) => {
  const color = visible ? "oklch(96% 0.005 20)" : "oklch(17% 0.02 20)";
  return (
    <a
      href="#"
      className="relative z-20 whitespace-nowrap font-serif text-[1.6rem] font-bold italic transition-colors duration-[0.45s]"
      style={{ color }}
    >
      decayla anthony
    </a>
  );
};
