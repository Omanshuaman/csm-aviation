import React from "react";
import { Clouds, Cloud, Sky as SkyImpl } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
function CloudsGroup() {
  const ref = useRef();
  const cloud0 = useRef();
  const { color, x, y, z, range, positionx, positiony, positionz } =
    useControls("clouds", {
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
      positionx: { value: -12, min: -100, max: 100, step: 1 },
      positiony: { value: -28, min: -100, max: 100, step: 1 },
      positionz: { value: -31, min: -100, max: 100, step: 1 },
    });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    ref.current.rotation.y = Math.cos(time * 0.1) * 0.05;
  });
  return (
    <>
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={range}>
          <Cloud
            color="#ffccdd"
            seed={2}
            position={[positionx, positiony, positionz]}
            volume={10}
            bounds={40}
          />
          <Cloud
            color="#ffccdd"
            seed={2}
            position={[positionx + 20, positiony + 4, positionz - 30]}
            volume={50}
            bounds={40}
          />
        </Clouds>
      </group>
    </>
  );
}

export default CloudsGroup;
