import { ImageWrapper } from "../components/ImageWrapper";
import { render, screen } from "@testing-library/react";

const testImages = [
  { height: 540, width: 467, src: "https://loremflickr.com/467/540/animals" },
  { height: 300, width: 601, src: "https://loremflickr.com/601/300/animals" },
  { height: 501, width: 250, src: "https://loremflickr.com/250/501/animals" },
];

test("Image wrapper renders a list of images", () => {
  render(<ImageWrapper images={testImages} />);
  const imageWrapper = screen.getAllByRole("img");
  expect(imageWrapper.length).toBe(3);
});

test("Images with height < 2*width and width < 2*height span a single cell", () => {
  render(<ImageWrapper images={testImages.slice(0, 1)} />);
  const img = screen.getByRole("listitem");
  const gridColumnEnd = img.style.gridColumnEnd;
  const gridRowEnd = img.style.gridRowEnd;
  expect(gridColumnEnd).toBe("span 1");
  expect(gridRowEnd).toBe("span 1");
});

test("Images with height < 2*width span two horizontal cells", () => {
  render(<ImageWrapper images={testImages.slice(1, 2)} />);
  const img = screen.getByRole("listitem");
  const gridColumnEnd = img.style.gridColumnEnd;
  const gridRowEnd = img.style.gridRowEnd;
  expect(gridColumnEnd).toBe("span 2");
  expect(gridRowEnd).toBe("span 1");
});

test("Images with width < 2*height span two vertical cells", () => {
  render(<ImageWrapper images={testImages.slice(2, 3)} />);
  const img = screen.getByRole("listitem");
  const gridColumnEnd = img.style.gridColumnEnd;
  const gridRowEnd = img.style.gridRowEnd;
  expect(gridColumnEnd).toBe("span 1");
  expect(gridRowEnd).toBe("span 2");
});
