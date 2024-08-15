import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>UI experiments @ Dashwave</h1>
      <div
        style={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h3>
          1. <a href={"/exp1"}>replicating jetbrains product presentation</a>{" "}
        </h3>
        <h3>
          2. <a href={"/exp2"}>scroll-based "introducing dashwave"</a>{" "}
        </h3>
      </div>
    </div>
  );
}

export default App;
