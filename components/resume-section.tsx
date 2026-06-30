import { resumeData } from "@/lib/portfolio-data";

interface ResumeSectionProps {
  data?: typeof resumeData;
}

export function ResumeSection({ data = resumeData }: ResumeSectionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-foreground">
          Resume
        </h2>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-6">
          Education
        </h3>
        <div className="space-y-4">
          {data.education.map((item, index) => (
            <div
              key={index}
              className="pb-6 last:pb-0"
            >
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground mb-2">
                {item.period}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              {item.highlights && (
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">
                  {item.highlights.map((h, i) => (
                    <span key={i}>
                      {i > 0 && " | "}
                      {h.link ? (
                        <a href={h.link} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                          {h.text}
                        </a>
                      ) : h.bold ? (
                        <strong>{h.text}</strong>
                      ) : (
                        h.text
                      )}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-6">
          Experience
        </h3>

        <div className="space-y-4">
          {data.experience.map((item, index) => (
            <div
              key={index}
              className="pb-6 last:pb-0"
            >

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
                          className="px-2 py-1 bg-secondary text-muted-foreground text-xs font-medium rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Period */}
                <p className="text-xs md:text-sm text-muted-foreground">{item.period}</p>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Source Contributions */}
      {data.openSource && data.openSource.length > 0 && (
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-6">
            Open Source Contributions
          </h3>
          <div className="space-y-3">
            {data.openSource.map((item, index) => (
              <div key={index} className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm md:text-base font-medium text-foreground">
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors underline decoration-muted-foreground/75 hover:decoration-accent"
                  >
                    {item.project}
                  </a>
                </h4>
                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-secondary text-muted-foreground text-xs font-medium rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-6">
          Certifications
        </h3>
        <div className="space-y-3">
          {data.certifications.map((cert, index) => (
            <div key={index} className="flex justify-between items-center">
              <h4 className="text-sm md:text-base font-medium text-foreground">
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors underline decoration-muted-foreground/75 hover:decoration-accent"
                  >
                    {cert.title}
                  </a>
                ) : (
                  cert.title
                )}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
