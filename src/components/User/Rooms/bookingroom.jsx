import React, { useState } from "react";
import "./bookingroom.css";


// Danh sách service (có giá tạm thời, có thể lấy từ backend)
const SERVICE_TYPES = [
  { name: "Airport Pickup", value: "AIRPORT_PICKUP", price: 100000, rule: "FIXED" },
  { name: "Extra Bed", value: "EXTRA_BED", price: 200000, rule: "PER_NIGHT" },
  { name: "Breakfast", value: "BREAKFAST", price: 50000, rule: "PER_PERSON_PER_NIGHT" },
];

export default function BookingForm({ room, userEmail, onClose, onBookingSuccess }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalGuests, setTotalGuests] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  const roomPrice = Number(room.roomPrice) || 0;

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
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    if (roomPrice === 0 || nights === 0) return 0;

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
    if (!checkInDate || !checkOutDate || totalGuests < 1) {
      alert("Vui lòng nhập đầy đủ thông tin đặt phòng");
      return;
    }
    setEstimatedTotal(calculateTotal());
    setShowConfirmPopup(true);
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:9192/bookings/room/${room.id}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestEmail: userEmail,
          guestFullName: userEmail,
          checkInDate,
          checkOutDate,
          totalNumberOfGuest: totalGuests,
          selectedServices,
        }),
      });

      const data = await res.text();
      if (!res.ok) throw new Error(data || "Đặt phòng thất bại");

      alert(`✅ ${data}`);
      onBookingSuccess();
      onClose();
    } catch (err) {
      console.error("Lỗi booking:", err);
      alert("❌ Lỗi khi đặt phòng, xem console");
    } finally {
      setLoading(false);
      setShowConfirmPopup(false);
    }
  };

  return (
    <div className="booking-overlay">
      <div className="booking-form">
        <h3>Đặt phòng: {room.roomType}</h3>
        <p>Phòng ID: {room.id}</p>
        <p>Giá phòng: {formatVND(roomPrice)} / đêm</p>

        <label>Ngày nhận phòng:</label>
        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />

        <label>Ngày trả phòng:</label>
        <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />

        <label>Số khách:</label>
        <input type="number" min="1" value={totalGuests} onChange={(e) => setTotalGuests(Number(e.target.value))} />

        <label>Dịch vụ bổ sung:</label>
        <div className="services">
          {SERVICE_TYPES.map((service) => (
            <label key={service.value} className="service-item">
              <input
                type="checkbox"
                value={service.value}
                checked={selectedServices.includes(service.value)}
                onChange={handleServiceChange}
              />
              <span className="service-name">{service.name}</span>
            </label>
          ))}
        </div>

        <div className="form-actions">
          <button onClick={handlePreConfirm}>Xác nhận đặt</button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>

      {/* Popup xác nhận */}
      {showConfirmPopup && (
        <div className="confirm-overlay">
          <div className="confirm-popup">
            <h3>Xác nhận thông tin đặt phòng</h3>
            <p>Ngày nhận phòng: {checkInDate}</p>
            <p>Ngày trả phòng: {checkOutDate}</p>
            <p>Số khách: {totalGuests}</p>

            <p><strong>Chi tiết dịch vụ:</strong></p>
            <p>Giá phòng: {formatVND(roomPrice * calculateNights())}</p>
            {selectedServices.length > 0 ? selectedServices.map(s => {
              const service = SERVICE_TYPES.find(item => item.value === s);
              let serviceTotal = 0;
              switch(service.rule){
                case "FIXED": serviceTotal = service.price; break;
                case "PER_NIGHT": serviceTotal = service.price * calculateNights(); break;
                case "PER_PERSON_PER_NIGHT": serviceTotal = service.price * totalGuests * calculateNights(); break;
                default: break;
              }
              return <p key={s}>{service.name}: {formatVND(serviceTotal)}</p>
            }) : <p>Không có dịch vụ bổ sung</p>}

            <p><strong>Tổng tiền dự kiến: {formatVND(estimatedTotal)}</strong></p>

            <div className="form-actions">
              <button onClick={handleBooking} disabled={loading}>
                {loading ? "Đang đặt..." : "Xác nhận đặt"}
              </button>
              <button onClick={() => setShowConfirmPopup(false)} disabled={loading}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
