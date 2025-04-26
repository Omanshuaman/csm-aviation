import { Float, CameraControls } from "@react-three/drei";
import { Jet } from "./Jet";
import { Sky } from "@react-three/drei";

import CloudsGroup from "./Clouds";
import { Perf } from "r3f-perf";
import { Background } from "./Background";
export const Experience = () => {
  return (
    <>
      <Perf position="top-left" />
      <CameraControls />
      {/* <Sky /> */}

      <ambientLight intensity={Math.PI / 3} />

      <Float floatIntensity={2} rotationIntensity={0} speed={2}>
        <Jet scale={0.4} rotation-y={Math.PI * 1} rotation-x={Math.PI * 0.01} />
      </Float>
      <Background />

      <CloudsGroup />
    </>
  );
};
