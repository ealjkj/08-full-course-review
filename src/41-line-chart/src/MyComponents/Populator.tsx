import { useState, useEffect } from "react";
import { take } from "redux-saga/effects";
import { eventChannel, END, runSaga } from "redux-saga";
import LineChart from "./LineChart";
import { Unsubscribe } from "redux-saga";

type SubscribeChart = (
  emitter: (input: any | END) => void,
  end: () => void
) => Unsubscribe;

type PopulatorProps = {
  subscribe: SubscribeChart;
  label: string;
  min?: number;
  max?: number;
  color?: string;
};

export default function Populator({
  subscribe,
  label,
  min,
  max,
  color = "rgb(255, 99, 132)",
}: PopulatorProps) {
  const [data, setData] = useState({ x: [] as string[], y: [] as number[] });

  const channel = eventChannel((emitter) =>
    subscribe(emitter, () => emitter(END))
  );

  function* saga(): Generator<any> {
    const chan = channel;
    try {
      while (true) {
        // take(END) will cause the saga to terminate by jumping to the finally block
        let info: any = yield take(chan);
        let label: string, value: number;
        if (Array.isArray(info)) {
          [label, value] = info;
        } else {
          label = "";
          value = info;
        }

        yield setData((prev) => {
          if (prev.x.length < 100) {
            return { x: [...prev.x, label], y: [...prev.y, value] };
          }

          return {
            x: [...prev.x.slice(1), label],
            y: [...prev.y.slice(1), value],
          };
        });
      }
    } finally {
      console.log("countdown terminated");
    }
  }

  useEffect(() => {
    runSaga({}, saga);
  }, []);

  return (
    <div>
      <LineChart
        data={data.y}
        ylabels={data.x}
        label={label}
        color={color}
        min={min}
        max={max}
      />
    </div>
  );
}
