import { CommandShell } from "@/components/command-center/CommandShell";
import { MissionWorkspace } from "@/components/mission-control/MissionWorkspace";
import { getMissionControlSnapshot } from "@/lib/services/mission-control";

export default async function MissionControlPage() {
  const snapshot = await getMissionControlSnapshot();

  return (
    <CommandShell title="Mission Control" kicker="Missions · objectives · execution">
      <MissionWorkspace snapshot={snapshot} />
    </CommandShell>
  );
}
