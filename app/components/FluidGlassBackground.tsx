"use client";

import { useEffect, useRef } from "react";

export default function FluidGlassBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let rafId = 0;
    const update = () => {
      const progress = window.scrollY / Math.max(1, document.body.scrollHeight);
      root.style.setProperty("--scroll-shift", `${progress * 40}px`);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        update();
        rafId = 0;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fluid-glass" aria-hidden="true" ref={rootRef}>
      <div className="fluid-glass__orb-wrap">
        <div className="fluid-glass__orb fluid-glass__orb--1" />
      </div>
      <div className="fluid-glass__orb-wrap">
        <div className="fluid-glass__orb fluid-glass__orb--2" />
      </div>
      <div className="fluid-glass__orb-wrap">
        <div className="fluid-glass__orb fluid-glass__orb--3" />
      </div>
      <div className="fluid-glass__orb-wrap">
        <div className="fluid-glass__orb fluid-glass__orb--4" />
      </div>
      <div className="fluid-glass__overlay" />
      <div className="fluid-glass__gradients" />
    </div>
  );
}
