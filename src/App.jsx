import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { ScrollControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas camera={{ position: [0, 1, 5], fov: 75 }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={5} damping={0.3}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
