import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Header = ({ setUser }) => {
  const user = useContext(UserContext);

  return (
    <header id="main-header">
      <div className="header-container">
        <Link to="/" className="link">
          <div className="header-title">
            <h1>Northcoders Boardgames</h1>
          </div>
          <div className="header-profile">
            <img
              src={user.avatar_url}
              alt={`${user.username}'s avatar`}
              className="header-profile-avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
