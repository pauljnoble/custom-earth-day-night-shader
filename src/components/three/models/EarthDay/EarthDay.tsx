import { Suspense, useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from "src/constants";
import React from "react";

const EarthDay = React.memo(({ onLoad }: any) => {
  const { gl } = useThree();
  const sphereRef = useRef(null);
  const day = useTexture(PATHS.earthMap);
  const bump = useTexture(PATHS.bumpMap);
  const specular = useTexture(PATHS.specularMap);

  day.anisotropy = gl.capabilities.getMaxAnisotropy();
  bump.anisotropy = gl.capabilities.getMaxAnisotropy();
  specular.anisotropy = gl.capabilities.getMaxAnisotropy();

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Suspense fallback={null}>
      <mesh
        castShadow
        scale={[0.999, 0.999, 0.999]}
        rotation-y={Math.PI}
        ref={sphereRef}
      >
        <sphereGeometry
          args={[EARTH_RADIUS, EARTH_FRAGMENTS, EARTH_FRAGMENTS]}
        />
        <meshPhongMaterial
          map={day}
          bumpScale={0.75}
          shininess={70}
          bumpMap={bump}
          specularMap={specular}
          opacity={1}
          transparent
        />

      </mesh>
    </Suspense>
  );
});

export default EarthDay;
