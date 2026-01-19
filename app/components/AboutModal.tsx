"use client";

import Image from "next/image";

import { useContact } from "./ContactProvider";

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const { openContact } = useContact();

  if (!isOpen) return null;

  const handleContact = () => {
    onClose();
    openContact();
  };

  return (
    <div className="about-modal" onClick={onClose}>
      <div
        className="about-modal__panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
      >
        <div className="about-modal__header">
          <h2 id="about-modal-title" className="about-modal__title">
            About
          </h2>
          <button
            onClick={onClose}
            className="about-modal__close"
            aria-label="Close"
            type="button"
          >
            <svg
              className="about-modal__close-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="about-modal__content">
          <div className="about-modal__portrait">
            <Image
              src="/photos/portrait.jpg"
              alt="Portrait of Quentin Rigaud"
              fill
              sizes="120px"
              priority
            />
          </div>

          <div className="about-modal__copy">
            <h3 className="about-modal__headline">
              Portrait Photographer
              <span>Based in Paris</span>
            </h3>
            <p className="about-modal__body">
              I create editorial portraits for models, brands, and creative
              teams. Specializing in outdoor sessions throughout Paris, I
              capture moments where architecture meets human expression,
              creating images that feel both elegant and timeless.
            </p>
            <p className="about-modal__services">
              Portraits · Model Portfolios · Brand Campaigns · Events
            </p>
          </div>
        </div>

        <div className="about-modal__footer">
          <p className="about-modal__closing">Let&apos;s create something together.</p>
          <button
            type="button"
            className="about-modal__cta"
            onClick={handleContact}
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
}
