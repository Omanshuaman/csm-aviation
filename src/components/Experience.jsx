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

        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-2, 0, -10),
        new THREE.Vector3(-5, 0, -20),
        new THREE.Vector3(-4, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
        new THREE.Vector3(5, 0, -110),
        new THREE.Vector3(5, 0, -130),
        new THREE.Vector3(10, 0, -140),
      ],
      false,
      "catmullrom",
      0.5 // Max tension for very smooth large curves
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
  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xDisplacement = pointAhead.x - curPoint.x * 80;
    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 12);
    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angleRotation
      )
    );
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  const airplane = useRef();

  return (
    <>
      {/* <OrbitControls /> */}
      {!isProduction && <Perf position="top-left" />}
      <group ref={cameraGroup}>
        <PerspectiveCamera position={[0, 1, 5]} fov={75} makeDefault />
        <ambientLight intensity={Math.PI / 3} />
        <group ref={airplane}>
          <Float floatIntensity={2} rotationIntensity={0} speed={2}>
            <Airplane
              scale={0.002}
              rotation-y={Math.PI * 1}
              rotation-x={Math.PI * 0.01}
            />
          </Float>
        </group>
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
