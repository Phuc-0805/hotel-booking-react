import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import { checkIsAdmin } from "../../../utils/auth";

export default function Header({ auth, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); 
    navigate("/"); 
  };

  const isUserAuthenticated = !!auth;
  const isUserAdmin = checkIsAdmin(auth);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="mucluc">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/gallerys">Gallery</NavLink>
        <NavLink to="/rooms">Rooms</NavLink>
        <NavLink to="/blogs">Blog</NavLink>
        <NavLink to="/contactus">Contact Us</NavLink>
        
        {!isUserAuthenticated && (
          <NavLink to="/login">Login</NavLink>
        )}
        
        {isUserAdmin && (
          <NavLink to="/trangchu">Admin</NavLink>
        )}
        
        {/* Di chuyển phần hiển thị Email lên trước nút Đăng xuất để giao diện hợp lý hơn */}
        {isUserAuthenticated && auth?.email && (
          <NavLink to="/profile" className="header-user-link">
            <span className="header-user" title="Xem thông tin cá nhân">
              {auth.email}
            </span>
          </NavLink>
        )}

        {isUserAuthenticated && (
          <button className="auth-link-button" onClick={handleLogout} style={{marginLeft: '8px'}}>
            Đăng xuất
          </button>
        )}
      </nav>
    </header>
  );
}