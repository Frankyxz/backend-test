import { useEffect, useState, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const url = "https://backend-test-1-khhz.onrender.com";
  // const url = "http://localhost:3001";
  const printReceipt = () => {
    const receiptData = `
          \x1b\x40
          \x1b\x61\x01
          \x0a\x0a\x0a
          ELI IT Solutions POS
          Paso De Blas Valenzuela
          City, 1440 Philippines
          \x0a\x0a\x0a
          \x1b\x61\x00
          Item                          Price
          -----------------------------------
          Product 1                     2.99
          Product 2                     1.49
          Product 3 (12 pack)           3.79
          Product 4 (1L)                1.29
          \x0a\x0a\x0a
          Total:                        9.56
          Thank you for shopping with us!
          \x0a\x0a\x0a
          \x1b\x64\x02
          \x1d\x56\x01 / Full Cut
        `;

    axios
      .post(`${url}/print`, { data: receiptData })
      .then((response) => {
        console.log("Printed Successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error printing:", error);
      });
  };

  const handleTest = () => {
    axios
      .post(`${url}/test`)
      .then((response) => {
        console.log("Printed Successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error printing:", error);
      });
  };

  return (
    <>
      <button onClick={printReceipt}>Print Receipt</button>
      <button onClick={handleTest}>TEST</button>
    </>
  );
}

export default App;
