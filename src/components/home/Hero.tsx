"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Display, BodyText } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

interface HeroProps {
  content: Record<string, string>;
}

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, -rect.top / rect.height);

        // Background: slowest layer (moves up slowly + slight zoom)
        if (bgRef.current) {
          const bgY = progress * 80;
          const scale = 1.1 + progress * 0.1;
          bgRef.current.style.transform = `translate3d(0, ${bgY}px, 0) scale(${scale})`;
        }

        // Text: medium speed (moves up faster + fades)
        if (textRef.current) {
          const textY = progress * -120;
          const opacity = Math.max(0, 1 - progress * 1.8);
          textRef.current.style.transform = `translate3d(0, ${textY}px, 0)`;
          textRef.current.style.opacity = `${opacity}`;
        }

        // Buttons: fastest layer (disappear first)
        if (buttonsRef.current) {
          const btnY = progress * -180;
          const opacity = Math.max(0, 1 - progress * 2.5);
          buttonsRef.current.style.transform = `translate3d(0, ${btnY}px, 0)`;
          buttonsRef.current.style.opacity = `${opacity}`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const heroImage = content.hero_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop";
  const heroVideo = content.hero_video || "";
  const hasVideo = heroVideo && heroVideo.length > 5;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end pb-24 px-6 md:px-12 -mt-24 md:-mt-32 overflow-hidden"
    >
      {/* Background Layer - Slowest parallax */}
      <div ref={bgRef} className="absolute inset-[-15%] will-change-transform">
        {hasVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Projetos de Arquitetura Devson Lisboa"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-obsidian/90 via-black-obsidian/40 to-black-obsidian/10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12 text-off-white">

        {/* Text Layer - Medium parallax */}
        <div ref={textRef} className="max-w-3xl will-change-transform">
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

        {/* Buttons Layer - Fastest parallax */}
        <div ref={buttonsRef} className="md:w-auto will-change-transform">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="font-sans text-[10px] uppercase tracking-widest text-off-white">Scroll</span>
        <div className="w-[1px] h-8 bg-off-white/40 animate-pulse" />
      </div>
    </section>
  );
}
