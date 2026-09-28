"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { CameraPose } from "@/lib/city-3d";

interface CityCameraRigProps {
  pose: CameraPose;
  reducedMotion: boolean;
  resetKey: string;
  controls: RefObject<OrbitControlsImpl | null>;
}

export function CityCameraRig({ pose, reducedMotion, resetKey, controls }: CityCameraRigProps) {
  const { camera } = useThree();
  const flying = useRef(true);
  const desiredPos = useRef(new Vector3(...pose.position));
  const desiredTarget = useRef(new Vector3(...pose.target));

  useEffect(() => {
    desiredPos.current.set(...pose.position);
    desiredTarget.current.set(...pose.target);
    flying.current = true;
  }, [pose, resetKey]);

  useFrame((_, delta) => {
    const ctrl = controls.current;
    if (!ctrl) {
      return;
    }
    if (!flying.current) {
      ctrl.enabled = true;
      return;
    }
    ctrl.enabled = false;
    const speed = reducedMotion ? 12 : 2.15;
    const t = 1 - Math.exp(-speed * delta);
    camera.position.lerp(desiredPos.current, t);
    ctrl.target.lerp(desiredTarget.current, t);
    ctrl.update();
    if (
      camera.position.distanceTo(desiredPos.current) < 0.12 &&
      ctrl.target.distanceTo(desiredTarget.current) < 0.12
    ) {
      camera.position.copy(desiredPos.current);
      ctrl.target.copy(desiredTarget.current);
      flying.current = false;
      ctrl.enabled = true;
    }
  });

  return null;
}
