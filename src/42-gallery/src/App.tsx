import { Gallery } from "./components/Gallery";
import { store } from "./store";
import { Provider } from "react-redux";

export default function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <Gallery id="1" count={3} />
    </Provider>
  );
}
