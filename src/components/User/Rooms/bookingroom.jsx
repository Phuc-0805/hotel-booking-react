import { useState } from "react";
import "./bookingroom.css";
// Giả sử bạn đã có hàm này trong utils để kiểm tra role
import { checkIsAdmin } from "../../../utils/auth"; 

// Danh sách service cố định
const SERVICE_TYPES = [
  { name: "Airport Pickup", value: "AIRPORT_PICKUP", price: 100000, rule: "FIXED" },
  { name: "Extra Bed", value: "EXTRA_BED", price: 200000, rule: "PER_NIGHT" },
  { name: "Breakfast", value: "BREAKFAST", price: 50000, rule: "PER_PERSON_PER_NIGHT" },
];

export default function BookingForm({ room, auth, onClose, onBookingSuccess }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalGuests, setTotalGuests] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  // 1. Lấy ngày hiện tại để giới hạn lịch (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // 2. Kiểm tra quyền Admin
  const isUserAdmin = checkIsAdmin(auth);

  const roomPrice = Number(room.roomPrice) || 0;
  const userEmail = auth?.email;

  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

  // Xử lý thay đổi ngày nhận phòng
  const handleCheckInChange = (e) => {
    const selectedIn = e.target.value;
    setCheckInDate(selectedIn);
    // Nếu ngày trả phòng đã chọn trước đó nhỏ hơn hoặc bằng ngày nhận mới, hãy reset nó
    if (checkOutDate && selectedIn >= checkOutDate) {
      setCheckOutDate("");
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== value));
    }
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diff = new Date(checkOutDate) - new Date(checkInDate);
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    if (nights === 0) return 0;

    let total = roomPrice * nights;
    selectedServices.forEach((s) => {
      const service = SERVICE_TYPES.find((item) => item.value === s);
      if (!service) return;
      switch (service.rule) {
        case "FIXED": total += service.price; break;
        case "PER_NIGHT": total += service.price * nights; break;
        case "PER_PERSON_PER_NIGHT": total += service.price * totalGuests * nights; break;
        default: break;
      }
    });
    return total;
  };

  const handlePreConfirm = () => {
    // 3. Chặn Admin ngay tại logic xử lý
    if (isUserAdmin) {
      alert("Tài khoản quản trị (Admin) không được phép thực hiện chức năng đặt phòng.");
      return;
    }

    if (!auth || !auth.token) {
      alert("Hết phiên đăng nhập. Vui lòng đăng nhập lại.");
      window.location.href = "/login";
      return;
    }
    if (!checkInDate || !checkOutDate || totalGuests < 1) {
      alert("Vui lòng nhập đầy đủ thông tin đặt phòng");
      return;
    }
    if (calculateNights() <= 0) {
      alert("Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày");
      return;
    }
    setEstimatedTotal(calculateTotal());
    setShowConfirmPopup(true);
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      if (auth?.token) headers["Authorization"] = `Bearer ${auth.token}`;

      const res = await fetch(`http://localhost:9192/bookings/room/${room.id}/booking`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          guestEmail: userEmail,
          guestFullName: userEmail,
          checkInDate,
          checkOutDate,
          totalNumberOfGuest: totalGuests,
          selectedServices,
        }),
      });

      if (res.status === 401) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/login";
        return;
      }

      const message = await res.text();
      if (!res.ok) throw new Error(message || "Đặt phòng thất bại");
      alert(`✅ ${message}`);
      onBookingSuccess();
      onClose();
    } catch (err) {
      alert(err.message || "Lỗi khi kết nối đến máy chủ");
    } finally {
      setLoading(false);
      setShowConfirmPopup(false);
    }
  };

  return (
    <div className="booking-overlay">
      <div className="booking-form">
        <button className="close-btn-top" onClick={onClose}>&times;</button>
        <h3>Đặt phòng: {room.roomType}</h3>
        
        {/* Cảnh báo dành riêng cho Admin */}
        {isUserAdmin && (
          <div className="admin-alert">
            <p>⚠️ Bạn đang đăng nhập với quyền <strong>Quản trị viên</strong>.</p>
            <p>Vui lòng dùng tài khoản Khách hàng để đặt phòng.</p>
          </div>
        )}

        <p className="room-info">Giá phòng: <strong>{formatVND(roomPrice)}</strong> / đêm</p>

        <div className="input-group">
          <label>Ngày nhận phòng:</label>
          <input 
            type="date" 
            value={checkInDate} 
            min={today} // Chặn ngày quá khứ
            onChange={handleCheckInChange}
            disabled={isUserAdmin} 
          />
        </div>

        <div className="input-group">
          <label>Ngày trả phòng:</label>
          <input 
            type="date" 
            value={checkOutDate} 
            // Ngày trả tối thiểu là ngày sau ngày nhận 1 ngày
            min={checkInDate ? 
                 new Date(new Date(checkInDate).getTime() + 86400000).toISOString().split("T")[0] : 
                 today} 
            onChange={(e) => setCheckOutDate(e.target.value)}
            disabled={isUserAdmin}
          />
        </div>

        <div className="input-group">
          <label>Số khách:</label>
          <input
            type="number"
            min="1"
            value={totalGuests}
            onChange={(e) => setTotalGuests(Number(e.target.value))}
            disabled={isUserAdmin}
          />
        </div>

        <label className="service-label">Dịch vụ bổ sung:</label>
        <div className="services-list">
          {SERVICE_TYPES.map((service) => (
            <label key={service.value} className={`service-item ${isUserAdmin ? "disabled-item" : ""}`}>
              <input
                type="checkbox"
                value={service.value}
                checked={selectedServices.includes(service.value)}
                onChange={handleServiceChange}
                disabled={isUserAdmin}
              />
              <span>{service.name} ({formatVND(service.price)})</span>
            </label>
          ))}
        </div>

        <div className="form-actions">
          <button 
            className="confirm-btn" 
            onClick={handlePreConfirm}
            // 4. Vô hiệu hóa nút bấm về mặt UI/UX
            disabled={isUserAdmin}
            style={isUserAdmin ? { backgroundColor: "#ccc", cursor: "not-allowed", opacity: 0.6 } : {}}
          >
            {isUserAdmin ? "Admin không thể đặt" : "Xác nhận đặt"}
          </button>
          <button className="cancel-btn" onClick={onClose}>Hủy</button>
        </div>
      </div>

      {showConfirmPopup && !isUserAdmin && (
        <div className="confirm-overlay">
          <div className="confirm-popup">
            <h3>Chi tiết đặt phòng</h3>
            <div className="confirm-details">
              <p>Ngày: {checkInDate} → {checkOutDate} ({calculateNights()} đêm)</p>
              <p>Khách: {totalGuests}</p>
              <hr />
              <p>Tiền phòng: {formatVND(roomPrice * calculateNights())}</p>
              {selectedServices.map((s) => {
                const service = SERVICE_TYPES.find((item) => item.value === s);
                let sTotal = 0;
                if (service.rule === "FIXED") sTotal = service.price;
                else if (service.rule === "PER_NIGHT") sTotal = service.price * calculateNights();
                else if (service.rule === "PER_PERSON_PER_NIGHT") sTotal = service.price * totalGuests * calculateNights();
                return <p key={s}>{service.name}: {formatVND(sTotal)}</p>;
              })}
              <p className="final-total"><strong>Tổng tiền dự kiến: {formatVND(estimatedTotal)}</strong></p>
            </div>
            <div className="form-actions">
              <button className="final-confirm-btn" onClick={handleBooking} disabled={loading}>
                {loading ? "Đang xử lý..." : "Xác nhận & Đặt"}
              </button>
              <button className="back-btn" onClick={() => setShowConfirmPopup(false)} disabled={loading}>
                Quay lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}