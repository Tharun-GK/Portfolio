export type ArchitectureNodeType =
  | "actor"
  | "client"
  | "service"
  | "processing"
  | "model"
  | "data"
  | "decision"
  | "external";

export interface ArchitectureNode {
  id: string;
  label: string;
  type: ArchitectureNodeType;
  technology?: string;
  description: string;
  purpose: string;
  input?: string;
  output?: string;
  responsibility?: string;
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface ArchitectureGraph {
  id: string;
  projectSlug: string;
  title: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}
