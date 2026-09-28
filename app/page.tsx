import { CommandCenterHome } from "@/components/command-center/CommandCenterHome";
import { CommandShell } from "@/components/command-center/CommandShell";
import { profile } from "@/data/profile";
import { SITE_TAGLINE } from "@/lib/constants";
import { getMissionControlSnapshot } from "@/lib/services/mission-control";

export default async function HomePage() {
  const snapshot = await getMissionControlSnapshot();

  return (
    <>
      <section className="sr-only">
        <h1>{profile.name}</h1>
        <p>
          {profile.role}. {SITE_TAGLINE}
        </p>
      </section>
      <CommandShell
        atmosphere
        title="Command Center"
        kicker="Tracking progress · Building tomorrow"
      >
        <CommandCenterHome snapshot={snapshot} />
      </CommandShell>
    </>
  );
}
