import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 class="text-3xl flex justify-center font-bold backdrop-blur-0 bg-blend-color-burn bg-red-400">
        Hello world!
      </h1>
    </>
  );
}

export default App;
