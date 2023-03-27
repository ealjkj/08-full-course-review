import { ComponentStory, ComponentMeta } from "@storybook/react";
import LineChart from "../MyComponents/LineChart";

export default {
  title: "Charts/LineChart",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <LineChart {...args} />
);

export const SimpleChart = Template.bind({});
SimpleChart.args = {
  ylabels: ["first", "second", "third"],
  data: [300, 500, -200],
  label: "storybook label",
};

export const MinMax = Template.bind({});
MinMax.args = {
  ylabels: ["first", "second", "third", "forth", "fifth"],
  data: [300, 500, -200, -250, 123],
  label: "storybook label",
  min: -300,
  max: 600,
};

export const HundredPoints = Template.bind({});
let points = Array(100).fill(0);
points = points.map((v) => Math.floor((Math.random() - 0.5) * 2 * 500));

HundredPoints.args = {
  data: points,
  ylabels: points.map((number, index) => String(index)),
  label: "storybook label",
};
