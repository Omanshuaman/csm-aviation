import { Text, RoundedBox } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

export const TextSection = (props) => {
  // Load the texture for the plane
  const texture = useLoader(TextureLoader, props.texture);
  console.log(props.texture);
  return (
    <group position={[-5, 1, -100]} {...props}>
      {/* Floating Bubble */}
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.3}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </mesh>

      {/* Plane with texture */}
      <mesh position={[0, 2.8, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.3}
          metalness={0.1}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 1.5, 0.06]}
        fontSize={0.3}
        color="#3e4c59"
        anchorX="center"
        anchorY="middle"
        font="./fonts/DMSerifDisplay-Regular.ttf"
        textAlign="center">
        {props.title}
        <meshStandardMaterial
          color="#3e4c59"
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>

      {/* Glass-like container */}
      <RoundedBox
        args={[3.5, 2, 0.05]}
        radius={0.2}
        smoothness={4}
        position={[0, 0.3, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={0.3}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </RoundedBox>

      {/* Subtitle 1 */}
      <Text
        position={[0, 0.4, 0.06]}
        fontSize={0.15}
        color="#3e4c59"
        maxWidth={2.5}
        anchorX="center"
        anchorY="middle"
        font="./fonts/DMSerifDisplay-Regular.ttf"
        textAlign="center">
        {props.subtitle}
        <meshStandardMaterial
          color="#3e4c59"
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
    </group>
  );
};
