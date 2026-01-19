"use client";

import Image from "next/image";
import type { TouchEvent } from "react";
import { useEffect, useRef, useState } from "react";

export type ModalPhoto = {
  src: string;
  alt: string;
};

type ImageModalProps = {
  photos: ModalPhoto[];
  currentIndex: number;
  onNavigate: (nextIndex: number) => void;
  isOpen: boolean;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 60;
const MAX_ZOOM = 3;
const MIN_ZOOM = 1;

export default function ImageModal({
  photos,
  currentIndex,
  onNavigate,
  isOpen,
  onClose,
}: ImageModalProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [startDistance, setStartDistance] = useState<number | null>(null);
  const [startZoom, setStartZoom] = useState(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const transitionTimer = useRef<number | null>(null);

  const photo = photos[currentIndex] ?? null;

  const total = photos.length;
  const canNavigate = total > 1;

  const handleNavigate = (direction: "next" | "prev") => {
    if (!canNavigate) return;
    const delta = direction === "next" ? 1 : -1;
    const nextIndex = (currentIndex + delta + total) % total;
    onNavigate(nextIndex);
  };

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  const resetInteraction = () => {
    setZoom(1);
    setStartDistance(null);
    setStartZoom(1);
    touchStart.current = null;
  };
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") handleNavigate("next");
      if (event.key === "ArrowLeft") handleNavigate("prev");
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, onNavigate, currentIndex, total]);

  useEffect(() => {
    if (!isOpen) return;
    setIsTransitioning(true);
    resetInteraction();
    if (transitionTimer.current) {
      window.clearTimeout(transitionTimer.current);
    }
    transitionTimer.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 260);

    return () => {
      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, [currentIndex, isOpen]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) {
      touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    if (event.touches.length === 2) {
      const a = event.touches.item(0);
      const b = event.touches.item(1);
      if (!a || !b) return;
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      setStartDistance(distance);
      setStartZoom(zoom);
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && startDistance) {
      event.preventDefault();
      const a = event.touches.item(0);
      const b = event.touches.item(1);
      if (!a || !b) return;
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const nextZoom = clamp((distance / startDistance) * startZoom, MIN_ZOOM, MAX_ZOOM);
      setZoom(nextZoom);
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    if (event.touches.length > 0 || startDistance) {
      if (event.touches.length === 0) {
        setStartDistance(null);
      }
      return;
    }
    const { x, y } = touchStart.current;
    const endTouch = event.changedTouches[0];
    const deltaX = endTouch.clientX - x;
    const deltaY = endTouch.clientY - y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absY > absX && deltaY > SWIPE_THRESHOLD) {
      onClose();
    } else if (absX > absY && absX > SWIPE_THRESHOLD) {
      if (deltaX < 0) handleNavigate("next");
      if (deltaX > 0) handleNavigate("prev");
    }
    touchStart.current = null;
  };

  if (!isOpen || !photo) return null;

  return (
    <div className="image-modal" role="dialog" aria-modal="true">
      <button className="image-modal__backdrop" onClick={onClose} aria-label="Close" />
      <div className="image-modal__content">
        <button className="image-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {canNavigate && (
          <>
            <button
              className="image-modal__nav image-modal__nav--prev"
              onClick={() => handleNavigate("prev")}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="image-modal__nav image-modal__nav--next"
              onClick={() => handleNavigate("next")}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
        <div
          className={`image-modal__image${isTransitioning ? " is-transitioning" : ""}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="image-modal__image-inner" style={{ transform: `scale(${zoom})` }}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="95vw"
              quality={90}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
