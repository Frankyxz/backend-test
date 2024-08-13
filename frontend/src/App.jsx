import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [rfid, setRfid] = useState("");

  const BASE = "http://localhost:8083";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE}/stud/add`, {
      name,
      rfid,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={rfid}
          onChange={(e) => setRfid(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default App;
