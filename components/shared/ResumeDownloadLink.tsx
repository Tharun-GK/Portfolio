import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function ResumeDownloadLink({ className }: { className?: string }) {
  if (!profile.resumeHref) {
    return null;
  }

  return (
    <a
      href={profile.resumeHref}
      download="Tharun-G-K-Resume.pdf"
      className={cn(
        "inline-flex items-center border border-[var(--accent)] px-3 py-2 text-sm text-[var(--accent)] hover:bg-[rgba(79,212,238,0.12)]",
        className,
      )}
    >
      Download Resume
    </a>
  );
}
