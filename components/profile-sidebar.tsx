import { profileData } from "@/lib/portfolio-data";
import Image from "next/image";
interface ProfileSidebarProps {
  data?: typeof profileData;
}

export function ProfileSidebar({ data = profileData }: ProfileSidebarProps) {
  return (
    <aside className="w-full lg:w-87 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 h-fit">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6 rounded-2xl overflow-hidden bg-secondary">
          <Image
            src={data.avatar}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-1">
          {data.name}
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          {data.title}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4 md:my-6" />

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Email
          </p>
          <a
            href={`mailto:${data.email}`}
            className="text-sm text-foreground hover:text-accent transition-colors break-all"
          >
            {data.email}
          </a>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            LinkedIn
          </p>
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-accent transition-colors break-all"
          >
            {data.linkedin.replace(/^https?:\/\//, "")}
          </a>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            GitHub
          </p>
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-accent transition-colors break-all"
          >
            {data.github.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>
    </aside>
  );
}
