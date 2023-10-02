import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { EARTH_FRAGMENTS, EARTH_RADIUS, PATHS } from "src/constants";
import { MeshBasicMaterial, Vector3 } from "three";

import CustomShaderMaterial from "three-custom-shader-material";

export default function Earth() {
  const day = useTexture(PATHS.earthMap);
  const night = useTexture(PATHS.earthNight);
  const mat = useRef<any>();

  const { gl } = useThree();

  night.anisotropy = gl.capabilities.getMaxAnisotropy();

  useFrame(() => {
    if (mat?.current?.uniforms && (gl as any).state.lightPos) {
      mat.current.uniforms.uLight.value = (gl as any).state.lightPos;
    }
  });

  const uniforms = useMemo(
    () => ({
      uDay: { value: day },
      uNight: { value: night },
      uLight: { value: new Vector3().setScalar(2) },
    }),
    []
  );
  return (
    <>
      <mesh
        receiveShadow
        scale={[1.005, 1.005, 1.005]}
        rotation-y={Math.PI}
      >
        <sphereGeometry
          args={[EARTH_RADIUS, EARTH_FRAGMENTS, EARTH_FRAGMENTS]}
        />
        <CustomShaderMaterial
          ref={mat}
          baseMaterial={MeshBasicMaterial}
          vertexShader={`
          uniform vec3 uLight;
          varying vec2 vUv2;
          varying float vDist;

          float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
          }

          float normalize2(in float v) { 
            return map(v, -1.0, 1.0, 0.0, 1.0); 
          }

          void main() {
            vUv2 = uv;
            vDist = clamp(pow(normalize2(dot(normalize(uLight) * vec3(-1.5, 1., -1.) , position) * ${1 / (EARTH_RADIUS / 4)
            }), 0.5), 0., 1.);
            }), 2.5), 0., 2.);
          }
          `}
          fragmentShader={`
          uniform sampler2D uNight;
          uniform vec3 uLight;
          varying vec2 vUv2;
          varying float vDist;

          void main() {
            vec4 texNight = texture2D(uNight, vUv2);
            vec4 clear = vec4(0, 0, 0, 0);
            vec4 d = mix(texNight, clear, pow(vDist, 2.) );
            csm_DiffuseColor = d;
          }
          `}
          uniforms={uniforms}
          transparent
        />
      </mesh>
    </>
  );
}
