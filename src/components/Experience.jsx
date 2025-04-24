import { OrbitControls, Float } from "@react-three/drei";
import { Background } from "./Background";
import { Jet } from "./Jet";
export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Background />
      <Float floatIntensity={1.5} rotationIntensity={0.5} speed={2}>
        <Jet scale={0.4} rotation-y={Math.PI * 1} rotation-x={Math.PI * 0.01} />
      </Float>
    </>
  );
};
//fff