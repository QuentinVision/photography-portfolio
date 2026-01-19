"use client";

import { useContact } from "./ContactProvider";

type InstagramCTAProps = {
  id?: string;
};

export default function InstagramCTA({ id }: InstagramCTAProps) {
  const { openContact } = useContact();

  return (
    <section
      className="social-section"
      aria-labelledby="social-section-title"
      id={id}
    >
      <div className="social-card">
        <p id="social-section-title" className="social-card__label">
          Follow my work
        </p>
        <h2 className="social-card__handle">@qwuentinr</h2>
        <div className="social-card__actions">
          <a
            className="glass-button"
            href="https://www.instagram.com/qwuentinr/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Instagram profile in a new tab"
          >
            <span className="glass-button__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img" focusable="false">
                <path
                  d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 10.5Zm5.25-2.75a1.05 1.05 0 1 1-1.05-1.05 1.05 1.05 0 0 1 1.05 1.05Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>Instagram</span>
          </a>
          <button
            type="button"
            className="glass-button glass-button--contact"
            onClick={openContact}
            aria-label="Open contact form"
          >
            <span>Contact</span>
          </button>
        </div>
      </div>
    </section>
  );
}
