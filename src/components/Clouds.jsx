import React from "react";
import { Clouds, Cloud, Sky as SkyImpl } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
function CloudsGroup() {
  const ref = useRef();
  const cloud0 = useRef();
  const {
    range,
    positionx,
    positiony,
    positionz,
    seed,
    volume,
    bounds,
    color,
    opacity,
  } = useControls("clouds", {
    seed: { value: 3, min: 1, max: 100, step: 1 },
    bounds: { value: 794, min: 1, max: 1000, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 },
    volume: { value: 530, min: 0, max: 1000, step: 10 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    color: "#baadad",
    positionx: { value: -7, min: -100, max: 100, step: 1 },
    positiony: { value: 50, min: -100, max: 100, step: 1 },
    positionz: { value: -300, min: -500, max: 100, step: 1 },
  });

  // useFrame((state, delta) => {
  //   const time = state.clock.getElapsedTime();
  //   ref.current.rotation.x = Math.sin(time * 0.1) * 0.2;
  //   ref.current.rotation.y = Math.cos(time * 0.1) * 0.2;
  // });
  return (
    <>
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={range}>
          <Cloud
            color={color}
            seed={3}
            position={[-7, -14, -48]}
            volume={50}
            bounds={11}
          />
          <Cloud
            color={color}
            seed={seed}
            position={[positionx, positiony, positionz]}
            volume={volume}
            bounds={bounds}
            opacity={opacity}
          />
        </Clouds>
      </group>
    </>
  );
}

export default CloudsGroup;
