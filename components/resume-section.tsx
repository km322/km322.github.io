import { BookOpen, Briefcase, BadgeCheck } from "lucide-react";
import { resumeData } from "@/lib/portfolio-data";

interface ResumeSectionProps {
  data?: typeof resumeData;
}

export function ResumeSection({ data = resumeData }: ResumeSectionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Resume
        </h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-6">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Education
          </h3>
        </div>
        <div className="space-y-4">
          {data.education.map((item, index) => (
            <div
              key={index}
              className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h4>
              <p className="text-xs md:text-sm text-accent mb-2">
                {item.period}
              </p>
              <p
                className="text-xs md:text-sm text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-6">
          <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Experience
          </h3>
        </div>

        <div className="space-y-4">
          {data.experience.map((item, index) => (
            <div
              key={index}
              className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />

              {/* Title + Skills row */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  {/* Title */}
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-lg font-semibold text-foreground hover:text-accent transition-colors underline decoration-muted-foreground/75 hover:decoration-accent"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <h4 className="text-base md:text-lg font-semibold text-foreground">
                      {item.title}
                    </h4>
                  )}

                  {/* Skills aligned next to title */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 md:gap-2 justify-end">
                      {item.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-accent/15 text-foreground text-xs font-medium rounded-md border border-accent"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Period */}
                <p className="text-xs md:text-sm text-accent">{item.period}</p>
              </div>

              {/* Description */}
              <p
                className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-6">
          <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Certifications
          </h3>
        </div>
        <div className="space-y-3">
          {data.certifications.map((cert, index) => (
            <div key={index} className="flex justify-between items-center">
              <h4 className="text-sm md:text-base font-medium text-foreground">
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {cert.title}
                  </a>
                ) : (
                  cert.title
                )}
              </h4>
              <p className="text-xs md:text-sm text-accent ">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
