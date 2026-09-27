import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "proj-suraksha-astra",
    slug: "suraksha-astra",
    title: "Suraksha-Astra",
    shortDescription:
      "AI-based multimodal content safety and moderation system with layered risk scoring.",
    description:
      "Suraksha-Astra is a research-oriented AI system for multimodal cyber safety. It evaluates text and image content, combines model outputs with behavior and account risk signals, and produces a decision: allow, limited, or blocked — with a reason flag.",
    category: "cybersecurity",
    categories: ["ai-ml", "cybersecurity", "research"],
    status: "building",
    progress: 70,
    technologies: ["Python", "AI/ML", "FastAPI", "React"],
    problem:
      "Online platforms need content safety that can inspect more than a single modality, and that can explain a decision rather than returning an opaque score.",
    solution:
      "A pipeline that runs text and image safety detection, then composes model risk, behavior risk, and account risk into a combined score consumed by a decision engine.",
    whyItMatters:
      "Safety systems fail when they treat a single classifier as truth. Suraksha-Astra is designed as a composed risk system, not a one-shot filter.",
    features: [
      {
        title: "Text safety",
        description: "Inspects user-submitted text for policy-relevant risk signals.",
      },
      {
        title: "Image safety",
        description: "Inspects visual content as a second modality in the same decision path.",
      },
      {
        title: "Layered risk scoring",
        description:
          "Combines model risk with behavior risk and account risk before a final decision.",
      },
      {
        title: "Decision logic",
        description: "Maps combined risk into allow, limited, or blocked outcomes with a reason flag.",
      },
    ],
    implementation:
      "The current system is organized as sequential processing stages: ingestion, detection, risk analysis, decision, and response. Architecture and use-case graphs are data-driven so the explorer can render them without project-specific UI.",
    results:
      "The project is in active development. Claims here are limited to architecture, capabilities in progress, and research framing — not production-scale deployment metrics.",
    challenges:
      "Combining multimodal detectors without over-blocking legitimate content, and keeping decision reasons inspectable.",
    futureImprovements:
      "Richer behavior signals, tighter evaluation harnesses, and clearer operator tooling for reviewing flagged cases.",
    metrics: [],
    timeline: [
      {
        label: "Concept and research framing",
        date: "2026",
        description: "Defined multimodal safety and layered risk as the core system idea.",
      },
      {
        label: "System design",
        date: "2026",
        description: "Modeled detection, risk, and decision stages as a reusable architecture graph.",
      },
    ],
    links: {},
    images: {
      gallery: [],
    },
    architectureId: "arch-suraksha-astra",
    useCaseId: "uc-suraksha-astra",
    relatedProjectSlugs: ["gks-care"],
    tags: ["content-moderation", "multimodal", "risk-engine", "safety"],
    featured: true,
    updatedAt: "2026-09-01",
  },
  {
    id: "proj-gks-care",
    slug: "gks-care",
    title: "GKS-CARE",
    shortDescription:
      "AI-assisted critical patient monitoring using simulated real-time vitals and risk logic.",
    description:
      "GKS-CARE is an AI-assisted monitoring concept for critical-care style dashboards. The current implementation uses simulated real-time patient monitoring, pretrained models where applicable, and explicit risk logic. It is not clinically validated.",
    category: "healthcare",
    categories: ["ai-ml", "healthcare"],
    status: "building",
    progress: 55,
    technologies: ["Python", "AI/ML", "React", "TypeScript"],
    problem:
      "Critical-care style monitoring needs a clear path from vitals to a health score and an alert — without implying clinical certification that does not exist.",
    solution:
      "A pipeline that ingests simulated patient data, preprocesses vitals, applies risk logic and optional pretrained AI, then surfaces classification, alerts, and recommendations on a dashboard.",
    whyItMatters:
      "Healthcare AI prototypes are easy to oversell. GKS-CARE is documented as a simulation-backed monitoring system so architecture can be evaluated honestly.",
    features: [
      {
        title: "Simulated vital monitoring",
        description: "Streams simulated patient vitals for dashboard and risk experiments.",
      },
      {
        title: "Risk classification",
        description: "Maps processed signals into a health score and risk class.",
      },
      {
        title: "Alert surface",
        description: "Presents alerts and recommendations on an operator dashboard.",
      },
    ],
    implementation:
      "Simulation, pretrained inference, and rule-based risk logic are separate architecture nodes so visitors can see what is simulated versus what is model-driven.",
    results:
      "Prototype monitoring flows exist. No clinical trial, hospital deployment, or diagnostic claim is made.",
    challenges:
      "Keeping simulation honest in the UI, and avoiding the appearance of medical-device behavior.",
    futureImprovements:
      "Richer simulation scenarios, clearer uncertainty display, and evaluation against labeled simulated events.",
    metrics: [],
    timeline: [
      {
        label: "Monitoring prototype",
        date: "2026",
        description: "Established simulated vitals, scoring, and dashboard alerting as the core loop.",
      },
    ],
    links: {},
    images: {
      gallery: [],
    },
    architectureId: "arch-gks-care",
    useCaseId: "uc-gks-care",
    relatedProjectSlugs: ["suraksha-astra"],
    tags: ["healthcare", "monitoring", "simulation", "risk"],
    featured: true,
    updatedAt: "2026-09-01",
  },
  {
    id: "proj-bookmyshift",
    slug: "bookmyshift",
    title: "BookMyShift",
    shortDescription:
      "Flexible workforce platform connecting workers and employers with verification, hiring, and trust layers.",
    description:
      "BookMyShift is a startup product: a flexible workforce platform for workers and employers. Core loops cover verification, job discovery, applications, hiring groups, work completion, payment confirmation, ratings, and in-app communication with contact privacy.",
    category: "startup",
    categories: ["startup", "full-stack"],
    status: "active",
    progress: 60,
    technologies: ["TypeScript", "JavaScript", "React", "Next.js", "PostgreSQL"],
    problem:
      "Short-term and shift-based work still depends on informal networks, weak identity, and opaque hiring — which makes trust expensive for both workers and employers.",
    solution:
      "A two-sided product with verification, job posting, applications, hired groups, completion confirmation, payment confirmation, and ratings as first-class workflow steps.",
    whyItMatters:
      "Workforce marketplaces fail on trust and communication. BookMyShift is designed around verification, ratings, and in-app messaging rather than exposing personal contact by default.",
    features: [
      {
        title: "Worker and employer verification",
        description: "Identity verification as an entry condition for trust-sensitive actions.",
      },
      {
        title: "Job discovery and applications",
        description: "Workers discover shifts and apply; employers review and select.",
      },
      {
        title: "Hired groups and messaging",
        description: "Hired work happens inside a group context with in-app communication.",
      },
      {
        title: "Completion, payment confirmation, ratings",
        description:
          "Work completion and payment confirmation feed a ratings history used as a trust signal.",
      },
    ],
    implementation:
      "Worker and employer journeys are modeled as explicit flows so product pages and diagrams stay in sync with the same data.",
    results:
      "The product is being built as BookMyShift HQ inside THARUN OS. Traction numbers are omitted until they can be stated from real product data.",
    challenges:
      "Verification quality, contact privacy, and keeping payments and ratings consistent after work completes.",
    futureImprovements:
      "Deeper trust signals, safer messaging defaults, and a clearer earnings surface for workers.",
    metrics: [],
    timeline: [
      {
        label: "Product definition",
        date: "2026",
        description: "Defined worker and employer verification-to-rating loops.",
      },
    ],
    links: {},
    images: {
      gallery: [],
    },
    architectureId: "arch-bookmyshift",
    useCaseId: "uc-bookmyshift",
    relatedProjectSlugs: [],
    tags: ["marketplace", "workforce", "trust", "startup"],
    featured: true,
    updatedAt: "2026-09-01",
  },
];
