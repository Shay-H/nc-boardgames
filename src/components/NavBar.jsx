import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav id="main-nav">
      <div className="nav-container">
        <ul>
          <Link to="/games">
            <li>Games</li>
          </Link>
          <li>Categories</li>
          <li>Reviews</li>
          <li>Users</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
