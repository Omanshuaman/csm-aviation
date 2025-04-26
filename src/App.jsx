import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 1, 5], fov: 75 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
