import type { Activity } from "@/types/activity";

export const activities: Activity[] = [
  {
    id: "act-bms-founding",
    type: "STARTUP",
    title: "Building BookMyShift",
    description:
      "Founding work on a flexible workforce platform: verification, hiring, messaging, and trust.",
    date: "2026-09-01",
    relatedProjectSlug: "bookmyshift",
    href: "/projects/bookmyshift",
  },
  {
    id: "act-suraksha-research",
    type: "RESEARCH",
    title: "Suraksha-Astra research framing",
    description:
      "AI-based multimodal cyber safety and content moderation system documented as a research title.",
    date: "2026-08-01",
    relatedProjectSlug: "suraksha-astra",
    relatedResearchId: "research-suraksha-astra",
    href: "/research",
  },
  {
    id: "act-gks-build",
    type: "PROJECT",
    title: "GKS-CARE monitoring prototype",
    description:
      "Simulated real-time patient monitoring with risk logic and an operator dashboard.",
    date: "2026-07-01",
    relatedProjectSlug: "gks-care",
    href: "/projects/gks-care",
  },
];
