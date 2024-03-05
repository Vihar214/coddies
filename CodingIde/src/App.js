import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./scenes/Layout";
import Login from "./scenes/Auth/login";
import Signup from "./scenes/Auth/signup";
import Ide from "./scenes/IDE";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/Layout" replace />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Ide" element={<Ide />} />
        {/* <Route path="/Popup1" element={<Popup1 />} /> */}
      </Routes>
    </div>
  );
}

export default App;
