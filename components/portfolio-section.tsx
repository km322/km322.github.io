"use client";

import { useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import Image from "next/image";
import { portfolioData } from "@/lib/portfolio-data";

interface PortfolioSectionProps {
  data?: typeof portfolioData;
}

export function PortfolioSection({
  data = portfolioData,
}: PortfolioSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Projects
        </h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.projects.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            <div key={index} className="space-y-3">
              {/* Card */}
              <div
                onClick={() =>
                  setActiveIndex(isActive ? null : index)
                }
                className="group relative bg-secondary rounded-xl md:rounded-2xl border border-border
                           overflow-hidden cursor-pointer
                           hover:border-accent transition-all duration-300
                           hover:shadow-xl hover:shadow-accent/10"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-background relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20
                              flex flex-col justify-end p-4 md:p-6
                              transition-all duration-300
                              ${
                                isActive
                                  ? "opacity-100"
                                  : "opacity-0 group-hover:opacity-100"
                              }`}
                >
                  <h3
                    className={`text-lg md:text-xl font-bold text-foreground mb-4
                                transform transition-transform duration-300
                                ${
                                  isActive
                                    ? "translate-y-0"
                                    : "translate-y-4 group-hover:translate-y-0"
                                }`}
                  >
                    {project.title}
                  </h3>

                  <div
                    className={`flex gap-2 md:gap-3
                                transform transition-transform duration-300 delay-75
                                ${
                                  isActive
                                    ? "translate-y-0"
                                    : "translate-y-4 group-hover:translate-y-0"
                                }`}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2
                                 bg-accent text-accent-foreground rounded-lg
                                 text-xs md:text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Preview
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2
                                 bg-secondary border border-border text-foreground rounded-lg
                                 text-xs md:text-sm font-medium
                                 hover:bg-accent hover:text-accent-foreground hover:border-accent
                                 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Visit
                    </a>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-accent/20 text-accent text-xs
                               font-medium rounded-md border border-accent/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}