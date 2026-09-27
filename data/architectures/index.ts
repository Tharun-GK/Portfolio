import type { ArchitectureGraph } from "@/types/architecture";
import { bookmyshiftArchitecture } from "@/data/architectures/bookmyshift";
import { gksCareArchitecture } from "@/data/architectures/gks-care";
import { surakshaAstraArchitecture } from "@/data/architectures/suraksha-astra";

export const architectures: ArchitectureGraph[] = [
  surakshaAstraArchitecture,
  gksCareArchitecture,
  bookmyshiftArchitecture,
];
