"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import AboutModal from "./AboutModal";

type AboutContextValue = {
  openAbout: () => void;
  closeAbout: () => void;
};

const AboutContext = createContext<AboutContextValue | null>(null);

export function useAbout() {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error("useAbout must be used within AboutProvider");
  }
  return context;
}

export default function AboutProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openAbout = useCallback(() => setIsOpen(true), []);
  const closeAbout = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      openAbout,
      closeAbout,
    }),
    [openAbout, closeAbout]
  );

  return (
    <AboutContext.Provider value={value}>
      {children}
      <AboutModal isOpen={isOpen} onClose={closeAbout} />
    </AboutContext.Provider>
  );
}
