import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [rfid, setRfid] = useState("");

  const [stud, setStud] = useState([]);

  // const BASE = "http://localhost:8083";
  const BASE = "https://backend-test-rbm7.onrender.com";

  const handleFetch = async () => {
    const res = await axios.get(`${BASE}/stud/get`);

    setStud(res.data);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE}/stud/add`, {
      name,
      rfid,
    });
    handleFetch();
    setName("");
    setRfid("");
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

      {stud.map((s) => (
        <>
          <h1>Name{s.name}</h1>
          <h1>RFID{s.rfid}</h1>
        </>
      ))}
    </>
  );
}

export default App;
