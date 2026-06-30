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
  const lastTimeRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const animate = useCallback((now: number) => {
    const el = scrollRef.current;
    if (el && !isPausedRef.current) {
      // Advance by elapsed time so speed is identical on 60Hz and 120Hz displays.
      const dt = lastTimeRef.current ? Math.min(now - lastTimeRef.current, 64) : 16;
      accumulatorRef.current += dt * 0.012; // ~12px/sec
      if (accumulatorRef.current >= 1) {
        const px = Math.floor(accumulatorRef.current);
        accumulatorRef.current -= px;
        el.scrollLeft += px;
      }
      const halfScroll = el.scrollWidth / 2;
      if (el.scrollLeft >= halfScroll) {
        el.scrollLeft -= halfScroll;
      }
    }
    lastTimeRef.current = now;
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const start = () => {
      if (animationRef.current) return;
      animationRef.current = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (!animationRef.current) return;
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
      lastTimeRef.current = 0;
    };

    const sync = () => {
      if (reducedMotion.matches || document.hidden) {
        stop();
      } else {
        start();
      }
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [animate]);

  const handleInteractionStart = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isPausedRef.current = true;
  };

  const handleInteractionEnd = () => {
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 500);
  };

  return (
    <div className="space-y-8 md:space-y-10">
      {/* About Me */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-foreground mb-4">
          About Me
        </h2>
        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          {data.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* What I'm Doing */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-6">
          What I'm Doing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 text-foreground mb-4">
                  {IconComponent && (
                    <IconComponent className="w-full h-full" strokeWidth={1.5} />
                  )}
                </div>
                <h4 className="text-base md:text-lg font-semibold tracking-[-0.01em] text-foreground mb-2">
                  {service.title}
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clients with scrollable auto-marquee */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-6">
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
          {[...data.clients, ...data.clients].map((client, index) => {
            const logoDark = "logoDark" in client ? (client as { logoDark?: string }).logoDark : undefined;
            return (
              <a
                key={index}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 w-32 h-20 md:w-40 md:h-24 bg-secondary rounded-xl md:rounded-2xl border border-border flex items-center justify-center p-4 md:p-6 hover:border-foreground/25 transition-colors opacity-90 hover:opacity-100"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={110}
                  height={46}
                  sizes="(max-width: 768px) 128px, 160px"
                  className={`w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all ${logoDark ? "dark:hidden" : ""}`}
                />
                {logoDark && (
                  <Image
                    src={logoDark}
                    alt={client.name}
                    width={110}
                    height={46}
                    sizes="(max-width: 768px) 128px, 160px"
                    className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all hidden dark:block"
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
