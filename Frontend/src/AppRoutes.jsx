import { Route, Routes } from "react-router-dom";
import Layout from "./scenes/Layout";
import Ide from "./scenes/IDE";
import C_index from "./scenes/C_index";
import Cpp_index from "./scenes/Cpp_index";
import Python_index from "./scenes/Python_index";
function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/ide" element={<Ide />} />
          <Route path="/C_index" element={<C_index />} />
          <Route path="/Cpp_index" element={<Cpp_index />} />
          <Route path="/Python_index" element={<Python_index />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
