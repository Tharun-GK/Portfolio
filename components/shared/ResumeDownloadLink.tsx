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
      className={cn("text-sm text-[var(--accent)] hover:underline", className)}
    >
      Download Resume
    </a>
  );
}
