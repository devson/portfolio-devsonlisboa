"use client";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export function Marquee({ text, speed = 30, className = "" }: MarqueeProps) {
  const items = Array(6).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap py-6 ${className}`}>
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-editorial text-foreground/[0.04] mx-8 select-none"
          >
            {item}
            <span className="mx-8 text-foreground/[0.08]">·</span>
          </span>
        ))}
      </div>
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-editorial text-foreground/[0.04] mx-8 select-none"
          >
            {item}
            <span className="mx-8 text-foreground/[0.08]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
