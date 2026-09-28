import type { CommandNavIcon } from "@/lib/command-nav";

const paths: Record<CommandNavIcon, string> = {
  home: "M4 10.5 12 4l8 6.5V20H4Z M9 20v-6h6v6",
  mission: "M12 3v3 M12 18v3 M3 12h3 M18 12h3 M7 7l2 2 M15 15l2 2 M17 7l-2 2 M9 15l-2 2 M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
  city: "M5 20V9l4-3 3 2 3-4 4 3v13H5Z M9 20v-5h3v5",
  projects: "M4 7h16v12H4Z M4 7l4-3h8l4 3 M9 12h6",
  research: "M9 4h6v4l3 5v7H6v-7l3-5Z M10 16h4",
  experience: "M4 8h16v11H4Z M8 8V6h8v2",
  skills: "M8 16 4 12l4-4 M16 8l4 4-4 4 M13 6l-2 12",
  education: "M3 10 12 5l9 5-9 5-9-5Z M6 12.5V16c2 1.5 10 1.5 12 0v-3.5",
  about: "M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M6 19c1.4-2.4 3.5-3.5 6-3.5s4.6 1.1 6 3.5",
  contact: "M4 6h16v12H4Z M4 6l8 7 8-7",
};

export function CommandIcon({ name, className }: { name: CommandNavIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={paths[name]} />
    </svg>
  );
}
