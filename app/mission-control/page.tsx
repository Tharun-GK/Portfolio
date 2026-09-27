import { MissionDashboard } from "@/components/mission-control/MissionDashboard";
import { PublicShell } from "@/components/layout/PublicShell";
import { getMissionControlSnapshot } from "@/lib/services/mission-control";

export default async function MissionControlPage() {
  const snapshot = await getMissionControlSnapshot();

  return (
    <PublicShell
      title="Mission Control"
      description="Who Tharun is, what he builds, which technologies he uses, what is in motion, and what is on record — from portfolio data only."
    >
      <MissionDashboard snapshot={snapshot} />
    </PublicShell>
  );
}
