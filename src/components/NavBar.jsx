import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav id="main-nav">
      <div className="nav-container">
        <ul>
          <li>
            <Link to="/reviews">
              <p>Reviews</p>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <p>Users</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
