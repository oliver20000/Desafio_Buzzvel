import "./App.css";
import React, { useState, useEffect } from "react";
import { Link, Route, useLocation } from "wouter";
import QRCode from "react-qr-code";
import JohnPage from "./JohnPage";
import axios from "axios";

function App() {
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");

  const handleClick = async () => {
    const url = "http://localhost:3001";
    try {
      const response = await axios.post(`${url}/entries`, {
        name: "John",
        linkedin: "https://www.linkedin.com/company/buzzvel/",
        github: "https://github.com/Buzzvel",
        phone: "11965872245",
      });
      const userId = response.data.userId;
      const qrCodeUrl = userId ? `/johnPage/${userId}` : "";
      console.log(qrCodeUrl);
      setQrCodeValue(qrCodeUrl);
      setShowQrCode(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!showQrCode) {
      window.history.replaceState(null, "", "/generator");
    }
  }, [showQrCode]);

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <h4>Name: John</h4>
      <h4>
        <a href="https://www.linkedin.com/company/buzzvel/">Linkedin</a>
      </h4>
      <h4>
        <a href="https://github.com/Buzzvel">Github</a>
      </h4>
      <button onClick={handleClick}>Generate QR Code</button>
      {showQrCode && (
        <div className="QRcode">
          <QRCode value={qrCodeValue} />
        </div>
      )}
      <Route path="/john/:userId" component={JohnPage} />
    </div>
  );
}

export default App;
