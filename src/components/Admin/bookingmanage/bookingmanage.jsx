import React, { useEffect, useState } from "react";
import Head from "../Head/Homebar.jsx";
import "../Trangchu.css";

export default function BookingManager() {
  const [bookings, setBookings] = useState([]);

  // ================= LOAD BOOKINGS =================
  const loadBookings = async () => {
    try {
      const res = await fetch("http://localhost:9192/bookings/all-bookings");
      if (!res.ok) throw new Error("Không load được booking");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Lỗi load bookings:", err);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // ================= CANCEL BOOKING =================
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Bạn có chắc muốn hủy booking này?")) return;

    try {
      const res = await fetch(`http://localhost:9192/bookings/booking/${bookingId}/delete`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Hủy booking thất bại");
      alert("✅ Hủy booking thành công!");
      loadBookings();
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi hủy booking");
    }
  };

  // ================= RENDER =================
  return (
    <div className="admin-layout">
      <Head />
      <div className="page-content">
        <div className="booking-manager QLP-section">
          <h1>Quản lý Booking</h1>

          {/* ===== BOOKING LIST ===== */}
          {bookings.length > 0 ? (
            <table className="booking-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Room ID</th>
                  <th>Guest</th>
                  <th>Email</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Số khách</th>
                  <th>Confirmation Code</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>{b.room.id}</td>
                    <td>{b.guestFullName}</td>
                    <td>{b.guestEmail}</td>
                    <td>{b.checkInDate}</td>
                    <td>{b.checkOutDate}</td>
                    <td>{b.totalNumberOfGuest}</td>
                    <td>{b.bookingConfirmationCode}</td>
                    <td>
                      <button className="cancel-btn" onClick={() => handleCancelBooking(b.bookingId)}>
                        Hủy
                      </button>
                      {/* Nút sửa có thể thêm nếu muốn */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Chưa có booking nào</p>
          )}
        </div>
      </div>
    </div>
  );
}
