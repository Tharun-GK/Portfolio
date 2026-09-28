"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/shared/Button";
import { getArchitectureNodeColor } from "@/lib/design-tokens";
import {
  cubicEdgePath,
  flowEdgeOrder,
  layoutArchitectureGraph,
  pointOnPath,
} from "@/lib/architecture-layout";
import { cn } from "@/lib/utils";
import type { ArchitectureGraph } from "@/types/architecture";

const EDGE_MS = 900;
const MIN_ZOOM = 0.7;
const MAX_ZOOM = 2;

interface ArchitectureExplorerProps {
  graph: ArchitectureGraph;
}

export function ArchitectureExplorer({ graph }: ArchitectureExplorerProps) {
  const reduceMotion = useReducedMotion();
  const layout = useMemo(() => layoutArchitectureGraph(graph), [graph]);
  const order = useMemo(() => flowEdgeOrder(graph), [graph]);
  const nodesById = useMemo(
    () => new Map(graph.nodes.map((node) => [node.id, node])),
    [graph],
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [edgeIndex, setEdgeIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [packet, setPacket] = useState<{ x: number; y: number } | null>(null);
  const playRef = useRef({ index: 0, t: 0 });
  const activePathRef = useRef<SVGPathElement | null>(null);

  const activeEdge = order[edgeIndex] ?? null;
  const selected = selectedId ? nodesById.get(selectedId) : undefined;

  useEffect(() => {
    playRef.current = { index: 0, t: 0 };
    setPlaying(false);
    setEdgeIndex(0);
    setProgress(0);
    setSelectedId(null);
    setZoom(1);
  }, [graph.id]);

  useEffect(() => {
    if (!playing || reduceMotion || order.length === 0) {
      return;
    }

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      playRef.current.t += delta / EDGE_MS;

      if (playRef.current.t >= 1) {
        playRef.current.t = 0;
        if (playRef.current.index >= order.length - 1) {
          setProgress(1);
          setEdgeIndex(playRef.current.index);
          setPlaying(false);
          return;
        }
        playRef.current.index += 1;
        setEdgeIndex(playRef.current.index);
      }

      setProgress(playRef.current.t);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, reduceMotion, order.length]);

  useEffect(() => {
    const path = activePathRef.current;
    if (!path || reduceMotion || !activeEdge) {
      setPacket(null);
      return;
    }
    setPacket(pointOnPath(path, playing ? progress : Math.min(progress, 1)));
  }, [activeEdge, progress, playing, reduceMotion, layout]);

  function play() {
    if (!order.length) {
      return;
    }
    if (reduceMotion) {
      const next = edgeIndex >= order.length - 1 ? 0 : edgeIndex + 1;
      playRef.current = { index: next, t: 1 };
      setEdgeIndex(next);
      setProgress(1);
      return;
    }
    if (edgeIndex >= order.length - 1 && progress >= 1) {
      playRef.current = { index: 0, t: 0 };
      setEdgeIndex(0);
      setProgress(0);
    }
    setPlaying(true);
  }

  function reset() {
    playRef.current = { index: 0, t: 0 };
    setPlaying(false);
    setEdgeIndex(0);
    setProgress(0);
    setPacket(null);
  }

  const vbWidth = layout.width / zoom;
  const vbHeight = layout.height / zoom;
  const vbX = (layout.width - vbWidth) / 2;
  const vbY = (layout.height - vbHeight) / 2;
  const flowLabel = activeEdge
    ? `${nodesById.get(activeEdge.source)?.label ?? activeEdge.source} → ${
        nodesById.get(activeEdge.target)?.label ?? activeEdge.target
      }${activeEdge.label ? ` (${activeEdge.label})` : ""}`
    : "Idle";

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="quiet"
          onClick={play}
          disabled={!order.length || (!reduceMotion && playing)}
        >
          {reduceMotion ? "Next flow" : playing ? "Playing" : "Play"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setPlaying(false)}
          disabled={reduceMotion || !playing}
        >
          Pause
        </Button>
        <Button type="button" variant="ghost" onClick={reset}>
          Reset
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setZoom((value) => Math.min(MAX_ZOOM, Number((value + 0.15).toFixed(2))))}
        >
          Zoom in
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setZoom((value) => Math.max(MIN_ZOOM, Number((value - 0.15).toFixed(2))))}
        >
          Zoom out
        </Button>
        <Button type="button" variant="ghost" onClick={() => setZoom(1)}>
          Fit
        </Button>
      </div>
      <p className="font-mono text-xs text-[var(--muted)]" aria-live="polite">
        Flow: {flowLabel}
      </p>
      <div className="overflow-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--panel)]">
        <svg
          aria-label="Architecture graph. Select a node for details. A node list remains below."
          viewBox={`${vbX} ${vbY} ${vbWidth} ${vbHeight}`}
          className="h-[min(28rem,70vh)] min-h-64 w-full min-w-[40rem]"
        >
          {graph.edges.map((edge) => {
            const from = layout.boxes[edge.source];
            const to = layout.boxes[edge.target];
            if (!from || !to) {
              return null;
            }
            const active = activeEdge?.id === edge.id;
            return (
              <path
                key={edge.id}
                ref={active ? (node) => { activePathRef.current = node; } : undefined}
                d={cubicEdgePath(from, to)}
                fill="none"
                stroke="currentColor"
                strokeWidth={active ? 2.4 : 1.2}
                className={active ? "text-[var(--accent)]" : "text-[var(--border)]"}
              />
            );
          })}
          {packet ? (
            <circle cx={packet.x} cy={packet.y} r={5} className="fill-[var(--accent)]" />
          ) : null}
          {graph.nodes.map((node) => {
            const box = layout.boxes[node.id];
            if (!box) {
              return null;
            }
            const selectedNode = selectedId === node.id;
            const inFlow =
              activeEdge?.source === node.id || activeEdge?.target === node.id;
            return (
              <g key={node.id}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  rx={8}
                  fill="var(--bg)"
                  stroke={getArchitectureNodeColor(node.type)}
                  strokeWidth={selectedNode || inFlow ? 2.5 : 1.5}
                />
                <text
                  x={box.x + 10}
                  y={box.y + 22}
                  className="fill-[var(--text)]"
                  fontSize={11}
                >
                  {node.label.length > 26 ? `${node.label.slice(0, 24)}…` : node.label}
                </text>
                <text
                  x={box.x + 10}
                  y={box.y + 40}
                  className="fill-[var(--muted)]"
                  fontSize={9}
                >
                  {node.type}
                </text>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  rx={8}
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.label}, ${node.type}`}
                  aria-pressed={selectedNode}
                  className="cursor-pointer outline-none"
                  onClick={() => setSelectedId(node.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(node.id);
                    }
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>
      {selected ? (
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] p-4">
          <p className="font-medium">{selected.label}</p>
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            {selected.type}
            {selected.technology ? ` · ${selected.technology}` : ""}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">{selected.purpose}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{selected.description}</p>
        </div>
      ) : (
        <p className={cn("text-sm text-[var(--muted)]")}>
          Select a node to inspect purpose and description. Playback is optional.
        </p>
      )}
    </div>
  );
}
