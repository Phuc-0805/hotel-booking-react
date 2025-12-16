import React, { useEffect, useState } from "react";
import "./rooms.css";
import Header from "../Header/header.jsx";
import Footer from "../footer/footer.jsx";
import BookingForm from "./bookingroom.jsx";

export default function Rooms({ rooms, userEmail }) {
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // Danh sách dùng để hiển thị (ban đầu = rooms)
  const [displayRooms, setDisplayRooms] = useState([]);

  // search state
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Khi rooms từ cha thay đổi → reset danh sách hiển thị
  useEffect(() => {
    setDisplayRooms(rooms);
  }, [rooms]);

  const selectedRoom = displayRooms.find(r => r.id === selectedRoomId);

  // ===== SEARCH =====
  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      alert("Vui lòng chọn ngày check-in và check-out");
      return;
    }

    try {
      const params = new URLSearchParams({
        checkIn,
        checkOut,
      });

      if (roomType) {
        params.append("roomType", roomType);
      }

      const res = await fetch(
        `http://localhost:9192/rooms/search?${params.toString()}`
      );

      const data = await res.json();
      setDisplayRooms(data); // 🔥 chỉ thay đổi danh sách hiển thị
    } catch (err) {
      console.error(err);
    }
  };

  // Reset về danh sách ban đầu
  const handleReset = () => {
    setDisplayRooms(rooms);
    setRoomType("");
    setCheckIn("");
    setCheckOut("");
  };

  return (
    <>
      <Header />

      <div className="rooms2-header">
        <h2>Danh sách phòng</h2>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="search-bar">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <input
          type="text"
          placeholder="Loại phòng"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        />

        <button onClick={handleSearch}>Tìm kiếm</button>
        <button onClick={handleReset}>Tất cả phòng</button>
      </div>

      {/* ===== ROOM LIST ===== */}
      <section id="rooms2-section">
        <div className="rooms2-container">
          {displayRooms && displayRooms.length > 0 ? (
            displayRooms.map((room) => (
              <div key={room.id} className="room2-card">
                <div className="room2-image">
                  <img
                    src={
                      room.photo
                        ? `data:image/jpeg;base64,${room.photo}`
                        : "/no-image.png"
                    }
                    alt={room.roomType}
                  />
                </div>

                <div className="room2-content">
                  <h3>{room.roomType}</h3>
                  <p className="price">
                    Giá: {Number(room.roomPrice).toLocaleString()} VND / đêm
                  </p>

                  <button
                    className="book-btn"
                    onClick={() => setSelectedRoomId(room.id)}
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-room">Không có phòng phù hợp.</p>
          )}
        </div>
      </section>

      {selectedRoomId && selectedRoom && (
        <BookingForm
          room={selectedRoom}
          userEmail={userEmail}
          onClose={() => setSelectedRoomId(null)}
          onBookingSuccess={() => console.log("Booking thành công")}
        />
      )}

      <Footer />
    </>
  );
}
