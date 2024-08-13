import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const handleSubmit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <input type="text" />
        <input type="text" />

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default App;
