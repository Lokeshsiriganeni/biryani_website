import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu toggle
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  const handleNavigation = (path) => {
    setIsOpen(false); // Close menu
    navigate(path); // Navigate to the page
  };

  const handleLogOut = (path) => {
    localStorage.removeItem("authToken");
    setIsOpen(false); // Close menu
    navigate(path);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">Deccan Chargers</div>
        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <nav className="nav" onClick={() => handleNavigation("/home")}>
            Home
          </nav>
          <nav className="nav" onClick={() => handleNavigation("/about")}>
            About
          </nav>
          <nav className="nav" onClick={() => handleNavigation("/contact")}>
            Contact
          </nav>
          <nav className="nav" onClick={() => handleLogOut("/")}>
            Logout
          </nav>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          {/* Change icon based on isOpen state */}
          <span className="toggle-icon">{isOpen ? "✕" : "☰"}</span>
        </div>
      </nav>
      <div className="navbar-space"></div> {/* Spacer div to prevent overlap */}
    </>
  );
};

export default Header;
