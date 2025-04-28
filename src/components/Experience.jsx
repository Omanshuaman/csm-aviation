import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
} from "@react-three/drei";
import * as THREE from "three";
import CloudsGroup from "./Clouds";
import { Perf } from "r3f-perf";
import { Background } from "./Background";
import { useMemo, useRef } from "react";
import { Airplane } from "./Airplane";
import { useFrame } from "@react-three/fiber";
const LINE_NB_POINTS = 2000;
export const Experience = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 10),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(-5, 0, -10),
        new THREE.Vector3(-10, 0, -20),
        new THREE.Vector3(-15, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(10, 0, -50),
        new THREE.Vector3(15, 0, -60),
        new THREE.Vector3(10, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(-5, 0, -90),
        new THREE.Vector3(0, 0, -100),
        new THREE.Vector3(5, 0, -150),
        new THREE.Vector3(-5, 0, -200),
        new THREE.Vector3(0, 0, -250),
        new THREE.Vector3(10, 0, -300),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);
  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    return new THREE.Shape().moveTo(0, -0.2).lineTo(0, 0.2);
  }, []);
  const isProduction = window.location.protocol === "https:";
  const cameraGroup = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    console.log("curPointIndex", curPointIndex, "curPoint", curPoint);

    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  return (
    <>
      {/* <OrbitControls /> */}
      {!isProduction && <Perf position="top-left" />}
      <group ref={cameraGroup}>
        <PerspectiveCamera position={[0, 1, 5]} fov={75} makeDefault />
        <ambientLight intensity={Math.PI / 3} />
        <Float floatIntensity={2} rotationIntensity={0} speed={2}>
          <Airplane
            scale={0.002}
            rotation-y={Math.PI * 1}
            rotation-x={Math.PI * 0.01}
          />
        </Float>
      </group>

      <group position-y={-5}>
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
