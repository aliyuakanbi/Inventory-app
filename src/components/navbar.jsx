import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "./navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-brand">🏠 Household Tracker</div>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      <div className={`nav-links ${open ? "active" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/add" onClick={() => setOpen(false)}>Add Item</Link>
        <Link to="/items" onClick={() => setOpen(false)}>Items</Link>
        <Link to="/expiring" onClick={() => setOpen(false)}>Expiring Soon</Link>
        <Link to="/monthly" onClick={() => setOpen(false)}>Monthly</Link>
        <Link to="/log" onClick={() => setOpen(false)}>Activity Log</Link>
        <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          🔓 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
