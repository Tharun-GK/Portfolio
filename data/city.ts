import type { CityMapData } from "@/types/city";

export const city: CityMapData = {
  name: "Tharun City",
  summary:
    "An optional map of districts and buildings. Every building routes to a public page — the city is never the only way in.",
  districts: [
    {
      id: "district-ai",
      name: "AI District",
      kind: "ai",
      summary: "Applied AI labs and safety / monitoring systems.",
      buildings: [
        {
          id: "bldg-suraksha",
          name: "Suraksha-Astra Lab",
          kind: "project",
          summary: "Multimodal cyber safety and content moderation.",
          href: "/projects/suraksha-astra",
          relatedProjectSlug: "suraksha-astra",
        },
        {
          id: "bldg-gks",
          name: "GKS-CARE Lab",
          kind: "project",
          summary: "Simulated critical patient monitoring.",
          href: "/projects/gks-care",
          relatedProjectSlug: "gks-care",
        },
      ],
    },
    {
      id: "district-startup",
      name: "Startup District",
      kind: "startup",
      summary: "Product headquarters and workforce platform work.",
      buildings: [
        {
          id: "bldg-bms",
          name: "BookMyShift HQ",
          kind: "startup",
          summary: "Flexible workforce platform.",
          href: "/projects/bookmyshift",
          relatedProjectSlug: "bookmyshift",
        },
      ],
    },
    {
      id: "district-research",
      name: "Research District",
      kind: "research",
      summary: "Papers, conferences, and research framing.",
      buildings: [
        {
          id: "bldg-research",
          name: "Research Center",
          kind: "research",
          summary: "Suraksha-Astra research title and related work.",
          href: "/research",
          relatedResearchId: "research-suraksha-astra",
        },
      ],
    },
    {
      id: "district-engineering",
      name: "Engineering District",
      kind: "engineering",
      summary: "Product lab and system architecture.",
      buildings: [
        {
          id: "bldg-lab",
          name: "Project Lab",
          kind: "project",
          summary: "Browse all systems as products.",
          href: "/projects",
        },
      ],
    },
    {
      id: "district-experience",
      name: "Experience District",
      kind: "experience",
      summary: "Roles, founding work, and timeline.",
      buildings: [
        {
          id: "bldg-experience",
          name: "Experience Hall",
          kind: "experience",
          summary: "Founding and independent engineering timeline.",
          href: "/experience",
        },
      ],
    },
    {
      id: "district-learning",
      name: "Learning District",
      kind: "learning",
      summary: "Skills and ongoing technical learning.",
      buildings: [
        {
          id: "bldg-skills",
          name: "Skills Archive",
          kind: "achievement",
          summary: "Core languages, frameworks, and domains.",
          href: "/mission-control",
        },
      ],
    },
  ],
};
