import { useCallback, useRef, useState } from 'react';
import Scene from 'src/components/three/models/Scene';
import Controls from 'src/components/Controls';
import { LatLngLiteral } from 'src/types';
import { getSunCoords } from 'src/utils';

function App() {
  const [state, setState] = useState({
    realTime: Date.now(),
    offset: 0
  })
  const sunCoordsRef = useRef<LatLngLiteral>({ lat: 0, lng: 0 });
  const prevOffsetMsRef = useRef(0);

  const handleChangeOffset = (offset: number) => {
    setState({ ...state, offset });
    getSunPosition();
  }

  const getSunPosition = useCallback(() => {
    const coords = getSunCoords(new Date(state.realTime + state.offset));
    sunCoordsRef.current = { lat: coords.lat, lng: coords.lng };
  }, [state.offset]);

  const handleLoad = () => {
    getSunPosition();
  }

  return (
    <div className="wrapper">
      <div>
        <Scene
          sunCoordsRef={sunCoordsRef}
          onLoad={handleLoad}
        />
      </div>
      <div>
        <Controls time={state.realTime + state.offset} prevOffsetMsRef={prevOffsetMsRef} onChangeOffset={handleChangeOffset} />
      </div>
    </div>
  );
}

export default App;
