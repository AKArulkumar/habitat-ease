import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Navbar.css"; // Assuming you have styles in Navbar.css

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Residential Services</h1>
        <ul className="nav-links">
          <li>
            <Link to="/employee-login">Employee Login</Link>
          </li>
          <li>
            <Link to="/resident-login">Resident Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
