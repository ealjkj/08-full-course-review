import { Line } from "react-chartjs-2";
import { options } from "../utils/chartOptions";

type ChartProps = {
  ylabels: string[];
  data: any[];
  label: string;
  min?: number;
  max?: number;
  color?: string;
};

export default function LineChart({
  ylabels,
  data,
  label,
  min,
  max,
  color = "rgb(255, 99, 132)",
}: ChartProps): React.ReactElement {
  const dataInfo = {
    labels: ylabels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color,
        yAxisID: "y",
      },
    ],
  };

  const newOptions = {
    ...options,
    scales: { ...options.scales, y: { ...options.scales.y, min, max } },
  };

  return <Line options={newOptions} data={dataInfo} />;
}
