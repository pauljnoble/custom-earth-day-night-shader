// @ts-nocheck

import { extend } from "@react-three/fiber";
import { useMemo } from "react";
import { BackSide, Color, IcosahedronGeometry, ShaderMaterial } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EARTH_FRAGMENTS, EARTH_RADIUS } from "src/constants";

extend({ EffectComposer, RenderPass, UnrealBloomPass });

const haloShader = {
  v: `
  varying vec3 vVertexWorldPosition;
  varying vec3 vVertexNormal;
  
  void main() {
  
    vVertexNormal = normalize(normalMatrix * normal);
  
    vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  
    // set gl_Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
    `,
  f: `
  uniform vec3 glowColor;
uniform float coeficient;
uniform float power;

varying vec3 vVertexNormal;
varying vec3 vVertexWorldPosition;

void main() {
  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
  vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
  viewCameraToVertex = normalize(viewCameraToVertex);
  float intensity =
      pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);

  gl_FragColor = vec4(glowColor, intensity * 0.4  );
}
    `,
};

function Outer({ color, geometry }: any) {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: haloShader.v,
        fragmentShader: haloShader.f,
        uniforms: {
          coeficient: { value: 0 },
          power: { value: 2.7 },
          glowColor: { value: new Color(color || "#6be1ff") },
        },
        side: BackSide,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  return (
    <group scale={[1.2, 1.2, 1.2]}>
      <mesh material={mat} geometry={geometry} />
    </group>
  );
}

function Inner({ color, geometry }: any) {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: haloShader.v,
        fragmentShader: haloShader.f,
        uniforms: {
          coeficient: { value: 0.8 },
          power: { value: 2 },
          glowColor: { value: new Color(color || "#7da4ff") },
        },
        transparent: true,
        depthWrite: true,
      }),
    []
  );

  return (
    <group scale={[1.0001, 1.0001, 1.0001]}>
      <mesh material={mat} geometry={geometry} />
    </group>
  );
}

function Halo(props: any) {
  const g = useMemo(
    () => new IcosahedronGeometry(EARTH_RADIUS * 1.01, EARTH_FRAGMENTS),
    []
  );
  const g2 = useMemo(
    () => new IcosahedronGeometry(EARTH_RADIUS * 1.02, EARTH_FRAGMENTS),
    []
  );

  return (
    <group>
      <Inner geometry={g} {...props} />
      <Outer geometry={g2} {...props} />
    </group>
  );
}

export default Halo;
