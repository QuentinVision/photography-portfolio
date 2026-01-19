"use client";

import Image from "next/image";
import { useState } from "react";
import ImageModal, { ModalPhoto } from "./ImageModal";

export type MasonryPhoto = {
  src: string;
  alt?: string;
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
  }));

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
              onClick={() => setActiveIndex(index)}
              aria-label={photo.alt ? `Open ${photo.alt}` : "Open photo"}
            >
              <div className="masonry-grid__media">
                <Image
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  fill
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 50vw, 50vw"
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
