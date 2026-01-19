"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ImageModal, { ModalPhoto } from "./ImageModal";

export type MasonryPhoto = {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
  description?: string;
};

type MasonryGridProps = {
  photos: MasonryPhoto[];
  category: string;
};

export default function MasonryGrid({ photos, category }: MasonryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const modalPhotos: ModalPhoto[] = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt ?? "",
    title: photo.title,
    category: photo.category,
    description: photo.description,
  }));

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLButtonElement>(".masonry-grid__item"));
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [photos]);

  return (
    <>
      <div className="masonry-grid" data-category={category}>
        {photos.map((photo, index) => {
          const sizeLabel = "square";
          return (
            <button
              key={`${photo.src}-${index}`}
              className="masonry-grid__item"
              data-size={sizeLabel}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={photo.alt ? `Open ${photo.alt}` : "Open photo"}
            >
              <div className="masonry-grid__media">
                <Image
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  fill
                  loading={index < 3 ? "eager" : "lazy"}
                  priority={index < 3}
                  quality={90}
                  sizes="(max-width: 900px) 100vw, 80vw"
                  className="masonry-grid__image"
                />
              </div>
            </button>
          );
        })}
      </div>
      <ImageModal
        photos={modalPhotos}
        currentIndex={activeIndex ?? 0}
        onNavigate={(nextIndex) => setActiveIndex(nextIndex)}
        isOpen={activeIndex !== null}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
