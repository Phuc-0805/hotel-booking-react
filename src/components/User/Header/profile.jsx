import React, { useEffect, useState } from "react";
import "./profile.css";
// Import Header và Footer của bạn
import Header from "./header"; 
import Footer from "../Footer/Footer"; 

export default function Profile({ auth, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = auth?.email;
  const token = auth?.token;

  useEffect(() => {
    if (userEmail && token) {
      fetchBookings();
    }
  }, [userEmail, token]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9192/bookings/user/${userEmail}/bookings`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Không thể tải lịch sử đặt phòng");
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

  // Nếu chưa đăng nhập, vẫn nên hiện Header/Footer để người dùng quay lại trang chủ
  if (!auth) {
    return (
      <>
        <Header auth={auth} onLogout={onLogout} />
        <div className="profile-container" style={{ minHeight: "60vh", textAlign: "center" }}>
          <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="page-wrapper">
      {/* 1. Header ở trên cùng */}
      <Header auth={auth} onLogout={onLogout} />

      {/* 2. Nội dung chính của Profile */}
      <main className="profile-container">
        <div className="profile-header">
          <h2>Hồ sơ cá nhân</h2>
          <div className="user-info-card">
            <p><strong>Email:</strong> {userEmail}</p>
            <p><strong>Trạng thái:</strong> Tài khoản đã xác thực</p>
          </div>
        </div>

        <div className="booking-history">
          <h3>Lịch sử đặt phòng của bạn</h3>
          
          {loading && <p>Đang tải dữ liệu...</p>}
          {error && <p className="error-message">{error}</p>}
          
          {!loading && bookings.length === 0 && (
            <p className="no-bookings">Bạn chưa có lịch sử đặt phòng nào.</p>
          )}

          {!loading && bookings.length > 0 && (
            <div className="booking-list">
              {bookings.map((booking, index) => (
                <div key={booking.id || index} className="booking-item">
                  <div className="booking-info">
                    <p className="room-type">Phòng: {booking.room?.roomType || "N/A"}</p>
                    <p>Mã đặt phòng: <strong>#{booking.bookingConfirmationCode}</strong></p>
                    <p>Ngày: {booking.checkInDate} → {booking.checkOutDate}</p>
                    <p>Số khách: {booking.totalNumberOfGuest}</p>
                  </div>
                  <div className="booking-status">
                    <p className="price">Tổng tiền: {formatVND(booking.totalAmount || 0)}</p>
                    <span className={`status-badge ${booking.status?.toLowerCase() || "confirmed"}`}>
                      {booking.status || "Đã xác nhận"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 3. Footer ở dưới cùng */}
      <Footer />
    </div>
  );
}