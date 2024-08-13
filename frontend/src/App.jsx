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

  useEffect(() => {
    const readNfc = async () => {
      try {
        console.log("running");
        if ("NDEFReader" in window) {
          const ndef = new window.NDEFReader();
          await ndef.scan();

          ndef.onreading = (event) => {
            onReading(event);
            setSerial(event.serialNumber);
            // const decoder = new TextDecoder();
            // for (const record of event.message.records) {
            //   setMessage(decoder.decode(record.data));
            // }
          };

          console.log("NFC reader initialized.");
          setInit("NFC");
        } else {
          console.log("NFC reader not supported on this device.");
          setInit("alaws");
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        seteRR(error);
      }
    };

    readNfc();
  }, []);

  const onReading = ({ message, serialNumber }) => {
    const encoder = new TextEncoder();
    const byteArr = encoder.encode(serialNumber);
    setRfid(byteArr);
    setSerial(byteArr);
    // for (const record of message.records) {
    //   switch (record.recordType) {
    //     case "text":
    //       const textDecoder = new TextDecoder(record.encoding);
    //       setMessage(textDecoder.decode(record.data));
    //       break;
    //     case "url":
    //       // TODO: Read URL record with record data.
    //       break;
    //     default:
    //     // TODO: Handle other records with record data.
    //   }
    // }
  };

  return (
    <>
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
