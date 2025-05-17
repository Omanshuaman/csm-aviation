import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  Color,
  PCFSoftShadowMap,
  sRGBEncoding,
  TextureLoader,
} from "three";

import * as THREE from "three";
import { useRef } from "react";
function Earth() {
  return (
    <>
      {/* <div className="sun-background"></div>
      <div className="moon-background"></div> */}
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: ACESFilmicToneMapping,
          outputEncoding: sRGBEncoding,
          physicallyCorrectLights: true,
          shadowMapEnabled: true,
          shadowMapType: PCFSoftShadowMap,
        }}>
        <color attach="background" args={["ivory"]} />
        {/* Camera */}
        <PerspectiveCamera
          makeDefault
          position={[0, 15, 50]}
          fov={45}
          near={0.1}
          far={1000}
        />

        {/* Directional Light */}
        <directionalLight
          color="#ffffff"
          intensity={3.5}
          position={[10, 20, 10]}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-near={0.5}
          shadow-camera-far={100}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <TexturedSphere />
        {/* <EnvironmentMap /> */}
        <Environment preset="apartment" intensity={0.1} />

        {/* Add lights, objects, etc. here */}
      </Canvas>
    </>
  );
}
function TexturedSphere() {
  const sphereRef = useRef();
  const bump = useLoader(TextureLoader, "/textures/earthbump.jpg");
  const map = useLoader(TextureLoader, "/textures/earthmap.jpg");
  const spec = useLoader(TextureLoader, "/textures/earthspec.jpg");
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(0, 0, 0); // Center of the sphere
  });
  useFrame((state) => {
    sphereRef.current.rotation.y += 0.002;
  });
  return (
    <mesh receiveShadow ref={sphereRef}>
      <sphereGeometry args={[10, 70, 70]} />
      <meshPhysicalMaterial
        map={map}
        roughnessMap={spec}
        bumpMap={bump}
        bumpScale={0.05}
        sheen={1}
        sheenRoughness={0.75}
        sheenColor={new Color("#ff8a00").convertSRGBToLinear()}
        clearcoat={0.5}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

export default Earth;
