"use client";
import UnicornScene from "unicornstudio-react/next";

export default function UnicornWrapper() {
  return (
    <div
      className="relative block w-full"
      style={{ height: "100vh", background: "var(--rose)" }}
    >
      <UnicornScene
        projectId="tErgqHjBHv9B4UAlj8pC"
        width="100%"
        height="100%"
        scale={1}
        dpi={1.5}
        fps={60}
        lazyLoad={false}
        production={true}
      />
      <HeroText />
    </div>
  );
}

function HeroText() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col"
      style={{ fontFamily: "var(--font-instrument), Georgia, serif" }}
    >
      <div className="flex flex-1 items-center justify-center px-6 sm:px-16">
        <h1
          className="text-center text-[var(--dark)] leading-[0.95] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(3.75rem, 11vw, 11rem)",
            fontWeight: 400,
          }}
        >
          decayla
          <br />
          software engineer
        </h1>
      </div>
      <div className="pb-16 text-center text-[var(--dark)] sm:pb-24">
        <p
          className="leading-snug"
          style={{
            fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)",
            fontWeight: 400,
          }}
        >
          recent computer science graduate
        </p>
        <p
          className="leading-snug"
          style={{
            fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)",
            fontWeight: 400,
          }}
        >
          passionate about web and game development
        </p>
      </div>
    </div>
  );
}
