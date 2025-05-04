import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Overlay } from "./components/Overlay";

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={50} damping={0.2}>
          <Experience />
          {/* <Scroll html>
            <Interface />
          </Scroll> */}
        </ScrollControls>
        <EffectComposer></EffectComposer>
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
