import type { UseCaseModel } from "@/types/use-case";

export const gksCareUseCases: UseCaseModel = {
  id: "uc-gks-care",
  projectSlug: "gks-care",
  title: "GKS-CARE use cases",
  description: "Simulated monitoring, scoring, and operator alerts. Not a clinical workflow.",
  actors: [
    { id: "operator", name: "Operator", description: "Views the monitoring dashboard." },
    { id: "system", name: "System", description: "Processes simulated vitals." },
    { id: "ai-model", name: "AI Model", description: "Optional pretrained inference." },
  ],
  useCases: [
    {
      id: "simulate-vitals",
      name: "Simulate Vitals",
      description: "System generates a simulated patient stream.",
      actorIds: ["system"],
      preconditions: ["Simulation is enabled."],
      mainFlow: ["Simulation emits vitals.", "Monitoring window updates."],
      output: "Live simulated vitals.",
    },
    {
      id: "score-patient",
      name: "Score Patient",
      description: "Risk logic and optional AI produce a health score and class.",
      actorIds: ["system", "ai-model"],
      preconditions: ["A monitoring window exists."],
      mainFlow: [
        "Features are preprocessed.",
        "Risk logic / model runs.",
        "Score and class are stored.",
      ],
      output: "Health score and risk class.",
    },
    {
      id: "view-dashboard",
      name: "View Dashboard",
      description: "Operator inspects vitals, score, and alerts.",
      actorIds: ["operator"],
      preconditions: ["Dashboard has current state."],
      mainFlow: ["Operator opens the dashboard.", "Score, class, and alerts are shown."],
      output: "Operator-visible monitoring state.",
    },
    {
      id: "raise-alert",
      name: "Raise Alert",
      description: "System raises a non-diagnostic alert for a high-risk simulated state.",
      actorIds: ["system"],
      preconditions: ["Risk class crosses an alert threshold."],
      mainFlow: ["Alert payload is created.", "Dashboard surfaces the alert."],
      output: "Alert / recommendation record.",
    },
  ],
  relationships: [
    { id: "r1", actorId: "system", useCaseId: "simulate-vitals", kind: "associates" },
    { id: "r2", actorId: "system", useCaseId: "score-patient", kind: "associates" },
    { id: "r3", actorId: "ai-model", useCaseId: "score-patient", kind: "associates" },
    { id: "r4", actorId: "operator", useCaseId: "view-dashboard", kind: "associates" },
    { id: "r5", actorId: "system", useCaseId: "raise-alert", kind: "associates" },
  ],
};
