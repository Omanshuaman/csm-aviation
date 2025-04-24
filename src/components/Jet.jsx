import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Jet(props) {
  const { nodes, materials } = useGLTF("/models/Jet.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Jet_mesh.geometry}
        material={materials.Jet_mat1}
      />
    </group>
  );
}

useGLTF.preload("/models/Jet.glb");
