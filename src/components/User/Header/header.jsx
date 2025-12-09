import "./header.css";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/Gemini_Generated_Image_f2fkicf2fkicf2fk-removebg-preview.png";

export default function Header() {
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
        <NavLink to="/login">Login</NavLink>
      </nav>

    </header>
  );
}
