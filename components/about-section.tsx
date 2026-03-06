"use client";

import { Code, Zap, Brain, Database } from "lucide-react";
import { aboutData } from "@/lib/portfolio-data";
import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";

const iconMap = {
  Code,
  Zap,
  Brain,
  Database,
};

interface AboutSectionProps {
  data?: typeof aboutData;
}

export function AboutSection({ data = aboutData }: AboutSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const accumulatorRef = useRef(0);

  const animate = useCallback(() => {
    const el = scrollRef.current;
    if (el && !isPausedRef.current) {
      // Accumulate fractional pixels, apply only whole pixels
      accumulatorRef.current += 0.2;
      if (accumulatorRef.current >= 1) {
        const px = Math.floor(accumulatorRef.current);
        accumulatorRef.current -= px;
        el.scrollLeft += px;
      }
      // When we've scrolled past the first set of items, loop back
      const halfScroll = el.scrollWidth / 2;
      if (el.scrollLeft >= halfScroll) {
        el.scrollLeft -= halfScroll;
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  const handleInteractionStart = () => {
    isPausedRef.current = true;
  };

  const handleInteractionEnd = () => {
    // Resume after a short delay so the user's scroll settles
    setTimeout(() => {
      isPausedRef.current = false;
    }, 2000);
  };

  return (
    <div className="space-y-8 md:space-y-10">
      {/* About Me */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          About Me
        </h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          {data.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* What I'm Doing */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          What I'm Doing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            if (!IconComponent) return null;
            return (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors opacity-80"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <IconComponent
                    className="w-full h-full text-accent"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clients with scrollable auto-marquee */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Professional Experience
        </h3>

        <div
          ref={scrollRef}
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          className="flex gap-4 md:gap-6 py-4 overflow-x-auto scrollbar-hide"
        >
          {[...data.clients, ...data.clients].map((client, index) => (
            <a
              key={index}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 bg-secondary rounded-xl md:rounded-2xl border border-border flex items-center justify-center p-4 md:p-6 hover:border-accent transition-colors opacity-90 hover:opacity-100"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={110}
                height={46}
                sizes="(max-width: 768px) 128px, 160px"
                className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
