import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three";
import { usePlay } from "../contexts/Play";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { Airplane } from "../components/Airplane";
import { Background } from "../components/Background";
import { Cloud } from "../components/Cloud";
import { TextSection } from "../components/TextSection";
const isProduction = window.location.protocol === "https:";
import { Perf } from "r3f-perf";
import CloudsGroup from "../components/CloudGroup";
import { Speed } from "../components/Speed";
import { City } from "../components/City";
import { useControls } from "leva";

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 62;

export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -5 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x - 6,
          curvePoints[1].y + 1,
          curvePoints[1].z + CURVE_DISTANCE / 2
        ),
        texture: "/images/pilot.jpg",
        title: "Wholesale - Jet Brokers",
        subtitle: `24/7 Responsive Air Charter service, providing air charter solutions. From intake to booking to wheels down and final ground transportation; constant communication and transparency every step of the way is our standard routine.`,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x + 2,
          curvePoints[2].y,
          curvePoints[2].z
        ),
        texture: "/images/jetcenter.jpg",
        title: "Charter Services",
        subtitle: `Experience 24/7 on-demand private jet charters, offering direct flights from Central California to destinations across the U.S., including Las Vegas and Reno.`,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x - 3,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        texture: "/images/medical.jpg",

        title: "Medical Charter",
        subtitle: `We are proud to provide medavac air charter service to the Organ Donor community; providing On-Demand Air Medical Transportation services for over ten years with a perfect safety record.`,
      },
    ];
  }, []);
  const clouds = useMemo(
    () => [
      // SECOND POINT
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[2].x + 6,
          curvePoints[2].y - 7,
          curvePoints[2].z + 50
        ),
      },
      {
        scale: new Vector3(2, 2, 2),
        position: new Vector3(
          curvePoints[2].x - 2,
          curvePoints[2].y + 4,
          curvePoints[2].z - 26
        ),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[2].x + 12,
          curvePoints[2].y + 1,
          curvePoints[2].z - 86
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
      },
      // THIRD POINT
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x + 3,
          curvePoints[3].y - 10,
          curvePoints[3].z + 50
        ),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x - 10,
          curvePoints[3].y,
          curvePoints[3].z + 30
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[3].x - 20,
          curvePoints[3].y - 5,
          curvePoints[3].z - 8
        ),
        rotation: new Euler(Math.PI, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[3].x + 0,
          curvePoints[3].y - 5,
          curvePoints[3].z - 98
        ),
        rotation: new Euler(0, Math.PI / 3, 0),
      },
      // FOURTH POINT
      {
        scale: new Vector3(2, 2, 2),
        position: new Vector3(
          curvePoints[4].x + 3,
          curvePoints[4].y - 10,
          curvePoints[4].z + 2
        ),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x + 24,
          curvePoints[4].y - 6,
          curvePoints[4].z - 42
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x - 4,
          curvePoints[4].y + 9,
          curvePoints[4].z - 62
        ),
        rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
      },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll, end, setEnd } = usePlay();

  const airplane = useRef();
  const ambientLightRef = useRef();

  const tl = useRef();
  const backgroundColors = useRef({
    colorA: "#3535cc",
    colorB: "#abaadd",
  });

  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // Day (Sky Blue)
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#87ceeb", // Sky Blue
      colorB: "#ffffff", // White clouds
    });

    // Sunset
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#ffd54f", // Warm yellow
      colorB: "#ff7043", // Orange-pink sunset
    });

    // Light Night (moonlit)
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#a3bce2", // Pale moonlight blue
      colorB: "#c1b6dd", // Soft lavender glow
    });

    // Night Sky (Deep blues)
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#0d1b2a", // Deep navy
      colorB: "#1b263b", // Dimmed blue
    });

    tl.current.pause();

    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(airplane.current.position, {
      duration: 1,
      z: -1000,
    });
  }, []);

  useEffect(() => {
    if (play) {
      planeInTl.current.play();
    }
  }, [play]);
  const { positionx, positiony, positionz, scale } = useControls("city", {
    positionx: {
      value: 0,
      min: -100,
      max: 100,
      step: 1,
    },
    positiony: {
      value: 0,
      min: -100,
      max: 100,
      step: 1,
    },
    positionz: {
      value: 0,
      min: -100,
      max: 100,
      step: 1,
    },
    scale: {
      value: 0.0014,
      min: 0.001,
      max: 0.02,
      step: 0.001,
    },
  });
  return useMemo(
    () => (
      <>
        <OrbitControls />
        <group ref={cameraGroup}>
          <Background backgroundColors={backgroundColors} />
          <Speed />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 1, 4]}
              fov={75}
              makeDefault
            />
          </group>
          <ambientLight ref={ambientLightRef} intensity={Math.PI / 8} />
          <group ref={airplane}>
            <Float floatIntensity={3} rotationIntensity={0} speed={3}>
              <Airplane
                scale={0.0014}
                rotation-y={Math.PI * 1}
                rotation-x={Math.PI * 0.01}
              />
            </Float>
          </group>
          <City scale={0.002} position={[-400, 10, -700]} />
        </group>
      </>
    ),
    []
  );
};
