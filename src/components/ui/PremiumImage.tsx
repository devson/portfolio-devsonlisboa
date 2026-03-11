"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PremiumImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function PremiumImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
}: PremiumImageProps) {
  const [isLoading, setLoading] = useState(true);

  // We are simulating an architectural "blur up" effect.
  // In a real CMS scenario, you would pass `blurDataURL` to next/image.
  // Here, we use a CSS-based approach for the placeholder feel.
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-warm-gray",
        fill ? "absolute inset-0" : "",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        quality={90} // High quality for architectural rendering fidelity
        priority={priority}
        className={cn(
            "object-cover duration-700 ease-crisp",
            isLoading
              ? "scale-105 blur-md grayscale"
              : "scale-100 blur-0 grayscale-0"
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
