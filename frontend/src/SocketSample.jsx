import React from "react";
import React, { useEffect, useState } from "react";
const SocketSample = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection to local WebSocket server
    const ws = new WebSocket("ws://https://09d0-112-200-35-24.ngrok-free.app");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to local WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Clean up WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []);

  const handlePrint = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const printData = {
        action: "print",
        content: {
          items: [
            { name: "Product A", price: 10, qty: 2 },
            { name: "Product B", price: 15, qty: 1 },
          ],
          total: 35,
        },
      };

      // Send print request to local WebSocket server
      socket.send(JSON.stringify(printData));
      console.log("Print request sent:", printData);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <div>
      <button onClick={handlePrint}>Print Web Socket</button>
    </div>
  );
};

export default SocketSample;
