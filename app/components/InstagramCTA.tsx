"use client";

import { useContact } from "./ContactProvider";

export default function InstagramCTA() {
  const { openContact } = useContact();

  return (
    <>
      <section className="instagram-cta" aria-labelledby="instagram-cta-title">
        <div className="instagram-cta__content">
          <p id="instagram-cta-title" className="instagram-cta__title">
            Follow my work
          </p>
          <p className="instagram-cta__handle">@qwuentinr</p>
          <div className="instagram-cta__actions">
            <a
              className="instagram-cta__button"
              href="https://www.instagram.com/qwuentinr/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Instagram profile in a new tab"
            >
              <span className="instagram-cta__button-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" focusable="false">
                  <path
                    d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 10.5Zm5.25-2.75a1.05 1.05 0 1 1-1.05-1.05 1.05 1.05 0 0 1 1.05 1.05Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="instagram-cta__button-text">Instagram</span>
            </a>
            <button
              type="button"
              className="instagram-cta__button instagram-cta__button--contact"
              onClick={openContact}
              aria-label="Open contact form"
            >
              <span className="instagram-cta__button-text">Contact</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
