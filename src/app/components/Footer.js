export default function Footer() {
  const items = [
    { name: "Home", link: "#" },
    { name: "Projects", link: "#" },
    {
      name: "Resume",
      link: "https://drive.google.com/file/d/1IDvkZzL66erSWNwpFEM0LobhFfRFzEMW/view?usp=sharing",
      target: "_blank",
    },
    { name: "Contact", link: "mailto:decaylaanthony@gmail.com" },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/decayla-anthony/",
      target: "_blank",
    },
  ];

  return (
    <footer className="w-full bg-black text-white">
      {/* INNER CONTAINER */}
      <div className=" mx-auto px-15 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-white/80"> © 2026 Decayla Anthony</div>

        <div className="flex gap-6 text-sm">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-white/70 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
