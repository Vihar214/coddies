import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
const Sidebar_ = () => {
  const { collapseSidebar } = useProSidebar();
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar>
        <Menu>
          <MenuItem
            className="text-2xl font-bold text-center text-blue-800"
            icon={
              <MenuRoundedIcon
                onClick={() => {
                  collapseSidebar();
                }}
              />
            }
          >
            Coddies
          </MenuItem>
          <MenuItem
            component={<Link to="/ide" className="link" />}
            icon={<img src="https://skillicons.dev/icons?i=htmx" />}
          >
            IDE
          </MenuItem>
          <MenuItem
            component={<Link to="/C_index" className="link" />}
            icon={<img src="https://skillicons.dev/icons?i=c" />}
          >
            C Language
          </MenuItem>
          <MenuItem
            component={<Link to="/Cpp_index" className="link" />}
            icon={<img src="https://skillicons.dev/icons?i=cpp" />}
          >
            C++
          </MenuItem>
          <MenuItem
            component={<Link to="/Python_index" className="link" />}
            icon={<img src="https://skillicons.dev/icons?i=python" />}
          >
            Python
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Sidebar_;
