import React from "react";
import { Clouds, Cloud, Sky as SkyImpl } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
function CloudsGroup() {
  const ref = useRef();
  const cloud0 = useRef();
  const { color, x, y, z, range, ...config } = useControls("clouds", {
    seed: { value: 1, min: 1, max: 100, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 },
    volume: { value: 6, min: 0, max: 100, step: 0.1 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    fade: { value: 10, min: 0, max: 400, step: 1 },
    growth: { value: 100, min: 0, max: 20, step: 1 },
    speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
    x: { value: 6, min: 0, max: 100, step: 1 },
    y: { value: 1, min: 0, max: 100, step: 1 },
    z: { value: 1, min: 0, max: 100, step: 1 },
    color: "white",
  });
  const { positionx, positiony, positionz, distance, inclination, azimuth } =
    useControls("sky", {
      positionx: {
        value: 0,
        min: -20,
        max: 20,
        step: 0.1,
      },
      positiony: {
        value: 20,
        min: -20,
        max: 20,
        step: 0.1,
      },
      positionz: {
        value: 20,
        min: -20,
        max: 20,
        step: 0.1,
      },
    });
  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 32;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 32;
  });
  return (
    <>
      <SkyImpl sunPosition={[positionx, positiony, positionz]} />
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={range}>
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color="#ffccdd"
            seed={2}
            position={[15, 0, 0]}
          />

          <Cloud
            concentrate="outside"
            growth={100}
            color="#ffccdd"
            opacity={1.25}
            seed={0.3}
            bounds={300}
            volume={200}
          />
        </Clouds>
      </group>
    </>
  );
}

export default CloudsGroup;
