import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="main-header">
      <div className="header-container">
        <Link to="/" className="link">
          <h1>Northcoders Boardgames</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
