import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../auth/auth.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value, currentForm) => {
    const v = value ?? currentForm[name];
    const f = currentForm;

    switch (name) {
      case "name":
        if (!v) return "Mục này không được để trống.";
        if (v.trim().length < 2) return "Họ tên phải có ít nhất 2 ký tự.";
        return "";
      case "email":
        if (!v) return "Mục này không được để trống.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(v)) return "Vui lòng nhập đúng định dạng email.";
        return "";
      case "phone":
        if (!v) return "Mục này không được để trống.";
        const phoneDigits = v.replace(/\D/g, "");
        if (phoneDigits.length < 9 || phoneDigits.length > 11) {
          return "Số điện thoại phải từ 9–11 chữ số";
        }
        return "";
      case "birthDate": {
        if (!v) return "Vui lòng chọn ngày sinh";
        const birth = new Date(v);
        const today = new Date();
        if (birth > today) return "Ngày sinh không hợp lệ";

        const eighteenAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        if (birth > eighteenAgo) return "Chưa đủ độ tuổi yêu cầu.";
        return "";
      }
      case "password":
        if (!v) return "Mật khẩu không được để trống";
        if (v.length < 6) return "Mật khẩu phải từ 6 ký tự trở lên.";
        return "";
      case "confirmPassword":
        if (!v) return "Vui lòng nhập lại mật khẩu.";
        if (v !== f.password) return "Mật khẩu không khớp.";
        return "";
      default:
        return "";
    }
  };

  const validateAll = (currentForm) => {
    const newErrors = {};
    Object.keys(currentForm).forEach((key) => {
      const err = validateField(key, currentForm[key], currentForm);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);

    // Nếu field này đã được “touch” rồi thì validate realtime
    if (touched[name]) {
      const err = validateField(name, value, updatedForm);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    const err = validateField(name, form[name], form);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Đánh dấu tất cả field là đã “touched”
    const allTouched = {};
    Object.keys(form).forEach((key) => (allTouched[key] = true));
    setTouched(allTouched);

    const newErrors = validateAll(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Còn lỗi thì không submit
      return;
    }

    console.log("Đã gửi dữ liệu đăng ký (demo):", form);
    alert("Đăng ký DEMO thành công (chưa kết nối backend)");
    navigate("/login");
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Đăng ký tài khoản</h1>
        <p className="auth-subtitle">
          Tạo tài khoản để đặt phòng và quản lý thông tin dễ dàng hơn.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Họ tên */}
          <div className="auth-field">
            <label className="auth-label">Họ tên</label>
            <input
              className={`auth-input ${
                touched.name && errors.name ? "auth-input--error" : ""
              }`}
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Họ tên"
            />
            {touched.name && errors.name && (
              <div className="auth-error-text">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className={`auth-input ${
                touched.email && errors.email ? "auth-input--error" : ""
              }`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
            />
            {touched.email && errors.email && (
              <div className="auth-error-text">{errors.email}</div>
            )}
          </div>

          {/* Số điện thoại */}
          <div className="auth-field">
            <label className="auth-label">Số điện thoại</label>
            <input
              className={`auth-input ${
                touched.phone && errors.phone ? "auth-input--error" : ""
              }`}
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Số điện thoại"
            />
            {touched.phone && errors.phone && (
              <div className="auth-error-text">{errors.phone}</div>
            )}
          </div>

          {/* Ngày sinh */}
          <div className="auth-field">
            <label className="auth-label">Ngày sinh</label>
            <input
              className={`auth-input ${
                touched.birthDate && errors.birthDate ? "auth-input--error" : ""
              }`}
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              onBlur={handleBlur}
              max={todayStr}
            />
            {touched.birthDate && errors.birthDate && (
              <div className="auth-error-text">{errors.birthDate}</div>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="auth-field">
            <label className="auth-label">Mật khẩu</label>
            <input
              className={`auth-input ${
                touched.password && errors.password ? "auth-input--error" : ""
              }`}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Mật khẩu"
            />
            {touched.password && errors.password && (
              <div className="auth-error-text">{errors.password}</div>
            )}
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="auth-field">
            <label className="auth-label">Nhập lại mật khẩu</label>
            <input
              className={`auth-input ${
                touched.confirmPassword && errors.confirmPassword
                  ? "auth-input--error"
                  : ""
              }`}
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Mật khẩu"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="auth-error-text">{errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="auth-btn auth-btn--primary">
            Đăng ký
          </button>
        </form>

        <p className="auth-switch">
          Đã có tài khoản?{" "}
          <Link to="/login" className="auth-link">
            Đăng nhập
          </Link>
        </p>

        <p className="auth-back-home">
          <Link to="/">← Quay về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;