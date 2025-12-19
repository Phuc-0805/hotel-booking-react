import React, { useEffect, useState } from "react";
import Head from "../Head/Homebar.jsx";
import { getAuth, checkIsAdmin } from "../../../utils/auth"; // Đảm bảo đúng đường dẫn tới file auth.js của bạn
import "../Trangchu.css"; 
import "./welcome.css";

export default function Trangchu() {
  const [adminStats, setAdminStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalRooms: 0,
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy đối tượng auth an toàn từ localStorage thông qua hàm getAuth đã chuẩn hóa
  const auth = getAuth(); 
  const isAdmin = checkIsAdmin(auth); // Kiểm tra quyền ADMIN

  useEffect(() => {
    // Nếu auth null hoặc không có thuộc tính token, hoặc không phải Admin -> Ngừng xử lý
    if (!auth?.token || !isAdmin) {
      setLoading(false);
      return;
    }

    const fetchAdminDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:9192/bookings/admin/global-stats", {
          headers: {
            // Sử dụng auth?.token để truy cập an toàn, tránh lỗi crash trang
            "Authorization": `Bearer ${auth.token}`,
            "Content-Type": "application/json"
          }
        });

        // Đọc body như text trước, vì backend có thể trả object lỗi hoặc chuỗi
        const text = await response.text();
        let data = null;
        try { data = text ? JSON.parse(text) : null; } catch { data = text; }

        if (response.ok) {
          // đảm bảo conversion sang number cho totalRevenue
          setAdminStats({
            totalRevenue: Number(data?.totalRevenue) || 0,
            totalBookings: Number(data?.totalBookings) || 0,
            totalRooms: Number(data?.totalRooms) || 0,
            totalCustomers: Number(data?.totalCustomers) || 0
          });
          setError(null);
        } else if (response.status === 401 || response.status === 403) {
          const serverMsg = data?.message || data?.error || "Phiên làm việc hết hạn hoặc bạn không có quyền truy cập.";
          throw new Error(serverMsg);
        } else {
          const serverMsg = data?.message || data?.error || `Lỗi hệ thống (${response.status}). Vui lòng thử lại sau.`;
          throw new Error(serverMsg);
        }
      } catch (err) {
        setError(err.message || String(err));
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboardData();
  }, [auth?.token, isAdmin]); // Rerun khi auth/token hoặc quyền isAdmin thay đổi

  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value || 0);

  // --- HIỂN THỊ TRẠNG THÁI TẢI DỮ LIỆU ---
  if (loading) return (
    <div className="admin-layout">
      <Head />
      <div className="page-content">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu hệ thống...</p>
        </div>
      </div>
    </div>
  );

  // --- HIỂN THỊ NẾU KHÔNG PHẢI ADMIN ---
  if (!auth || !isAdmin) {
    return (
      <div className="admin-layout">
        <Head />
        <div className="page-content">
          <section className="welcome-section">
            <h1>Truy cập bị từ chối</h1>
            <p>Bạn cần đăng nhập bằng tài khoản Quản trị viên để xem trang này.</p>
            <button className="QLP-btn" onClick={() => window.location.href = '/login'}>Đăng nhập ngay</button>
          </section>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN DASHBOARD CHÍNH ---
  return (
    <div className="admin-layout">
      <Head />
      <main className="page-content">
        <section className="welcome-section">
          <h1>Admin Dashboard</h1>
          <p>Chào mừng quay trở lại, <strong>{auth.email}</strong>.</p>
          {error && <p className="error-text" style={{ color: "#ff4d4d", marginTop: "10px" }}>⚠️ {error}</p>}
        </section>

        {/* Hệ thống thẻ thống kê (Stats Cards) */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Tổng doanh thu</h3>
              <p className="stat-value">{formatVND(adminStats.totalRevenue)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>Tổng lượt đặt</h3>
              <p className="stat-value">{adminStats.totalBookings} lượt</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏨</div>
            <div className="stat-info">
              <h3>Số lượng phòng</h3>
              <p className="stat-value">{adminStats.totalRooms} phòng</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Khách hàng</h3>
              <p className="stat-value">{adminStats.totalCustomers} người</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}