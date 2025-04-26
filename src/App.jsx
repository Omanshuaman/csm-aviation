import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas camera={{ position: [0, 1, 5], fov: 75 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
