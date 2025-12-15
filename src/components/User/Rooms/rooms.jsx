import React, { useState } from "react";
import "./rooms.css";
import Header from "../Header/header.jsx";
import Footer from "../footer/footer.jsx";
import BookingForm from "./bookingroom.jsx";

export default function Rooms({ rooms, userEmail }) {
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // Lấy object phòng hiện tại
  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  return (
    <>
      <Header />

      <div className="rooms2-header">
        <h2>Danh sách phòng</h2>
      </div>

      <section id="rooms2-section">
        <div className="rooms2-container">
          {rooms && rooms.length > 0 ? (
            rooms.map((room) => (
              <div key={room.id} className="room2-card">
                <div className="room2-image">
                  <img
                    src={room.photo ? `data:image/jpeg;base64,${room.photo}` : "/no-image.png"}
                    alt={room.roomType}
                  />
                </div>

                <div className="room2-content">
                  <h3>{room.roomType}</h3>
                  <p className="price">
                    Giá: {Number(room.roomPrice).toLocaleString()} VND / đêm
                  </p>

                  <button className="book-btn" onClick={() => setSelectedRoomId(room.id)}>
                    Đặt ngay
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-room">Chưa có phòng nào.</p>
          )}
        </div>
      </section>

      {selectedRoomId && selectedRoom && (
        <BookingForm
          room={selectedRoom} // truyền object room
          userEmail={userEmail}
          onClose={() => setSelectedRoomId(null)}
          onBookingSuccess={() => console.log("Booking thành công")}
        />
      )}

      <Footer />
    </>
  );
}
