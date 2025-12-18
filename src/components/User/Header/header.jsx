import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import { checkIsAdmin } from "../../../utils/auth"; // Sử dụng hàm mới để check admin

export default function Header({ auth, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Xóa state tại App.jsx
    navigate("/"); // Chuyển về trang chủ
  };

  // Logic kiểm tra dựa trên prop 'auth' để giao diện cập nhật ngay lập tức
  const isUserAuthenticated = !!auth;
  const isUserAdmin = checkIsAdmin(auth);

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
        
        {/* Giữ nguyên cấu trúc các câu lệnh điều kiện của bạn */}
        {!isUserAuthenticated && (
          <NavLink to="/login">Login</NavLink>
        )}
        
        {isUserAdmin && (
          <NavLink to="/trangchu">Admin</NavLink>
        )}
        
        {isUserAuthenticated && (
          <button className="auth-link-button" onClick={handleLogout} style={{marginLeft: '8px'}}>
            Đăng xuất
          </button>
        )}
        
        {isUserAuthenticated && auth?.email && (
          <span className="header-user">{auth.email}</span>
        )}
      </nav>

    </header>
  );
}