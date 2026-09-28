"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { Color, Fog, type Group } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  CITY_3D_BUILDING_COLOR,
  CITY_3D_BUILDING_HEIGHT,
  CITY_3D_GROUND,
  CITY_3D_PAD,
  CITY_3D_PLANNED,
  CITY_3D_ROAD,
  CITY_3D_SELECTED,
  cityPositionToWorld,
  districtPads,
} from "@/lib/city-3d";
import { CITY_CATEGORY_LABEL } from "@/lib/city-map";
import type { CityLocation } from "@/types/city-location";

const CAMERA_START: [number, number, number] = [14, 16, 14];

interface CityCanvasProps {
  locations: CityLocation[];
  selectedId?: string | null;
}

export function CityCanvas({ locations, selectedId }: CityCanvasProps) {
  const router = useRouter();
  const controls = useRef<OrbitControlsImpl>(null);

  const pads = useMemo(() => districtPads(locations), [locations]);
  const hub = locations.find((item) => item.id === "loc-central") ?? locations[0];

  function select(id: string) {
    router.replace(`/city?loc=${id}`, { scroll: false });
  }

  function resetView() {
    controls.current?.reset();
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      <div className="h-56 touch-none md:h-[min(36rem,70vh)]" role="img" aria-label="Interactive 3D map of Tharun City">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
          camera={{ position: CAMERA_START, fov: 38, near: 0.1, far: 80 }}
          onCreated={({ scene }) => {
            scene.background = new Color(CITY_3D_GROUND);
            scene.fog = new Fog(CITY_3D_GROUND, 22, 46);
          }}
          onPointerMissed={() => undefined}
        >
          <ambientLight intensity={0.55} />
          <hemisphereLight args={["#c4b58a", "#121417", 0.35]} />
          <directionalLight position={[8, 14, 6]} intensity={0.85} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow={false}>
            <planeGeometry args={[24, 24]} />
            <meshStandardMaterial color={CITY_3D_GROUND} roughness={0.92} metalness={0.08} />
          </mesh>
          {pads.map((pad) => (
            <mesh
              key={pad.category}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[pad.x, 0.01, pad.z]}
            >
              <planeGeometry args={[pad.width, pad.depth]} />
              <meshStandardMaterial color={CITY_3D_PAD} roughness={0.88} transparent opacity={0.92} />
            </mesh>
          ))}
          {hub
            ? locations
                .filter((item) => item.id !== hub.id)
                .map((item) => (
                  <Road key={`road-${item.id}`} from={hub} to={item} />
                ))
            : null}
          {locations.map((location, index) => (
            <LocationBuilding
              key={location.id}
              location={location}
              selected={location.id === selectedId}
              index={index}
              onSelect={select}
            />
          ))}
          <OrbitControls
            ref={controls}
            makeDefault
            enableDamping
            dampingFactor={0.1}
            minDistance={10}
            maxDistance={26}
            minPolarAngle={Math.PI / 4.4}
            maxPolarAngle={Math.PI / 2.55}
            minAzimuthAngle={-Math.PI / 5}
            maxAzimuthAngle={Math.PI / 5}
            enablePan
            screenSpacePanning
          />
        </Canvas>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] px-3 py-2">
        <p className="text-xs text-[var(--muted)]">
          Hover to label. Click to inspect. Drag to pan. Scroll to zoom.
        </p>
        <button
          type="button"
          className="rounded-md border border-[var(--border)] px-2 py-1 text-xs hover:bg-[var(--panel-hover)]"
          onClick={resetView}
        >
          Reset view
        </button>
      </div>
    </div>
  );
}

function Road({ from, to }: { from: CityLocation; to: CityLocation }) {
  const a = cityPositionToWorld(from.position);
  const b = cityPositionToWorld(to.position);
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const length = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  return (
    <mesh position={[(a.x + b.x) / 2, 0.03, (a.z + b.z) / 2]} rotation={[0, angle, 0]}>
      <boxGeometry args={[0.12, 0.02, length]} />
      <meshStandardMaterial color={CITY_3D_ROAD} roughness={0.8} />
    </mesh>
  );
}

function LocationBuilding({
  location,
  selected,
  index,
  onSelect,
}: {
  location: CityLocation;
  selected: boolean;
  index: number;
  onSelect: (id: string) => void;
}) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const world = cityPositionToWorld(location.position);
  const height = CITY_3D_BUILDING_HEIGHT[location.category];
  const planned = location.status === "planned";
  const color = selected
    ? CITY_3D_SELECTED
    : planned
      ? CITY_3D_PLANNED
      : CITY_3D_BUILDING_COLOR[location.category];
  const reduceMotion = useReducedMotion();

  useFrame((state) => {
    if (!group.current || reduceMotion) {
      return;
    }
    const bob = Math.sin(state.clock.elapsedTime * 0.55 + index) * 0.035;
    group.current.position.y = bob;
  });

  function down(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    pointer.current = { x: event.clientX, y: event.clientY };
  }

  function click(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    if (Math.hypot(dx, dy) > 8) {
      return;
    }
    onSelect(location.id);
  }

  return (
    <group ref={group} position={[world.x, 0, world.z]}>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.15, 0.08, 1.15]} />
        <meshStandardMaterial color="#0e1013" roughness={0.9} />
      </mesh>
      <mesh
        position={[0, height / 2 + 0.08, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onPointerDown={down}
        onClick={click}
      >
        <boxGeometry args={[0.85, height, 0.85]} />
        <meshStandardMaterial
          color={color}
          roughness={0.62}
          metalness={selected ? 0.22 : 0.08}
          emissive={selected || hovered ? CITY_3D_SELECTED : "#000000"}
          emissiveIntensity={selected ? 0.28 : hovered ? 0.12 : 0}
        />
      </mesh>
      <mesh position={[0, height + 0.22, 0]}>
        <coneGeometry args={[0.52, 0.28, 4]} />
        <meshStandardMaterial color={selected ? CITY_3D_SELECTED : "#2a2f36"} roughness={0.7} />
      </mesh>
      {hovered || selected ? (
        <Html position={[0, height + 0.7, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="rounded border border-[var(--border)] bg-[var(--panel)] px-2 py-1 text-[10px] whitespace-nowrap text-[var(--text)] shadow">
            {location.name}
            <span className="ml-1 text-[var(--muted)]">
              {CITY_CATEGORY_LABEL[location.category]}
            </span>
          </div>
        </Html>
      ) : null}
    </group>
  );
}
