import React from "react";
import ChatBot from "./ChatBot";
import "./ChatBot.css";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", height: "100vh" }}>
      <ChatBot />
    </div>
  );
}

export default App;
