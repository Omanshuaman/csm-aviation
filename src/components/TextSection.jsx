import { Text, RoundedBox } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

export const TextSection = (props) => {
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
        />
      </mesh>

      {/* Coral inside bubble (placeholder) */}
      <mesh position={[0, 2.8, 0]}>
        <coneGeometry args={[0.3, 0.6, 12]} />
        <meshStandardMaterial color="#ff9966" />
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
        Energy Levels
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
        />
      </RoundedBox>

      {/* Subtitle 1 */}
      <Text
        position={[0, 0.6, 0.06]}
        fontSize={0.12}
        color="#3e4c59"
        maxWidth={2.5}
        anchorX="center"
        anchorY="middle"
        font="./fonts/DMSerifDisplay-Regular.ttf"
        textAlign="center">
        Rich in vitamins and minerals like iron{"\n"}that increase energy
        levels.
        <meshStandardMaterial
          color="#3e4c59"
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>

      {/* Subtitle 2 */}
      <Text
        position={[0, -0.1, 0.06]}
        fontSize={0.12}
        color="#3e4c59"
        maxWidth={2.5}
        anchorX="center"
        anchorY="middle"
        font="./fonts/DMSerifDisplay-Regular.ttf"
        textAlign="center">
        Anti-inflammatory properties reduce{"\n"}risk of fatigue.
        <meshStandardMaterial
          color="#3e4c59"
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
    </group>
  );
};
