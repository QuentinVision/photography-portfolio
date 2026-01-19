"use client";

import { FormEvent, useEffect, useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");

  useEffect(() => {
    if (!isOpen) {
      setFormState("idle");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xnjjvljr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormState("success");
        form.reset();
        setTimeout(() => {
          onClose();
          setFormState("idle");
        }, 2000);
      } else {
        setFormState("error");
      }
    } catch (error) {
      setFormState("error");
    }
  };

  return (
    <div className="contact-modal" onClick={onClose}>
      <div
        className="contact-modal__panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="contact-modal__header">
          <h2 id="contact-modal-title" className="contact-modal__title">
            Contact Me
          </h2>
          <button
            onClick={onClose}
            className="contact-modal__close"
            aria-label="Close"
          >
            <svg
              className="contact-modal__close-icon"
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

        <form onSubmit={handleSubmit} className="contact-form">
          <label className="contact-form__field">
            <span className="contact-form__label">Name</span>
            <input
              type="text"
              name="name"
              required
              className="contact-form__input"
              placeholder="Your name"
            />
          </label>

          <label className="contact-form__field">
            <span className="contact-form__label">Email</span>
            <input
              type="email"
              name="email"
              required
              className="contact-form__input"
              placeholder="your@email.com"
            />
          </label>

          <label className="contact-form__field">
            <span className="contact-form__label">Message</span>
            <textarea
              name="message"
              required
              rows={4}
              className="contact-form__textarea"
              placeholder="Tell me about your project..."
            />
          </label>

          <button
            type="submit"
            disabled={formState === "submitting"}
            className="contact-form__submit"
          >
            {formState === "submitting" && "Sending..."}
            {formState === "success" && "✓ Sent!"}
            {formState === "error" && "Error - Try again"}
            {formState === "idle" && "Send Message"}
          </button>
        </form>

        {formState === "success" && (
          <p className="contact-form__status contact-form__status--success">
            Thanks! I&apos;ll get back to you soon.
          </p>
        )}

        {formState === "error" && (
          <p className="contact-form__status contact-form__status--error">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
