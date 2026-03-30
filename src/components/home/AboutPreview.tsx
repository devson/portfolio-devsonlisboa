"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, BodyText, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

interface AboutPreviewProps {
  content: Record<string, string>;
}

export function AboutPreview({ content }: AboutPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentDrawnFrameRef = useRef(-1);
  const [reducedMotion, setReducedMotion] = useState(false);

  const FRAME_COUNT = 31;

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
        img.src = `/api/img_visao/ezgif-frame-${frameNumber}.jpg`;
        
        img.onload = () => {
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
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        
        // intersection scroll math
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculates how deep the element is inside the viewport
        const distanceScrolledIntoView = windowHeight - elementTop;
        const totalScrollableDistance = windowHeight + elementHeight;
        
        let progress = distanceScrolledIntoView / totalScrollableDistance;
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

  return (
    <section className="py-24 px-6 md:px-12 bg-black-obsidian text-off-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <Reveal className="relative aspect-[3/4] w-full max-w-md mx-auto md:ml-0 overflow-hidden">
            <div ref={containerRef} className="absolute inset-0 w-full h-full">
              {/* Fallback persistent frame */}
              <div
                className="absolute inset-0 bg-cover bg-center -z-10 grayscale contrast-125 object-cover"
                style={{ backgroundImage: "url(/api/img_visao/ezgif-frame-001.jpg)" }}
              />

              {!reducedMotion && (
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 z-0"
                />
              )}
            </div>
            
            {/* Decal Border overlay */}
            <div className="absolute inset-0 border border-off-white/10 m-4 pointer-events-none z-[1]" />
          </Reveal>
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2">
          <Reveal>
            <Label className="mb-6 block text-off-white/40">
              {content.about_label || "Visão"}
            </Label>
            <Heading className="mb-8 leading-snug">
              {content.about_quote || "Arquitetura não é sobre preencher espaços. É sobre narrar o vazio."}
            </Heading>
          </Reveal>
          
          <Reveal delay={0.2}>
            <BodyText className="text-off-white/70 mb-12">
              {content.about_description || ""}
            </BodyText>
          </Reveal>

          <Reveal delay={0.3}>
             <Button href="/sobre" variant="outline" className="border-off-white/30 text-off-white hover:border-off-white/100">
               {content.about_cta_text || "Conhecer a Metodologia"}
             </Button>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
