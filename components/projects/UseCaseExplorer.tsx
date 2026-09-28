"use client";

import { useEffect, useMemo, useState } from "react";
import { UseCaseDetail } from "@/components/projects/UseCaseDetail";
import { cn } from "@/lib/utils";
import { dashForKind, layoutUseCaseModel, relationshipPath } from "@/lib/use-case-layout";
import type { UseCaseModel } from "@/types/use-case";

interface UseCaseExplorerProps {
  model: UseCaseModel;
}

export function UseCaseExplorer({ model }: UseCaseExplorerProps) {
  const layout = useMemo(() => layoutUseCaseModel(model), [model]);
  const firstId = model.useCases[0]?.id ?? null;
  const [selectedId, setSelectedId] = useState(firstId);

  useEffect(() => {
    setSelectedId(firstId);
  }, [model.id, firstId]);

  const selected = model.useCases.find((item) => item.id === selectedId) ?? model.useCases[0];
  const relatedActors = new Set(
    model.relationships
      .filter((rel) => rel.useCaseId === selected?.id)
      .map((rel) => rel.actorId),
  );
  for (const id of selected?.actorIds ?? []) {
    relatedActors.add(id);
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 md:hidden">
        {model.useCases.map((item) => {
          const active = item.id === selected?.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              aria-pressed={active}
              className={cn(
                "rounded-[var(--radius-md)] border p-4 text-left",
                active
                  ? "border-[var(--accent)] bg-[var(--panel)]"
                  : "border-[var(--border)] bg-[var(--panel)]",
              )}
            >
              <p className="font-medium">{item.name}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
            </button>
          );
        })}
      </div>

      <div className="hidden overflow-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--panel)] md:block">
        <svg
          aria-label="Use-case diagram. Select a use case for preconditions, flow, and output."
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          className="h-[min(22rem,60vh)] w-full min-w-[32rem]"
        >
          {model.relationships.map((rel) => {
            const from = layout.boxes[rel.actorId];
            const to = layout.boxes[rel.useCaseId];
            if (!from || !to) {
              return null;
            }
            const active = selected?.id === rel.useCaseId;
            return (
              <path
                key={rel.id}
                d={relationshipPath(from, to)}
                fill="none"
                stroke="currentColor"
                strokeWidth={active ? 2.2 : 1.2}
                strokeDasharray={dashForKind(rel.kind)}
                className={active ? "text-[var(--accent)]" : "text-[var(--border)]"}
              />
            );
          })}
          {model.actors.map((actor) => {
            const box = layout.boxes[actor.id];
            if (!box) {
              return null;
            }
            const linked = relatedActors.has(actor.id);
            return (
              <g key={actor.id}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  rx={box.height / 2}
                  fill="var(--bg)"
                  stroke={linked ? "var(--accent)" : "var(--border)"}
                  strokeWidth={linked ? 2 : 1.4}
                />
                <text
                  x={box.x + box.width / 2}
                  y={box.y + box.height / 2 + 4}
                  textAnchor="middle"
                  fontSize={11}
                  className="fill-[var(--text)]"
                >
                  {actor.name.length > 22 ? `${actor.name.slice(0, 20)}…` : actor.name}
                </text>
              </g>
            );
          })}
          {model.useCases.map((item) => {
            const box = layout.boxes[item.id];
            if (!box) {
              return null;
            }
            const active = item.id === selected?.id;
            return (
              <g key={item.id}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  rx={10}
                  fill="var(--bg)"
                  stroke={active ? "var(--accent)" : "var(--border)"}
                  strokeWidth={active ? 2.4 : 1.4}
                />
                <text
                  x={box.x + 12}
                  y={box.y + 24}
                  fontSize={11}
                  className="fill-[var(--text)]"
                >
                  {item.name.length > 24 ? `${item.name.slice(0, 22)}…` : item.name}
                </text>
                <text
                  x={box.x + 12}
                  y={box.y + 40}
                  fontSize={9}
                  className="fill-[var(--muted)]"
                >
                  use case
                </text>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  rx={10}
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={item.name}
                  aria-pressed={active}
                  className="cursor-pointer"
                  onClick={() => setSelectedId(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(item.id);
                    }
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {selected ? <UseCaseDetail item={selected} actors={model.actors} /> : null}
    </div>
  );
}
