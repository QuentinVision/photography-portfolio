"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import ContactModal from "./ContactModal";

type ContactContextValue = {
  openContact: () => void;
  closeContact: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return context;
}

export default function ContactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      openContact,
      closeContact,
    }),
    [openContact, closeContact],
  );

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContact} />
    </ContactContext.Provider>
  );
}
