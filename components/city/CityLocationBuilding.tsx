"use client";

import { Html } from "@react-three/drei";
import { type ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import {
  CITY_3D_BUILDING_COLOR,
  CITY_3D_PLANNED,
  CITY_3D_SELECTED,
  getCitySite,
} from "@/lib/city-3d";
import { CITY_CATEGORY_LABEL } from "@/lib/city-map";
import type { CityLocation } from "@/types/city-location";

interface CityLocationBuildingProps {
  location: CityLocation;
  selected: boolean;
  detailed: boolean;
  onSelect: (id: string) => void;
}

export function CityLocationBuilding({
  location,
  selected,
  detailed,
  onSelect,
}: CityLocationBuildingProps) {
  const site = getCitySite(location.id);
  const [hovered, setHovered] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  if (!site) {
    return null;
  }

  const planned = location.status === "planned";
  const color = planned ? CITY_3D_PLANNED : CITY_3D_BUILDING_COLOR[location.category];
  const storey = 0.55;
  const height = site.storeys * storey;
  const width = site.style === "hall" || site.style === "campus" ? 3.1 : 2.4;
  const depth = site.style === "studio" ? 2.1 : 2.35;

  function down(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    pointer.current = { x: event.clientX, y: event.clientY };
  }

  function click(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    if (Math.hypot(event.clientX - pointer.current.x, event.clientY - pointer.current.y) > 8) {
      return;
    }
    onSelect(location.id);
  }

  return (
    <group position={[site.x, 0, site.z]} rotation={[0, site.rotY, 0]}>
      {selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <ringGeometry args={[1.7, 2.15, 24]} />
          <meshStandardMaterial
            color={CITY_3D_SELECTED}
            emissive={CITY_3D_SELECTED}
            emissiveIntensity={0.35}
          />
        </mesh>
      ) : null}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[width + 0.35, 0.16, depth + 0.35]} />
        <meshStandardMaterial color="#2a2f36" roughness={0.9} />
      </mesh>
      <mesh
        position={[0, height / 2 + 0.16, 0]}
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
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={selected ? CITY_3D_SELECTED : color}
          roughness={site.style === "studio" ? 0.35 : 0.72}
          metalness={site.style === "studio" ? 0.28 : 0.06}
          emissive={selected || hovered ? CITY_3D_SELECTED : "#000000"}
          emissiveIntensity={selected ? 0.22 : hovered ? 0.1 : 0}
        />
      </mesh>
      <mesh position={[0, 0.42, depth / 2 + 0.02]}>
        <boxGeometry args={[0.42, 0.7, 0.08]} />
        <meshStandardMaterial color="#1a1d22" />
      </mesh>
      {site.style === "tower" ? (
        <mesh position={[0, height + 0.55, 0]}>
          <boxGeometry args={[0.18, 0.7, 0.18]} />
          <meshStandardMaterial color="#c4b58a" />
        </mesh>
      ) : (
        <mesh position={[0, height + 0.28, 0]}>
          <boxGeometry args={[width * 0.92, 0.18, depth * 0.92]} />
          <meshStandardMaterial color="#2a2f36" />
        </mesh>
      )}
      {site.style === "campus" ? (
        <mesh position={[width * 0.38, 0.55, 0]}>
          <boxGeometry args={[1.1, 1.1, depth * 0.7]} />
          <meshStandardMaterial color="#3d4a44" />
        </mesh>
      ) : null}
      {site.style === "hall" ? (
        <mesh position={[0, height + 0.2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[width * 0.55, 0.45, 4]} />
          <meshStandardMaterial color="#3f4a58" />
        </mesh>
      ) : null}
      {detailed
        ? Array.from({ length: site.storeys }, (_, floor) =>
            [-0.55, 0, 0.55].map((wx) => (
              <mesh
                key={`${floor}-${wx}`}
                position={[wx, 0.45 + floor * storey, depth / 2 + 0.02]}
              >
                <boxGeometry args={[0.28, 0.22, 0.04]} />
                <meshStandardMaterial
                  color="#0e1216"
                  emissive="#c4b58a"
                  emissiveIntensity={0.08}
                />
              </mesh>
            )),
          )
        : null}
      {hovered || selected ? (
        <Html position={[0, height + 1.1, 0]} center distanceFactor={12} style={{ pointerEvents: "none" }}>
          <div className="rounded border border-[var(--border)] bg-[var(--panel)] px-2 py-1 text-[10px] whitespace-nowrap text-[var(--text)]">
            {location.name}
            <span className="ml-1 text-[var(--muted)]">{CITY_CATEGORY_LABEL[location.category]}</span>
          </div>
        </Html>
      ) : null}
    </group>
  );
}
