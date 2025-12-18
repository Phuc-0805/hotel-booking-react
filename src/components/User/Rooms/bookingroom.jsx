import { useState } from "react";
import "./bookingroom.css";

// Danh sách service
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

  const roomPrice = Number(room.roomPrice) || 0;
  
  // Lấy email trực tiếp từ prop auth để đảm bảo tính đồng bộ
  const userEmail = auth?.email;

  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

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
        case "FIXED":
          total += service.price;
          break;
        case "PER_NIGHT":
          total += service.price * nights;
          break;
        case "PER_PERSON_PER_NIGHT":
          total += service.price * totalGuests * nights;
          break;
        default:
          break;
      }
    });
    return total;
  };

  const handlePreConfirm = () => {
    // Kiểm tra trạng thái đăng nhập từ auth prop
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
      const headers = { 
        "Content-Type": "application/json" 
      };
      
      // Đính kèm Token từ auth prop
      if (auth?.token) {
        headers["Authorization"] = `Bearer ${auth.token}`;
      }

      const res = await fetch(`http://localhost:9192/bookings/room/${room.id}/booking`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          guestEmail: userEmail,
          guestFullName: userEmail, // Sử dụng email làm tên nếu không có trường name
          checkInDate,
          checkOutDate,
          totalNumberOfGuest: totalGuests,
          selectedServices,
        }),
      });

      // Xử lý lỗi 401 Unauthorized ngay lập tức
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
      console.error("Lỗi booking:", err);
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
        <p className="room-info">Giá phòng: <strong>{formatVND(roomPrice)}</strong> / đêm</p>

        <div className="input-group">
          <label>Ngày nhận phòng:</label>
          <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Ngày trả phòng:</label>
          <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Số khách:</label>
          <input
            type="number"
            min="1"
            value={totalGuests}
            onChange={(e) => setTotalGuests(Number(e.target.value))}
          />
        </div>

        <label className="service-label">Dịch vụ bổ sung:</label>
        <div className="services-list">
          {SERVICE_TYPES.map((service) => (
            <label key={service.value} className="service-item">
              <input
                type="checkbox"
                value={service.value}
                checked={selectedServices.includes(service.value)}
                onChange={handleServiceChange}
              />
              <span>{service.name} ({formatVND(service.price)})</span>
            </label>
          ))}
        </div>

        <div className="form-actions">
          <button className="confirm-btn" onClick={handlePreConfirm}>Xác nhận đặt</button>
          <button className="cancel-btn" onClick={onClose}>Hủy</button>
        </div>
      </div>

      {showConfirmPopup && (
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