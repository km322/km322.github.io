"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { portfolioData } from "@/lib/portfolio-data";

interface PortfolioSectionProps {
  data?: typeof portfolioData;
}

// Small logos / illustrations get a little padding; larger media fills the box.
const PADDED = new Set<string>(["/TimmyOk.svg", "/cred-logo.svg", "/POC.png"]);

// Plays only while the tile is on-screen AND the tab is foregrounded AND
// reduced-motion is off — so the project videos never decode/drain in the
// background. A poster frame shows whenever the video isn't playing (including
// when autoplay is blocked, e.g. iOS Low Power Mode), so tiles are never blank.
function ProjectVideo({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const poster = src.replace(/\.(mp4|mov|webm)$/i, "-poster.jpg");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => {
      if (inView && !document.hidden && !reduce.matches) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        update();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    reduce.addEventListener("change", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
}

export function PortfolioSection({
  data = portfolioData,
}: PortfolioSectionProps) {
  // Tracks which card is "open" on touch devices (no hover).
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-foreground">
          Projects
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {data.projects.map((project, index) => {
          const isVideo =
            project.image && /\.(mp4|mov|webm)$/i.test(project.image);
          const fitClass = PADDED.has(project.image)
            ? "object-contain p-5 md:p-6"
            : "object-contain";
          const isActive = activeIndex === index;
          const mediaClass = `${fitClass} transition-transform duration-500 ease-out group-hover:scale-[1.03]`;

          return (
            <div key={index} className="flex flex-col">
              {/* Card */}
              <div
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl md:rounded-2xl border border-border bg-secondary cursor-pointer transition-colors hover:border-foreground/25"
              >
                {/* Media */}
                {isVideo ? (
                  <ProjectVideo
                    src={project.image}
                    className={`w-full h-full ${mediaClass}`}
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={mediaClass}
                  />
                )}

                {/* Reveal overlay — hover (desktop), tap (touch), focus (keyboard) */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-4 md:p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
                  }`}
                >
                  <h3
                    className={`text-base md:text-lg font-semibold tracking-[-0.01em] text-white mb-3 transition-transform duration-300 ${
                      isActive
                        ? "translate-y-0"
                        : "translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <div
                    className={`flex items-center gap-2 transition-transform duration-300 delay-75 ${
                      isActive
                        ? "translate-y-0"
                        : "translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0"
                    }`}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs md:text-sm font-medium text-black hover:opacity-90 transition-opacity"
                    >
                      View
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs md:text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      Code
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Tech */}
              {project.tech && project.tech.length > 0 && (
                <p className="mt-3 text-xs md:text-sm text-muted-foreground">
                  {project.tech.join(" · ")}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
