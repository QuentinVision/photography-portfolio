"use client";

import { useContact } from "./ContactProvider";

export default function ContactButton() {
  const { openContact } = useContact();

  return (
    <>
      <button
        onClick={openContact}
        className="contact-button"
        aria-label="Contact me"
      >
        <svg
          className="contact-button__icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </button>

    </>
  );
}
