import React, { useState } from "react";
import "./bookingroom.css";

// Danh sách service từ backend hoặc hardcode
const SERVICE_TYPES = [
  { name: "Airport Pickup", value: "AIRPORT_PICKUP" },
  { name: "Extra Bed", value: "EXTRA_BED" },
  { name: "Breakfast", value: "BREAKFAST" },
];

export default function BookingForm({ roomId, userEmail, onClose, onBookingSuccess }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalGuests, setTotalGuests] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== value));
    }
  };

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate || totalGuests < 1) {
      alert("Vui lòng nhập đầy đủ thông tin đặt phòng");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:9192/bookings/room/${roomId}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestEmail: userEmail,
          guestFullName: userEmail, // hoặc nhập thêm tên
          checkInDate,
          checkOutDate,
          totalNumberOfGuest: totalGuests,
          selectedServices, // gửi danh sách service
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
    }
  };

  return (
    <div className="booking-overlay">
      <div className="booking-form">
        <h3>Đặt phòng</h3>
        <p>Phòng ID: {roomId}</p>

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
          <button onClick={handleBooking} disabled={loading}>
            {loading ? "Đang đặt..." : "Xác nhận đặt"}
          </button>
          <button onClick={onClose} disabled={loading}>Hủy</button>
        </div>
      </div>
    </div>
  );
}
