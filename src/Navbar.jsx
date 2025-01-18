import React, { useContext } from "react";
import { Link } from "react-router";
import { MyContext } from "./Context/Context";

const Navbar = () => {
  const { setLanguage } = useContext(MyContext);
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-flex">
          <h2>TodoApp</h2>
          <ul>
            <li>
              <Link to={"/"}>Main</Link>
            </li>
            <li>
              <Link to={"/CreateTask"}>Create</Link>
            </li>
          </ul>
          <div className="language">
            <select
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            >
              <option value="EN">EN</option>
              <option value="GE">GE</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
