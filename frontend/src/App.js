import React from "react";
import Dashboard from "./Components/Dashboard";

const App = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        IoT Dashboard
      </h1>
      <Dashboard />

      <Dashboard />
    </div>
  );
};

export default App;
