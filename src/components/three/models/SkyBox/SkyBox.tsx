import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { PATHS } from "src/constants";

const SkyBox = () => {
  const loader = new TextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load(PATHS.skyBox);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 6;
  texture.repeat.y = 3;

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[256, 64, 64]} />
      <meshBasicMaterial
        alphaMap={texture}
        side={THREE.BackSide}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

export default SkyBox;
