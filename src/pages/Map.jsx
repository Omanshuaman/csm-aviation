import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";

import { Leva } from "leva";
import { Experience } from "./Experience";
import { usePlay } from "../contexts/Play";

function Map() {
  const { play, end } = usePlay();

  return (
    <>
      <Leva collapsed />

      <Canvas shadows>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls
          pages={play && !end ? 20 : 0}
          damping={0}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}>
          <Experience />
        </ScrollControls>
        <EffectComposer>
          <Noise opacity={0.1} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default Map;
