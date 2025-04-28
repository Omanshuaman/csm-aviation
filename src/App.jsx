import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { ScrollControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={10} damping={1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
