"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Fog } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CityCameraRig } from "@/components/city/CityCameraRig";
import { CityEnvironment } from "@/components/city/CityEnvironment";
import { CityLocationBuilding } from "@/components/city/CityLocationBuilding";
import {
  CITY_3D_GROUND,
  cameraPoseFor,
  districtPadsFromSites,
  type CityCameraMode,
} from "@/lib/city-3d";
import { CityLocationCard } from "@/components/city/CityLocationCard";
import type { CityLocation } from "@/types/city-location";

interface CityCanvasProps {
  locations: CityLocation[];
  selectedId?: string | null;
}

export function CityCanvas({ locations, selectedId }: CityCanvasProps) {
  const router = useRouter();
  const controls = useRef<OrbitControlsImpl>(null);
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [mode, setMode] = useState<CityCameraMode>(selectedId ? "location" : "overview");
  const [flyGen, setFlyGen] = useState(0);

  const selected = useMemo(
    () => locations.find((item) => item.id === selectedId) ?? null,
    [locations, selectedId],
  );
  const pads = useMemo(() => districtPadsFromSites(locations), [locations]);
  const pose = useMemo(
    () => cameraPoseFor(mode, locations, selected),
    [mode, locations, selected],
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setMode(selectedId ? "location" : "overview");
  }, [selectedId]);

  function select(id: string) {
    router.push(`/city?loc=${id}`, { scroll: false });
    setMode("location");
    setFlyGen((value) => value + 1);
  }

  function overview() {
    router.push("/city", { scroll: false });
    setMode("overview");
    setFlyGen((value) => value + 1);
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      <div
        className="h-64 touch-none md:h-[min(40rem,72vh)]"
        role="img"
        aria-label="Navigable 3D map of Tharun City"
      >
        <Canvas
          dpr={compact ? [1, 1.25] : [1, 1.5]}
          gl={{ antialias: !compact, alpha: false, powerPreference: "low-power" }}
          camera={{ position: pose.position, fov: 40, near: 0.1, far: 120 }}
          onCreated={({ scene }) => {
            scene.background = new Color(CITY_3D_GROUND);
            scene.fog = new Fog(CITY_3D_GROUND, 28, 62);
          }}
        >
          <ambientLight intensity={0.5} />
          <hemisphereLight args={["#c4b58a", "#121417", 0.32]} />
          <directionalLight position={[10, 18, 8]} intensity={compact ? 0.7 : 0.95} />
          <CityEnvironment pads={pads} compact={compact} />
          {locations.map((location) => (
            <CityLocationBuilding
              key={location.id}
              location={location}
              selected={location.id === selectedId}
              detailed={!compact}
              onSelect={select}
            />
          ))}
          <CityCameraRig
            pose={pose}
            reducedMotion={Boolean(reduceMotion)}
            resetKey={`${selectedId ?? "city"}-${mode}-${flyGen}`}
            controls={controls}
          />
          <OrbitControls
            ref={controls}
            makeDefault
            enableDamping
            dampingFactor={0.08}
            minDistance={6}
            maxDistance={42}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.35}
            enablePan
            screenSpacePanning
          />
        </Canvas>
      </div>
      {selected ? (
        <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-end px-3 md:top-auto md:bottom-16">
          <div className="pointer-events-auto w-full max-w-sm">
            <CityLocationCard
              location={selected}
              compact
              onNavigateHere={() => {
                setMode("approach");
                setFlyGen((value) => value + 1);
              }}
              onOverview={overview}
            />
          </div>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] px-3 py-2">
        <p className="text-xs text-[var(--muted)]">
          Click a building to fly there. Drag to look around after you arrive. Scroll to zoom.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--panel-hover)]"
            onClick={overview}
          >
            Overview
          </button>
          <button
            type="button"
            className="rounded-md border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--panel-hover)] disabled:opacity-40"
            disabled={!selected}
            onClick={() => {
              setMode("district");
              setFlyGen((value) => value + 1);
            }}
          >
            District
          </button>
          <button
            type="button"
            className="rounded-md border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--panel-hover)] disabled:opacity-40"
            disabled={!selected}
            onClick={() => {
              setMode("approach");
              setFlyGen((value) => value + 1);
            }}
          >
            Navigate Here
          </button>
        </div>
      </div>
    </div>
  );
}
