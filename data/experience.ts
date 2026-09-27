import type { ExperienceItem } from "@/types/experience";

export const experienceItems: ExperienceItem[] = [
  {
    id: "exp-bookmyshift-founder",
    organization: "BookMyShift",
    role: "Founder",
    kind: "startup",
    startDate: "2026",
    endDate: null,
    description:
      "Building a flexible workforce platform connecting workers and employers, with verification, hiring groups, messaging, payment confirmation, and ratings.",
    skills: ["TypeScript", "React", "Next.js", "PostgreSQL", "Product"],
    achievements: [],
    relatedProjectSlug: "bookmyshift",
  },
  {
    id: "exp-applied-ai-build",
    organization: "Independent engineering",
    role: "Full-Stack & Applied AI Developer",
    kind: "project",
    startDate: "2026",
    endDate: null,
    description:
      "Designing and building applied AI systems including Suraksha-Astra (multimodal safety) and GKS-CARE (simulated critical-care monitoring).",
    skills: ["Python", "AI/ML", "FastAPI", "React"],
    achievements: [],
  },
];
