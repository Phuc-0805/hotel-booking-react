import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../auth/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // DEMO LOGIN (chưa có backend)
    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
      navigate("/trangchu");
    } else {
      setError("Sai email hoặc mật khẩu demo (admin@gmail.com / 123456)");
    }
  };

  const handleForgotPassword = () => {
    // DEMO – sau này bạn có thể điều hướng sang /forgot-password
    alert("Tính năng quên mật khẩu hiện đang là DEMO, vui lòng liên hệ quản trị viên.");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Đăng nhập</h1>
        <p className="auth-subtitle">
          Truy cập hệ thống quản lý đặt phòng khách sạn.
        </p>

        {error && <div className="auth-alert auth-alert--error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              placeholder="vd: admin@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Mật khẩu</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              placeholder="Ít nhất 6 ký tự"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-extra-row">
            <button
              type="button"
              className="auth-link-button"
              onClick={handleForgotPassword}
            >
              Quên mật khẩu?
            </button>
          </div>

          <button type="submit" className="auth-btn auth-btn--primary">
              <Link to="/trangchu" className="auth-link">
                Đăng nhập
              </Link>
          </button>
        </form>

        <p className="auth-switch">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="auth-link">
            Đăng ký ngay
          </Link>
        </p>

        <p className="auth-back-home">
          <Link to="/">← Quay về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;