import { CommandShell } from "@/components/command-center/CommandShell";
import { MissionDashboard } from "@/components/mission-control/MissionDashboard";
import { getMissionControlSnapshot } from "@/lib/services/mission-control";

export default async function MissionControlPage() {
  const snapshot = await getMissionControlSnapshot();

  return (
    <CommandShell title="Mission Control" kicker="Tracking progress · Building tomorrow">
      <MissionDashboard snapshot={snapshot} />
    </CommandShell>
  );
}
