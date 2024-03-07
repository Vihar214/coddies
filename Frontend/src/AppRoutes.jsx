import { Route, Routes } from "react-router-dom";
import Layout from "./scenes/Layout";
import Login from "./scenes/Auth/login";
import Signup from "./scenes/Auth/signup";
import Ide from "./scenes/IDE";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ide" element={<Ide />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
