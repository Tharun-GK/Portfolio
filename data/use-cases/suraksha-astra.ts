import type { UseCaseModel } from "@/types/use-case";

export const surakshaAstraUseCases: UseCaseModel = {
  id: "uc-suraksha-astra",
  projectSlug: "suraksha-astra",
  title: "Suraksha-Astra use cases",
  description: "Actors submit content; the system evaluates risk and returns a decision.",
  actors: [
    { id: "user", name: "User", description: "Submits content for safety review." },
    { id: "admin", name: "Admin", description: "Reviews flags and decision reasons." },
    { id: "system", name: "System", description: "Runs detection, risk, and decision stages." },
    { id: "ai-model", name: "AI Model", description: "Produces modality-level safety signals." },
  ],
  useCases: [
    {
      id: "upload-content",
      name: "Upload Content",
      description: "User submits text and/or image content.",
      actorIds: ["user"],
      preconditions: ["Caller can reach the ingestion API."],
      mainFlow: [
        "User submits a payload.",
        "Ingestion validates the payload.",
        "Detectors receive normalized inputs.",
      ],
      output: "Accepted job for safety review.",
    },
    {
      id: "evaluate-risk",
      name: "Evaluate Risk",
      description: "System and models compute layered risk.",
      actorIds: ["system", "ai-model"],
      preconditions: ["Normalized content exists."],
      mainFlow: [
        "Text and image detectors run.",
        "Behavior and account risk are composed.",
        "A combined score is produced.",
      ],
      output: "Combined risk score.",
    },
    {
      id: "emit-decision",
      name: "Emit Decision",
      description: "Decision engine returns allow, limited, or blocked with a reason.",
      actorIds: ["system"],
      preconditions: ["Combined risk score exists."],
      mainFlow: [
        "Score is mapped to a policy outcome.",
        "A reason flag is attached.",
        "Response is returned to the caller.",
      ],
      output: "Allow / Limited / Blocked + reason.",
    },
    {
      id: "review-flag",
      name: "Review Flag",
      description: "Admin inspects a flagged decision.",
      actorIds: ["admin"],
      preconditions: ["A limited or blocked decision exists."],
      mainFlow: [
        "Admin opens the flagged item.",
        "Reason and contributing signals are shown.",
        "Admin records a review note.",
      ],
      output: "Reviewed flag record.",
    },
  ],
  relationships: [
    { id: "r1", actorId: "user", useCaseId: "upload-content", kind: "associates" },
    { id: "r2", actorId: "system", useCaseId: "evaluate-risk", kind: "associates" },
    { id: "r3", actorId: "ai-model", useCaseId: "evaluate-risk", kind: "associates" },
    { id: "r4", actorId: "system", useCaseId: "emit-decision", kind: "associates" },
    { id: "r5", actorId: "admin", useCaseId: "review-flag", kind: "associates" },
  ],
};
