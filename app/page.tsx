import Image from "next/image";

import FluidGlassBackground from "./components/FluidGlassBackground";
import GlassNav from "./components/GlassNav";
import InstagramCTA from "./components/InstagramCTA";
import MasonryGrid from "./components/MasonryGrid";

const photoSources = [
  "/photos/E1.jpg",
  "/photos/E2.jpg",
  "/photos/E3.jpg",
  "/photos/C1.jpg",
  "/photos/C2.jpg",
  "/photos/C3.jpg",
  "/photos/A1.jpg",
  "/photos/A2.jpg",
  "/photos/A3.jpg",
  "/photos/Ax1.jpg",
  "/photos/Ax2.jpg",
  "/photos/Ax3.jpg",
  "/photos/Bx1.jpg",
  "/photos/Bx2.jpg",
  "/photos/Bx3.jpg",
  "/photos/FR1.jpg",
  "/photos/FR2.jpg",
  "/photos/FR3.jpg",
  "/photos/FR4.jpg",
  "/photos/T1.jpg",
  "/photos/T2.jpg",
  "/photos/N0.jpg",
  "/photos/N1.jpg",
  "/photos/N2.jpg",
  "/photos/Axb1.jpg",
  "/photos/Acb2.jpg",
  "/photos/Event1.jpg",
  "/photos/Event2.jpg",
  "/photos/Event3.jpg",
  "/photos/Event4.jpg",
  "/photos/Defile1.jpg",
  "/photos/Defile2.jpg",
  "/photos/Defile3.jpg",
  "/photos/T3.jpg",
];

const formatTitle = (src: string) => {
  const filename = src.split("/").pop() ?? src;
  const base = filename.replace(/\.[^/.]+$/, "");
  return base
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .trim();
};

const getCategory = (src: string) => {
  const name = (src.split("/").pop() ?? "").toLowerCase();
  if (name.startsWith("event")) return "Event";
  if (name.startsWith("defile")) return "Runway";
  if (name.startsWith("fr")) return "Editorial";
  if (name.startsWith("t")) return "Studio";
  if (name.startsWith("n")) return "Portrait";
  if (name.startsWith("c")) return "Portrait";
  if (name.startsWith("b")) return "Fashion";
  if (name.startsWith("a")) return "Portrait";
  if (name.startsWith("e")) return "Editorial";
  return "Portrait";
};

const buildDescription = (title: string, category: string) =>
  `A ${category.toLowerCase()} capture from Quentin's portfolio.`;

const photos = photoSources.map((src) => {
  const title = formatTitle(src);
  const category = getCategory(src);
  return {
    src,
    alt: title,
    title,
    category,
    description: buildDescription(title, category),
  };
});

export default function Home() {
  return (
    <main className="site" id="top">
      <FluidGlassBackground />
      <GlassNav />
      <section className="hero" id="about">
        <div className="hero__background" aria-hidden="true">
          <Image
            src="/photos/background.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero__bg-image"
          />
        </div>
        <div className="hero__content">
          <h1 className="hero__name">QUENTIN</h1>
          <p className="hero__subtitle">Portrait Photographer</p>
          <p className="hero__description">
            Capturing memories for models, brands and events.
            <br />
            Based in Paris.
          </p>
          <div className="hero__scroll" aria-hidden="true">
            <span>Scroll</span>
            <span className="hero__arrow" />
          </div>
        </div>
      </section>
      <InstagramCTA />
      <section className="gallery" id="work">
        <div className="gallery__inner">
          <MasonryGrid photos={photos} category="portfolio" />
        </div>
      </section>
      <InstagramCTA id="contact" />
    </main>
  );
}
