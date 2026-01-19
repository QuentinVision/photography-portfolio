"use client";

import { useEffect, useState } from "react";

import { useAbout } from "./AboutProvider";
import { useContact } from "./ContactProvider";

export default function GlassNav() {
  const { openAbout } = useAbout();
  const { openContact } = useContact();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`glass-nav${isScrolled ? " glass-nav--scrolled" : ""}`}
      aria-label="Primary"
    >
      <div className="glass-nav__content">
        <a className="glass-nav__logo" href="#top">
          QR
        </a>
        <div className="glass-nav__links">
          <a href="https://www.instagram.com/qwuentinr/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <button type="button" className="glass-nav__link" onClick={openAbout}>
            About
          </button>
          <button
            type="button"
            className="glass-nav__cta"
            onClick={openContact}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
