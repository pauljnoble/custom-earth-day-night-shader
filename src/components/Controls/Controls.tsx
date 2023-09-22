import { useDrag } from "@use-gesture/react";
import { msToPx, pxToMs, timeStampToTime } from "src/utils";
import { useState } from "react";
import { PX_PER_DAY } from "src/constants";

const LINES_PER_SET_ALT = 144;
const HATCHES_ALL = [...Array(LINES_PER_SET_ALT + 1).keys()];

const TickerLines = ({
  index,
  offsetDays,
}: {
  index: number;
  offsetDays: number;
}) => {
  return (
    <div className="ticker">
      <div className="ticker-lines">
        {HATCHES_ALL.map((h) => {
          const hour = h - 12;

          if (hour === 0) {
            return <div className="special" key={h} />;
          }

          if (h % 6 === 0) {
            return <div className="hour" key={h}></div>;
          }

          return <div key={h} />;
        })}
      </div>
    </div>
  );
};

const TickerMinimal = ({ prevOffsetMsRef, onChangeOffset }: any) => {
  const [y, setY] = useState(0);

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    let deltaMs = 0;
    deltaMs = pxToMs(my);
    const ms = deltaMs + prevOffsetMsRef.current;
    const deltaPx = msToPx(ms);

    setY(deltaPx);
    onChangeOffset(-ms)


    if (!down) {
      prevOffsetMsRef.current = deltaMs + prevOffsetMsRef.current;
    }
  });

  return (
    <div className="ticker-controls" {...bind()}>
      <div className="ticker-cover"></div>
      <div className="ticker-cover"></div>

      <div className="ticker-sets" style={{ transform: `translateY(${y % PX_PER_DAY}px)` }}>
        <TickerLines index={-1} offsetDays={0} />
        <TickerLines index={0} offsetDays={0} />
        <TickerLines index={1} offsetDays={0} />
      </div>
    </div>
  );
};


const Controls = ({ prevOffsetMsRef, time, onChangeOffset }: any) => {
  const formattedTime = timeStampToTime(time)

  return (<div className="controls">
    <div className="current-time"><div>{formattedTime.hours}:{formattedTime.minutes}</div></div>
    <TickerMinimal prevOffsetMsRef={prevOffsetMsRef} onChangeOffset={onChangeOffset} />
  </div>)
}

export default Controls;