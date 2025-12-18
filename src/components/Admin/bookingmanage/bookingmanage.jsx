import React, { useEffect, useState, useCallback } from "react";
import Head from "../Head/Homebar.jsx";
import { getAuth, checkIsAdmin } from "../../../utils/auth.js"; // Điều chỉnh đường dẫn tới file auth.js của bạn
import "../Trangchu.css";

export default function BookingManager() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Lấy thông tin auth hiện tại
  const auth = getAuth();
  const isAdmin = checkIsAdmin(auth);

  // ================= 1. TẢI DANH SÁCH (LOAD BOOKINGS) =================
  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      // Lưu ý: Nếu backend yêu cầu đăng nhập để xem danh sách, hãy thêm header Authorization
      const res = await fetch("http://localhost:9192/bookings/all-bookings", {
        headers: {
          "Authorization": auth?.token ? `Bearer ${auth.token}` : "",
        }
      });

      if (!res.ok) throw new Error("Không thể tải danh sách đặt phòng");

      const data = await res.json();

      // Định dạng lại dữ liệu để hiển thị
      const formattedData = data.map((b) => ({
        ...b,
        totalAmount: b.totalAmount ? Number(b.totalAmount) : 0,
        selectedServices: b.selectedServices || [],
      }));

      setBookings(formattedData);
    } catch (err) {
      console.error("Lỗi khi load danh sách:", err);
    } finally {
      setIsLoading(false);
    }
  }, [auth?.token]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // ================= 2. HỦY BOOKING (FIX LỖI 401 & 403) =================
  const handleCancelBooking = async (bookingId) => {
    if (!isAdmin) {
      alert("🚫 Chỉ Admin mới có quyền thực hiện chức năng này!");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn hủy đặt phòng này?")) return;

    try {
      const res = await fetch(
        `http://localhost:9192/bookings/booking/${bookingId}/delete`,
        {
          method: "DELETE",
          headers: {
            // Lấy token từ object auth đã được parse từ AUTH_KEY
            "Authorization": `Bearer ${auth.token}`, 
            "Content-Type": "application/json"
          },
        }
      );

      if (res.ok) {
        alert("✅ Hủy đặt phòng thành công!");
        loadBookings(); // Tải lại danh sách ngay lập tức
      } else if (res.status === 401) {
        alert("🚫 Lỗi 401: Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      } else if (res.status === 403) {
        alert("🚫 Lỗi 403: Bạn không có đủ quyền hạn (Admin) để xóa.");
      } else {
        const errorText = await res.text();
        throw new Error(errorText || "Lỗi hệ thống khi xóa");
      }
    } catch (err) {
      console.error("Error detail:", err);
      alert(`❌ Thao tác thất bại: ${err.message}`);
    }
  };

  // ================= 3. GIAO DIỆN (RENDER) =================
  return (
    <div className="admin-layout">
      <Head />
      <div className="page-content">
        <div className="booking-manager">
          <div className="header-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1>Quản lý Đặt phòng</h1>
            <button className="refresh-btn" onClick={loadBookings} disabled={isLoading}>
              {isLoading ? "Đang tải..." : "🔄 Làm mới dữ liệu"}
            </button>
          </div>

          {!isAdmin && (
            <div className="alert-warning">
              ⚠️ Bạn đang truy cập với quyền hạn hạn chế. Một số chức năng có thể bị khóa.
            </div>
          )}

          {bookings.length > 0 ? (
            <div className="table-wrapper">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phòng</th>
                    <th>Khách hàng</th>
                    <th>Email</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Dịch vụ</th>
                    <th>Tổng tiền</th>
                    <th>Mã xác nhận</th>
                    <th>Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.room?.id || "N/A"}</td>
                      <td><strong>{b.guestFullName}</strong></td>
                      <td>{b.guestEmail}</td>
                      <td>{b.checkInDate}</td>
                      <td>{b.checkOutDate}</td>
                      <td>
                        {b.selectedServices.length > 0
                          ? b.selectedServices.map(s => s.replace(/_/g, " ")).join(", ")
                          : <em style={{ color: "#999" }}>Không có</em>}
                      </td>
                      <td className="price-text" style={{ fontWeight: "bold", color: "#2c3e50" }}>
                        {b.totalAmount.toLocaleString("vi-VN")} ₫
                      </td>
                      <td><code className="code-badge">{b.bookingConfirmationCode}</code></td>
                      <td>
                        {isAdmin && (
                          <button
                            className="cancel-btn"
                            onClick={() => handleCancelBooking(b.id)}
                            style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                          >
                            Hủy
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state" style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              {isLoading ? "Đang lấy dữ liệu từ máy chủ..." : "Hiện tại không có lịch đặt phòng nào."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}