import { describe, expect, it } from "vitest";
import { StaticProjectRepository } from "@/lib/repositories/static-project-repository";

describe("StaticProjectRepository", () => {
  const repository = new StaticProjectRepository();

  it("returns the three seed projects", async () => {
    const projects = await repository.getAllProjects();
    expect(projects.map((project) => project.slug).sort()).toEqual([
      "bookmyshift",
      "gks-care",
      "suraksha-astra",
    ]);
  });

  it("loads a project by stable slug", async () => {
    const project = await repository.getProjectBySlug("suraksha-astra");
    expect(project?.title).toBe("Suraksha-Astra");
    expect(project?.architectureId).toBe("arch-suraksha-astra");
  });

  it("returns null for an unknown slug", async () => {
    await expect(repository.getProjectBySlug("does-not-exist")).resolves.toBeNull();
  });

  it("filters healthcare projects without UI knowledge", async () => {
    const projects = await repository.getProjectsByCategory("healthcare");
    expect(projects).toHaveLength(1);
    expect(projects[0]?.slug).toBe("gks-care");
  });

  it("hydrates architecture graphs independently of UI", async () => {
    const graph = await repository.getArchitecture("suraksha-astra");
    expect(graph?.nodes.some((node) => node.id === "decision-engine")).toBe(true);
    expect(graph?.edges.length).toBeGreaterThan(0);
  });

  it("hydrates use-case models independently of UI", async () => {
    const model = await repository.getUseCases("bookmyshift");
    expect(model?.actors.some((actor) => actor.id === "worker")).toBe(true);
    expect(model?.useCases.some((item) => item.id === "post-job")).toBe(true);
  });
});
