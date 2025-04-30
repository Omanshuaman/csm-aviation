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
    bounds: { value: 12, min: 1, max: 50, step: 1 },
    volume: { value: 33, min: 0, max: 50, step: 1 },
    opacity: { value: 0.23, min: 0, max: 1, step: 0.01 },
    color: "white",
  });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.01;
  });
  return (
    <>
      <group ref={ref} onBeforeCompile={fadeOnBeforeCompile}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400}>
          <Cloud
            color={color}
            seed={props.seed}
            position={props.position}
            volume={volume}
            bounds={bounds}
            scale={props.scale}
            opacity={opacity}
            rotation={props.rotation}
          />
        </Clouds>
      </group>
    </>
  );
}

export default CloudsGroup;
