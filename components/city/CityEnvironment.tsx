"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { InstancedMesh, Object3D } from "three";
import {
  CITY_3D_CENTERLINE,
  CITY_3D_CURB,
  CITY_3D_GRASS,
  CITY_3D_GROUND,
  CITY_3D_MARKING,
  CITY_3D_PAD,
  CITY_3D_ROAD,
  CITY_3D_SIDEWALK,
  CITY_ROAD_HALF,
  CITY_ROAD_LINES,
  CITY_ROAD_SPAN,
  lampPositions,
  treePositions,
  type DistrictPad,
} from "@/lib/city-3d";

const dummy = new Object3D();

interface CityEnvironmentProps {
  pads: DistrictPad[];
  compact: boolean;
}

export function CityEnvironment({ pads, compact }: CityEnvironmentProps) {
  const lamps = useMemo(() => lampPositions(compact), [compact]);
  const trees = useMemo(() => treePositions(compact), [compact]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <planeGeometry args={[48, 48]} />
        <meshStandardMaterial color={CITY_3D_GROUND} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[7.2, 7.2]} />
        <meshStandardMaterial color={CITY_3D_GRASS} roughness={0.9} />
      </mesh>
      {pads.map((pad) => (
        <mesh
          key={pad.category}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[pad.x, 0.008, pad.z]}
        >
          <planeGeometry args={[pad.width, pad.depth]} />
          <meshStandardMaterial color={CITY_3D_PAD} roughness={0.88} />
        </mesh>
      ))}
      {CITY_ROAD_LINES.map((line) => (
        <group key={`ns-${line}`}>
          <mesh position={[line, 0.02, 0]}>
            <boxGeometry args={[CITY_ROAD_HALF * 2, 0.04, CITY_ROAD_SPAN]} />
            <meshStandardMaterial color={CITY_3D_ROAD} roughness={0.78} />
          </mesh>
          <mesh position={[line - CITY_ROAD_HALF - 0.28, 0.03, 0]}>
            <boxGeometry args={[0.45, 0.05, CITY_ROAD_SPAN]} />
            <meshStandardMaterial color={CITY_3D_SIDEWALK} roughness={0.86} />
          </mesh>
          <mesh position={[line + CITY_ROAD_HALF + 0.28, 0.03, 0]}>
            <boxGeometry args={[0.45, 0.05, CITY_ROAD_SPAN]} />
            <meshStandardMaterial color={CITY_3D_SIDEWALK} roughness={0.86} />
          </mesh>
          <mesh position={[line - CITY_ROAD_HALF - 0.52, 0.045, 0]}>
            <boxGeometry args={[0.12, 0.08, CITY_ROAD_SPAN]} />
            <meshStandardMaterial color={CITY_3D_CURB} roughness={0.8} />
          </mesh>
          <mesh position={[line + CITY_ROAD_HALF + 0.52, 0.045, 0]}>
            <boxGeometry args={[0.12, 0.08, CITY_ROAD_SPAN]} />
            <meshStandardMaterial color={CITY_3D_CURB} roughness={0.8} />
          </mesh>
          <mesh position={[line, 0.041, 0]}>
            <boxGeometry args={[0.06, 0.01, CITY_ROAD_SPAN]} />
            <meshStandardMaterial color={CITY_3D_CENTERLINE} roughness={0.5} />
          </mesh>
        </group>
      ))}
      {CITY_ROAD_LINES.map((line) => (
        <group key={`ew-${line}`}>
          <mesh position={[0, 0.021, line]}>
            <boxGeometry args={[CITY_ROAD_SPAN, 0.04, CITY_ROAD_HALF * 2]} />
            <meshStandardMaterial color={CITY_3D_ROAD} roughness={0.78} />
          </mesh>
          <mesh position={[0, 0.031, line - CITY_ROAD_HALF - 0.28]}>
            <boxGeometry args={[CITY_ROAD_SPAN, 0.05, 0.45]} />
            <meshStandardMaterial color={CITY_3D_SIDEWALK} roughness={0.86} />
          </mesh>
          <mesh position={[0, 0.031, line + CITY_ROAD_HALF + 0.28]}>
            <boxGeometry args={[CITY_ROAD_SPAN, 0.05, 0.45]} />
            <meshStandardMaterial color={CITY_3D_SIDEWALK} roughness={0.86} />
          </mesh>
        </group>
      ))}
      {CITY_ROAD_LINES.flatMap((x) =>
        CITY_ROAD_LINES.map((z) => (
          <Crossing key={`x-${x}-${z}`} x={x} z={z} />
        )),
      )}
      <InstancedCones positions={trees} color="#3d4a40" args={[0.42, 1.15, 6]} y={0.95} />
      <InstancedBoxes
        positions={trees.map(([x, , z]) => [x, 0.28, z] as [number, number, number])}
        color="#4a3c32"
        size={[0.16, 0.55, 0.16]}
      />
      <InstancedBoxes
        positions={lamps}
        color="#2a2f36"
        size={[0.08, 1.6, 0.08]}
        y={0.8}
      />
      <InstancedBoxes
        positions={lamps.map(([x, , z]) => [x, 1.55, z] as [number, number, number])}
        color="#c4b58a"
        size={[0.22, 0.08, 0.22]}
      />
      {!compact ? (
        <>
          <mesh position={[-1.4, 0.18, 1.6]}>
            <boxGeometry args={[0.9, 0.12, 0.28]} />
            <meshStandardMaterial color="#3a3f46" />
          </mesh>
          <mesh position={[1.5, 0.18, -1.5]}>
            <boxGeometry args={[0.9, 0.12, 0.28]} />
            <meshStandardMaterial color="#3a3f46" />
          </mesh>
        </>
      ) : null}
    </group>
  );
}

function Crossing({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0.05, z]}>
      {[-0.45, -0.15, 0.15, 0.45].map((offset) => (
        <mesh key={offset} position={[offset, 0, 0]}>
          <boxGeometry args={[0.18, 0.012, 1.7]} />
          <meshStandardMaterial color={CITY_3D_MARKING} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function InstancedCones({
  positions,
  color,
  args,
  y = 0,
}: {
  positions: [number, number, number][];
  color: string;
  args: [number, number, number];
  y?: number;
}) {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) {
      return;
    }
    positions.forEach((point, index) => {
      dummy.position.set(point[0], y, point[2]);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [positions, y]);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, positions.length]}>
      <coneGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </instancedMesh>
  );
}

function InstancedBoxes({
  positions,
  color,
  size,
  y,
}: {
  positions: [number, number, number][];
  color: string;
  size: [number, number, number];
  y?: number;
}) {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) {
      return;
    }
    positions.forEach((point, index) => {
      dummy.position.set(point[0], y ?? point[1], point[2]);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [positions, y]);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, positions.length]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </instancedMesh>
  );
}
