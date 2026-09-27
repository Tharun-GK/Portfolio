import type { UseCaseModel } from "@/types/use-case";
import { bookmyshiftUseCases } from "@/data/use-cases/bookmyshift";
import { gksCareUseCases } from "@/data/use-cases/gks-care";
import { surakshaAstraUseCases } from "@/data/use-cases/suraksha-astra";

export const useCaseModels: UseCaseModel[] = [
  surakshaAstraUseCases,
  gksCareUseCases,
  bookmyshiftUseCases,
];
