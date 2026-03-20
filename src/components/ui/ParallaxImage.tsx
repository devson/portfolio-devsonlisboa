"use client";

import { useEffect, useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  children?: React.ReactNode;
}

export function ParallaxImage({ src, alt, speed = 0.3, children }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const scrollProgress = rect.top / window.innerHeight;
        const yOffset = scrollProgress * speed * 100;
        image.style.transform = `translate3d(0, ${yOffset}px, 0) scale(1.15)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-[-15%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      {children}
    </div>
  );
}
