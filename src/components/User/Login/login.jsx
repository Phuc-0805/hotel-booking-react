import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../auth/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:9192/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Email hoặc mật khẩu không đúng");
        return;
      }

      const auth = {
        token: data.token || data.accessToken,
        email: data.email,
        roles: data.roles || [],
        id: data.id,
      };

      localStorage.setItem("auth", JSON.stringify(auth));

      if (auth.roles.includes("ROLE_ADMIN")) {
        navigate("/trangchu");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối tới server");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Tính năng quên mật khẩu đang được phát triển.");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Đăng nhập</h1>
        <p className="auth-subtitle">
          Truy cập hệ thống quản lý đặt phòng khách sạn.
        </p>

        {error && (
          <div className="auth-alert auth-alert--error">{error}</div>
        )}

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

          <button
            type="submit"
            className="auth-btn auth-btn--primary"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
