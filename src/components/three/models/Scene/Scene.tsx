import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Clouds from "src/components/three/models/Clouds";
import EarthDay from "src/components/three/models/EarthDay";
import EarthNight from "src/components/three/models/EarthNight";
import Halo from "src/components/three/models/Halo";
import Lights from "src/components/three/models/Lights";
import { LatLngLiteral } from "src/types";

type Props = {
  sunCoordsRef: React.MutableRefObject<LatLngLiteral>;
  onLoad(): void;
};

const Scene = ({ sunCoordsRef, onLoad }: Props) => {

  return (
    <Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
      <Suspense fallback={null}>
        <EarthDay
          onLoad={onLoad}
        />
        <Clouds />
        <EarthNight />
        <Halo color={"#7da4ff"} />
        <Lights
          shouldOrbit={true}
          sunCoordsRef={sunCoordsRef}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
