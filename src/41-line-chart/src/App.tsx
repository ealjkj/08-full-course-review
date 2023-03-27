import "./App.css";
import Populator from "./MyComponents/Populator";
import { faker } from "@faker-js/faker";

const testFunction = (emitter: any, end: () => void) => {
  let secs = 200;
  const iv = setInterval(() => {
    secs -= 1;
    if (secs > 0) {
      emitter(faker.datatype.number({ min: -1000, max: 1000 }));
    } else {
      // this causes the channel to close
      end();
    }
  }, 100);
  // The subscriber must return an unsubscribe function
  return () => {
    clearInterval(iv);
  };
};

function App() {
  return (
    <Populator
      subscribe={testFunction}
      label={"My Data"}
      min={-1000}
      max={1000}
    />
  );
}

export default App;
