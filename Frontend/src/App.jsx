import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./index.css";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router>
      <div className="app">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
