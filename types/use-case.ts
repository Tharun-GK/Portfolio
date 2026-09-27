export interface UseCaseActor {
  id: string;
  name: string;
  description?: string;
}

export interface UseCaseItem {
  id: string;
  name: string;
  description: string;
  actorIds: string[];
  preconditions: string[];
  mainFlow: string[];
  output: string;
}

export interface UseCaseRelationship {
  id: string;
  actorId: string;
  useCaseId: string;
  kind: "associates" | "includes" | "extends";
}

export interface UseCaseModel {
  id: string;
  projectSlug: string;
  title: string;
  description: string;
  actors: UseCaseActor[];
  useCases: UseCaseItem[];
  relationships: UseCaseRelationship[];
}
