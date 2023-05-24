import { render, screen } from "@testing-library/react";
import LineChart from "../components/LineChart";
import "../setupTests";
import "jest-canvas-mock";

describe("LineChart", () => {
  it("should render a line chart", () => {
    const data = [10, 20, 30, 40];
    const canvasMock = jest
      .spyOn(window.HTMLCanvasElement.prototype, "getContext")
      .mockReturnValue({
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
      } as any);

    render(
      <LineChart
        data={data}
        label="label"
        ylabels={["ten", "twenty", "thirty", "forty"]}
      />
    );

    expect(canvasMock).toHaveBeenCalled();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
