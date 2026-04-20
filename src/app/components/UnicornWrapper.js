"use client";
import UnicornScene from "unicornstudio-react/next";

export default function UnicornWrapper() {
  return (
    <UnicornScene
      projectId="VIHBqP1DHcPofDoYf3Ox"
      width="100vw"
      height="100vh"
      scale={1}
      dpi={1.5}
      fps={60}
      lazyLoad={true}
      production={true}
    />
  );
}
