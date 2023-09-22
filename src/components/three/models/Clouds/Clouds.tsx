import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from "src/constants";
import { TextureLoader } from "three";

const Clouds = ({ isActive }: any) => {
  const { gl } = useThree();
  // const cloudsMap = useLoader(TextureLoader, "/img/clouds-map-4k.jpg");
  const cloudsMap = useLoader(TextureLoader, PATHS.clouds);

  cloudsMap.anisotropy = gl.capabilities.getMaxAnisotropy();

  const meshRef = useRef(null);

  useFrame(() => {
    if (!meshRef.current) return;
    (meshRef.current as any).rotation.x += 0.00001;
    (meshRef.current as any).rotation.y += 0.00001;
  });

  return (
    <Suspense fallback={null}>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        scale={[1.001, 1.001, 1.001]}
        // layers={1}
        receiveShadow
      >
        <sphereGeometry
          args={[EARTH_RADIUS, EARTH_FRAGMENTS, EARTH_FRAGMENTS]}
        />
        <meshStandardMaterial
          map={cloudsMap}
          // alphaMap={cloudsMap}
          // alphaTest={0}
          transparent
          opacity={0.5}
          color="#ffffff"
        />
      </mesh>
    </Suspense>
  );
};

export default Clouds;
