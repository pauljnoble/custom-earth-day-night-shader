// @ts-nocheck
// TODO - Fix type errors
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3, MathUtils } from "three";
import { EARTH_RADIUS } from "src/constants";

const LIGHT_OFFSET = EARTH_RADIUS * 2;

type Props = {
  sunCoordsRef: React.MutableRefObject<{ lat: number; lng: number }>;
  shouldOrbit: boolean;
}

const Lights = ({ sunCoordsRef, shouldOrbit }: Props) => {
  const light = useRef();
  const lightGroup = useRef();
  const transform = useRef();
  const orbitControls = useRef();
  const shouldAnimate = useRef(false);
  const animatePos = useRef(null);
  const initRef = useRef(false);
  const { gl } = useThree();

  const start = useRef(
    new Vector3(
      -LIGHT_OFFSET,
      LIGHT_OFFSET * (sunCoordsRef.current?.lat / 45),
      0
    )
  );

  useEffect(() => {
    if (transform?.current) {
      const controls = transform.current;
      controls.setMode("translate");

      const callback = (event) => {
        orbitControls.current.enabled = !event.value;
      };

      controls.addEventListener("dragging-changed", callback);
      return () => {
        controls.removeEventListener("dragging-changed", callback);
      };
    }
  }, [transform]);

  useEffect(() => {
    gl.state.lightPos = new Vector3();
    lightGroup.current.rotation.y = MathUtils.degToRad(
      sunCoordsRef.current.lng
    );
  }, [gl]);

  useThree((state) => {
    // Initial position
    if (!initRef.current) {
      state.camera.position.set(-2.3, 2, 0);
      initRef.current = true;
    }
  });

  useFrame((state, dt) => {
    // Handle changes in position of suncoords
    if (light.current && lightGroup.current) {
      light.current.position.y =
        LIGHT_OFFSET * (sunCoordsRef.current.lat / 45);

      lightGroup.current.rotation.y = MathUtils.degToRad(
        sunCoordsRef.current.lng
      );
    }

    if (gl.state.lightPos) {
      light.current.getWorldPosition(gl.state.lightPos);
    }
  });

  return (
    <>
      <group ref={lightGroup}>
        <directionalLight
          ref={light}
          intensity={3}
          position={start.current}
        />
      </group>

      <ambientLight intensity={0.5} />

      <OrbitControls
        ref={orbitControls}
        minDistance={EARTH_RADIUS * 2} // closest
        maxDistance={EARTH_RADIUS * 2.2} // farthest
        enablePan={false}
        zoomSpeed={0.04}
        autoRotate
        rotation={[0, 0, 0]}
        autoRotateSpeed={shouldOrbit && !shouldAnimate.current ? 0.03 : 0}
        target={[0, 0, 0]}
        minPolarAngle={MathUtils.degToRad(10)}
        maxPolarAngle={MathUtils.degToRad(170)}
      />
    </>
  );
};

export default Lights;
