"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Display, BodyText } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

interface HeroProps {
  content: Record<string, string>;
}

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentDrawnFrameRef = useRef(-1);
  const [reducedMotion, setReducedMotion] = useState(false);

  const FRAME_COUNT = 103;

  const drawFrame = (index: number) => {
    if (!canvasRef.current || !framesRef.current[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const img = framesRef.current[index];

    if (!ctx || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    currentDrawnFrameRef.current = index;
  };

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(isReduced);

    if (isReduced) return;

    // Preload images
    const loadImages = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, "0");
        img.src = `/api/imgB/ezgif-frame-${frameNumber}.jpg`;
        
        img.onload = () => {
          // Whenever an image loads, check if it's the one we are supposed to be showing right now
          if (i - 1 === targetFrameRef.current) {
            drawFrame(i - 1);
          }
        };
        
        framesRef.current.push(img);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        
        // window.scrollY represents exactly how much the user has scrolled from the very top
        const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        const maxScroll = window.innerHeight * 0.5; // Reduced multiplier to increase animation speed
        
        let progress = scrollY / maxScroll;
        progress = Math.min(Math.max(progress, 0), 1);
        
        const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));
        targetFrameRef.current = frameIndex;
        
        if (currentDrawnFrameRef.current !== frameIndex) {
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  const heroImage = content.hero_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-end pb-24 px-6 md:px-12 -mt-24 md:-mt-32"
    >
      {/* Background Animated Layer - Z-Index 0 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black-obsidian">
        
        {/* Fallback frame ALWAYS behind the canvas for seamless start (transparent) */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ 
            backgroundImage: "url(/api/imgB/ezgif-frame-001.jpg)" 
          }}
        />

        {!reducedMotion && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        
        {/* Gradient overlay for readability - Lighter so the background is more visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-obsidian/60 via-black-obsidian/20 to-transparent z-[1] pointer-events-none" />
      </div>

      {/* Content Container - Z-Index 2 or higher */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12 text-off-white">
        {/* Text Layer - Fixed Parallax (No Scroll Transform) */}
        <div className="max-w-3xl">
          <Reveal delay={0.2} direction="up">
            <span className="font-sans text-xs uppercase tracking-wide-editorial opacity-80 mb-6 block drop-shadow-sm">
              {content.hero_subtitle || "Arquiteto, Artista Visual, IA para Arquitetura"}
            </span>
          </Reveal>

          <Reveal delay={0.4} direction="up">
            <Display as="h1" className="mb-6 drop-shadow-md">
              {content.hero_title || "Narrativas espaciais, rigor estético."}
            </Display>
          </Reveal>

          <Reveal delay={0.6} direction="up">
            <BodyText className="text-off-white/80 max-w-xl drop-shadow-md">
              {content.hero_description || "Projetos que traduzem a ambição da sua marca corporativa ou do seu empreendimento em arquitetura de alto valor percebido."}
            </BodyText>
          </Reveal>
        </div>

        {/* Buttons Layer - Fixed Parallax */}
        <div className="md:w-auto">
          <Reveal delay={0.8} direction="up">
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <Button
                  href="/projetos"
                  variant="outline"
                  className="border-off-white/30 text-off-white hover:border-off-white/100 hover:bg-off-white/5 backdrop-blur-sm"
                  icon
                >
                  {content.hero_cta_primary_text || "Ver Portfólio"}
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  href="/contato"
                  className="bg-off-white text-black-obsidian hover:bg-off-white/90"
                >
                  {content.hero_cta_secondary_text || "Iniciar Conversa"}
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator - Z-index 10 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="font-sans text-[10px] uppercase tracking-widest text-off-white">Scroll</span>
        <div className="w-[1px] h-8 bg-off-white/40 animate-pulse" />
      </div>
    </section>
  );
}
