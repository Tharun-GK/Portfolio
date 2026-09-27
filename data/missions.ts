import type { Mission } from "@/types/mission";

export const missions: Mission[] = [
  {
    id: "mission-suraksha",
    title: "Harden Suraksha-Astra decision path",
    summary:
      "Keep multimodal detection, layered risk, and explainable allow/limited/blocked outcomes aligned.",
    status: "in-progress",
    progress: 70,
    relatedProjectSlug: "suraksha-astra",
    focus: "AI / Cybersecurity",
  },
  {
    id: "mission-gks",
    title: "Clarify GKS-CARE simulation vs inference",
    summary:
      "Make it obvious in architecture and UI what is simulated, what is pretrained, and what is rule-based risk.",
    status: "in-progress",
    progress: 55,
    relatedProjectSlug: "gks-care",
    focus: "AI / Healthcare",
  },
  {
    id: "mission-bms",
    title: "Advance BookMyShift trust loop",
    summary:
      "Verification, hiring groups, completion, payment confirmation, and ratings as one product system.",
    status: "in-progress",
    progress: 60,
    relatedProjectSlug: "bookmyshift",
    focus: "Startup",
  },
];
