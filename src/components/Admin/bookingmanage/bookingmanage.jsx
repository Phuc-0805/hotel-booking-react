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

      // Backend trả selectedServices là array enum
      // totalAmount là string (BigDecimal) -> convert sang Number để format
      const formattedData = data.map((b) => ({
        ...b,
        totalAmount: b.totalAmount ? Number(b.totalAmount) : 0,
        selectedServices: b.selectedServices || [],
      }));

      setBookings(formattedData);
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
      const res = await fetch(
        `http://localhost:9192/bookings/booking/${bookingId}/delete`,
        { method: "DELETE" }
      );

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
        <div className="booking-manager">
          <h1>Quản lý Booking</h1>

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
                  <th>Dịch vụ</th>
                  <th>Tổng tiền</th>
                  <th>Confirmation Code</th>
                  <th>Hành động</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.room?.id}</td>
                    <td>{b.guestFullName}</td>
                    <td>{b.guestEmail}</td>
                    <td>{b.checkInDate}</td>
                    <td>{b.checkOutDate}</td>
                    <td>{b.totalNumberOfGuest}</td>

                    {/* ===== SELECTED SERVICES ===== */}
                    <td>
                      {b.selectedServices.length > 0
                        ? b.selectedServices.map((s) => s.replace("_", " ")).join(", ")
                        : "Không có"}
                    </td>

                    {/* ===== TOTAL AMOUNT ===== */}
                    <td>{b.totalAmount.toLocaleString("vi-VN")} ₫</td>

                    <td>{b.bookingConfirmationCode}</td>

                    <td>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelBooking(b.id)}
                      >
                        Hủy
                      </button>
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
