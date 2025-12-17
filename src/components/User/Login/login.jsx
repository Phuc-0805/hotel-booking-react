import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { setAuth as saveAuth, getAuth as getStoredAuth } from '../../../utils/auth';
import "../auth/auth.css";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const preRoomId = location.state?.roomId || null;

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

      // Chuẩn hóa dữ liệu nhận được
      const authData = {
        token: data.token, // server trả về token string
        email: data.email || data.username,
        roles: (data.roles || []).map(r => r.toUpperCase()),
        id: data.id,
      };

      console.log("authData trước khi lưu:", authData);

      if (!authData.token) {
        setError("Server không trả về token hợp lệ");
        return;
      }

      // Lưu vào localStorage
      saveAuth(authData);

      const stored = getStoredAuth();
      console.log("localStorage sau khi lưu:", stored);

      // Cập nhật state App
      setAuth(stored);

      // Redirect theo role
      const isAdmin = (stored.roles || []).some(r => r === 'ROLE_ADMIN' || r === 'ADMIN');
      if (isAdmin) navigate('/trangchu');
      else navigate(from, { state: { roomId: preRoomId } });

    } catch (err) {
      console.error(err);
      setError("Không thể kết nối tới server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Đăng nhập</h1>
        {error && <div className="auth-alert auth-alert--error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input type="email" className="auth-input" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="auth-field">
            <label>Mật khẩu</label>
            <input type="password" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="auth-btn auth-btn--primary">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="auth-switch">
          Chưa có tài khoản? <Link to="/register" className="auth-link">Đăng ký ngay</Link>
        </p>

        <p className="auth-back-home">
          <Link to="/">← Quay về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
