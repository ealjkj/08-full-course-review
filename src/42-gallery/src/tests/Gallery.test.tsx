import { render, screen, waitFor } from "@testing-library/react";
import { Gallery } from "../components/Gallery";
import { store } from "../store";
import { Provider } from "react-redux";
import { fireEvent } from "@testing-library/react";

test("Scrolling down should make a fetch", async () => {
  const count = 3;
  render(
    <Provider store={store}>
      <Gallery id="1" count={count} />
    </Provider>
  );

  const res = await fetch("http://localhost:3002/gallery/1?count=3&page=1");
  const data = await res.json();

  await waitFor(() => {
    const images = screen.getAllByRole("img");
    const srcs = images.map((imgElement: any) => imgElement.src);
    expect(srcs).toStrictEqual(data.images.map((image: any) => image.src));
  });
});
test("Clicking page 2 should render next page", async () => {
  const count = 3;
  render(
    <Provider store={store}>
      <Gallery id="1" count={count} />
    </Provider>
  );

  fireEvent.click(screen.getByText("2"));

  const res = await fetch("http://localhost:3002/gallery/1?count=3&page=2");
  const data = await res.json();

  await waitFor(() => {
    const images = screen.getAllByRole("img");
    const srcs = images.map((imgElement: any) => imgElement.src);
    expect(srcs).toStrictEqual(data.images.map((image: any) => image.src));
  });
});

// fireEvent.scroll(document, {
//   scrollTop: 100,
//   scrollHeight: 200,
//   clientHeight: 250,
// });
