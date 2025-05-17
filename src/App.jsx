import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";
import { Leva } from "leva";
import Interface from "./components/Interface";
import Earth from "./components/Earth";

function SceneOne() {
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
          {/* <Scroll html>
            <Interface />
          </Scroll> */}
        </ScrollControls>
        <EffectComposer>
          <Noise opacity={0.1} />
        </EffectComposer>
      </Canvas>
      <Overlay />
    </>
  );
}

function App() {
  return (
    <div className="scroll-container">
      <section className="scene-section">
        <SceneOne />
      </section>
      <section className="scene-section">
        <Earth />
      </section>
    </div>
  );
}
export default App;
