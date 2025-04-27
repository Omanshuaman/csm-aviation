import { Float, CameraControls, Line, OrbitControls } from "@react-three/drei";
import { Jet } from "./Jet";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import CloudsGroup from "./Clouds";
import { Perf } from "r3f-perf";
import { Background } from "./Background";
import { useMemo } from "react";
const LINE_NB_POINTS = 200;
export const Experience = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  // const linePoints = useMemo(() => {
  //   return curve.getPoints(LINE_NB_POINTS);
  // }, [curve]);

  const shape = useMemo(() => {
    return new THREE.Shape().moveTo(0, -0.2).lineTo(0, 0.2);
  }, []);
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={Math.PI / 3} />
      <Float floatIntensity={2} rotationIntensity={0} speed={2}>
        <Jet scale={0.4} rotation-y={Math.PI * 1} rotation-x={Math.PI * 0.01} />
      </Float>
      <group position-y={-2}>
        {/* <Line
          points={linePoints}
          color="lightblue"
          linewidth={16}
          opacity={0.7}
          transparent
        /> */}
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}>
            <meshStandardMaterial color="lightblue" opacity={0.7} transparent />
          </extrudeGeometry>
        </mesh>
      </group>

      <Background />

      <CloudsGroup />
    </>
  );
};
