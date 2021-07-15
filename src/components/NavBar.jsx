import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav id="main-nav">
      <div className="nav-container">
        <ul>
          <Link to="/reviews">
            <li>Reviews</li>
          </Link>
          <Link to="/users">
            <li>Users</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
