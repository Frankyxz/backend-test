import { useEffect, useState, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [rfid, setRfid] = useState("");

  const [stud, setStud] = useState([]);

  const [serial, setSerial] = useState("");
  const [message, setMessage] = useState("");

  const [init, setInit] = useState("");
  const [err, seteRR] = useState("");

  const [logs, setLogs] = useState([]);

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

  // const handleSubmit = () => {};
  // const scan = useCallback(async () => {
  //   if ("NDEFReader" in window) {
  //     try {
  //       const ndef = new window.NDEFReader();
  //       await ndef.scan();

  //       console.log("Scan started successfully.");
  //       ndef.onreadingerror = () => {
  //         console.log("Cannot read data from the NFC tag. Try another one?");
  //       };

  //       ndef.onreading = (event) => {
  //         console.log("NDEF message read.");
  //         onReading(event);
  //         setActions({
  //           scan: "scanned",
  //           write: null,
  //         });
  //       };
  //     } catch (error) {
  //       console.log(`Error! Scan failed to start: ${error}.`);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   scan();
  // }, []);

  const log = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const handleScan = async () => {
    log("User clicked scan button");

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("> Scan started");

      ndef.addEventListener("readingerror", () => {
        log("Argh! Cannot read data from the NFC tag. Try another one?");
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        log(`> Serial Number: ${serialNumber}`);
        log(`> Records: (${message.records.length})`);

        setSerial(serialNumber);
        const encoder = new TextEncoder();
        const byteArr = encoder.encode(serialNumber);
        setRfid(byteArr);
      });
    } catch (error) {
      log("Argh! " + error);
      console.log(error);
    }
  };

  useEffect(() => {
    // const scanButton = document.getElementById("scanButton");
    handleScan();
  }, []);
  return (
    <>
      <div>
        <h3>Logs</h3>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
      {/* <button onClick={handleScan}>Start NFC Scan</button> */}
      <h2>Serial {serial}</h2>
      <h2>Message: {message}</h2>

      {/* <h2>init {init}</h2>
      <h2>err: {err}</h2> */}
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
          <h1>Name: {s.name}</h1>
          <h1>RFID: {s.rfid}</h1>
        </>
      ))}
    </>
  );
}

export default App;
