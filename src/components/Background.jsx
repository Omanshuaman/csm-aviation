import { Environment, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Gradient, LayerMaterial } from "lamina";
import { useRef } from "react";

import * as THREE from "three";

export const Background = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sphere scale={[700, 700, 700]} rotation-y={Math.PI / 2}>
        <LayerMaterial
          lighting="physical"
          transmission={1}
          side={THREE.BackSide}>
          <Gradient
            colorB={"#357ca1"}
            colorA={"white"}
            axes={"y"}
            start={-0.8}
            end={0.2}
          />
        </LayerMaterial>
      </Sphere>
    </>
  );
};
