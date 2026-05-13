"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

const NAV_ITEMS = [
  { name: "Projects", link: "#projects" },
  {
    name: "Resume",
    link: "https://drive.google.com/file/d/1IDvkZzL66erSWNwpFEM0LobhFfRFzEMW/view?usp=sharing",
    target: "_blank",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/decayla-anthony/",
    target: "_blank",
  },
  { name: "Contact", link: "#contact" },
];

export function SiteNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={NAV_ITEMS} />
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((o) => !o)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-xl px-5 py-3 font-sans text-[0.95rem] font-normal text-[var(--text-inv)] transition-colors hover:bg-white/10 z-[]"
            >
              {item.name}
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
