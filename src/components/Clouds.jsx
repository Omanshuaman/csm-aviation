import React from "react";
import { Clouds, Cloud, Sky as SkyImpl } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { p } from "framer-motion/client";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
function CloudsGroup({ ...props }) {
  const ref = useRef();
  const cloud0 = useRef();
  const {
    positionx,
    positiony,
    positionz,
    seed,
    volume,
    bounds,
    color,
    opacity,
    scale,
  } = useControls("clouds", {
    seed: { value: 13, min: 1, max: 100, step: 1 },
    bounds: { value: 150, min: 1, max: 500, step: 1 },
    volume: { value: 120, min: 0, max: 500, step: 1 },
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    positionx: {
      value: 3,
      min: -100,
      max: 100,
      step: 1,
    },
    positiony: {
      value: 100,
      min: -100,
      max: 100,
      step: 1,
    },
    positionz: {
      value: -300,
      min: -300,
      max: 100,
      step: 1,
    },

    scale: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    color: "white",
  });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    ref.current.rotation.y = Math.sin(time * 0.1) * 0.05;
  });
  return (
    <>
      <group ref={ref} onBeforeCompile={fadeOnBeforeCompile}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400}>
          <Cloud
            color={color}
            seed={seed}
            position={[positionx, positiony, positionz]}
            volume={volume}
            bounds={bounds}
            scale={scale}
            opacity={opacity}
          />
        </Clouds>
      </group>
    </>
  );
}

export default CloudsGroup;
