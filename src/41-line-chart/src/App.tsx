import "./App.css";
import Populator from "./components/Populator";

function App() {
  return <Populator id="1" label={"My Data"} min={-1000} max={1000} />;
}

export default App;
