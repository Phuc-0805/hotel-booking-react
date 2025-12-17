import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import { isAuthenticated, isAdmin, logout, getAuth } from "../../../utils/auth";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const auth = getAuth();

  return (
    <header className="header">
      
      <div className="logo">
        <img 
          src={logo} 
          alt="Logo" 
        />
      </div>

      <nav className="mucluc">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/gallerys">Gallery</NavLink>
        <NavLink to="/rooms">Rooms</NavLink>
        <NavLink to="/blogs">Blog</NavLink>
        <NavLink to="/contactus">Contact Us</NavLink>
        {!isAuthenticated() && <NavLink to="/login">Login</NavLink>}
        {isAuthenticated() && isAdmin() && <NavLink to="/trangchu">Admin</NavLink>}
        {isAuthenticated() && (
          <button className="auth-link-button" onClick={handleLogout} style={{marginLeft: '8px'}}>
            Đăng xuất
          </button>
        )}
        {isAuthenticated() && auth?.email && (
          <span className="header-user">{auth.email}</span>
        )}
      </nav>

    </header>
  );
}
