import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Header = ({ setUser }) => {
  const user = useContext(UserContext);
  const handleLogout = () => {
    setUser({});
  };

  return (
    <header id="main-header">
      <div className="header-container">
        <div className="header-spacing" style={{ float: "left" }} />
        <Link to="/" className="link">
          <div className="header-title">
            <h1>Northcoders Boardgames</h1>
          </div>
        </Link>
        {user.username ? (
          <div className="header-profile">
            <Link to={`/users/${user.username}`}>
              <h2>{user.username}</h2>
              <img
                src={user.avatar_url}
                alt={`${user.username}'s avatar`}
                className="header-profile-avatar"
              />
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="header-spacing" style={{ float: "right" }} />
        )}
      </div>
    </header>
  );
};

export default Header;
