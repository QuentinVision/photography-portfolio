import FluidGlassBackground from "./components/FluidGlassBackground";
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

const photos = photoSources.map((src) => ({
  src,
  alt: "",
}));

export default function Home() {
  return (
    <main className="site">
      <FluidGlassBackground />
      <section className="hero">
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
      <section className="gallery">
        <div className="gallery__inner">
          <InstagramCTA />
          <MasonryGrid photos={photos} category="portfolio" />
          <InstagramCTA />
        </div>
      </section>
    </main>
  );
}
