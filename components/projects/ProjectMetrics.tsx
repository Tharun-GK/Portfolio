import { ProgressBar } from "@/components/design/ProgressBar";

export function ProjectMetrics({ progress }: { progress: number }) {
  return <ProgressBar value={progress} label="Progress" />;
}
