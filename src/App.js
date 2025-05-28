import React from "react";
import TaskBoard from "./components/TaskBoard";
import "./index.css";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">TaskBoard Pro</h1>
      <TaskBoard />
    </div>
  );
}

export default App;
