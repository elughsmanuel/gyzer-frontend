import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ firstName, handleSignOut }) => {
  const handleLogout = () => {
    setTimeout(() => {
      handleSignOut();
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/dashboard" className="navbar__link">
            <h2 className="navbar__brand">Dashboard</h2>
        </Link>
        <div className="navbar_right">
            <div className="navbar_links__box">
            <Link to="/dashboard/add-evaluation" className="navbar__link">
                Add Evaluation
            </Link>
            <Link to="/dashboard/profile" className="navbar__link">
                Profile
            </Link>
            </div>
          <div className="navbar__greeting">Hello, {firstName}</div>
          <div className="navbar__links">
              <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
