import React from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

export function City(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF("/models/city.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="RootNode"
          position={[361041.969, -52298.43, 0]}
          rotation={[-Math.PI / 2, 0.007, -Math.PI]}>
          <group
            name="Group003"
            position={[101304.773, 152841.875, 1163.719]}
            rotation={[0.029, 1.047, 1.538]}
            scale={0.79}>
            <group
              name="Group002"
              position={[74230.781, -109075.359, 188924.063]}
              scale={92.945}>
              <group name="Group001" position={[-924.357, 757.352, 1436.709]}>
                <group name="Box001" position={[-20.128, -108.791, -2560.641]}>
                  <mesh
                    name="Box001_roads_secondary_0"
                    geometry={nodes.Box001_roads_secondary_0.geometry}
                    material={materials["MOSCOW_TEST.FBX"]}
                  />
                </group>
              </group>
              <group name="T" position={[-924.357, 757.352, 1436.709]}>
                <group
                  name="Object_263"
                  position={[-20.128, -108.791, -2560.641]}>
                  <mesh
                    name="T_f8f8fa_0"
                    geometry={nodes.T_f8f8fa_0.geometry}
                    material={materials["MOSCOW_TEST.FBX"]}
                  />
                </group>
              </group>
            </group>
            <group
              name="bloks"
              position={[-11683.563, -38683.309, 322458.813]}
              scale={92.945}>
              <mesh
                name="bloks_bloks_mat_0"
                geometry={nodes.bloks_bloks_mat_0.geometry}
                material={materials["MOSCOW_TEST.FBX"]}
              />
            </group>
            <group
              name="Object001"
              position={[-11683.563, -38683.309, 322458.813]}
              scale={92.945}>
              <group
                name="Object_274"
                position={[-20.128, -108.791, -2560.641]}>
                <mesh
                  name="Object001_BLD_0"
                  geometry={nodes.Object001_BLD_0.geometry}
                  material={materials["MOSCOW_TEST.FBX"]}
                />
              </group>
            </group>
          </group>
        </group>
        <mesh
          name="Cube_Material_0"
          geometry={nodes.Cube_Material_0.geometry}
          material={materials["MOSCOW_TEST.FBX"]}
          position={[361041.969, -52298.43, 0]}
          rotation={[-Math.PI / 2, 0.007, Math.PI]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/city.glb");
