import { useState, useEffect } from "react";
import { take } from "redux-saga/effects";
import { eventChannel, END, runSaga } from "redux-saga";
import LineChart from "./LineChart";
import { useSelector } from "react-redux";

type PopulatorProps = {
  id: string;
  label: string;
  min?: number;
  max?: number;
  color?: string;
};

export default function Populator({
  id,
  label,
  min,
  max,
  color = "rgb(255, 99, 132)",
}: PopulatorProps) {
  const data = useSelector((state: any) => state.populatorData[id]);

  if (!data) {
    return <div>Loading</div>;
  }

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
