import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketSample = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish Socket.io connection to local server
    const socketConnection = io("http://192.168.10.233:8080");

    setSocket(socketConnection);

    socketConnection.on("connect", () => {
      console.log("Connected to local Socket.io server");
    });

    socketConnection.on("connect_error", (error) => {
      console.error("Socket.io connection error:", error);
    });

    socketConnection.on("disconnect", () => {
      console.log("Socket.io connection closed");
    });

    // Clean up Socket.io connection on unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const handlePrint = () => {
    if (socket) {
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

      // Send print request to local Socket.io server
      socket.emit("print", printData);
      console.log("Print request sent:", printData);
    } else {
      console.error("Socket is not connected");
    }
  };

  return (
    <div>
      <button onClick={handlePrint}>Print via Socket.io</button>
    </div>
  );
};

export default SocketSample;
