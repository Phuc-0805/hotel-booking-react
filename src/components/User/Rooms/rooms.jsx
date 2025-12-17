import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/header.jsx";
import Footer from "../footer/footer.jsx";
import BookingForm from "./bookingroom.jsx";
import "./rooms.css";

export default function Rooms({ rooms, userEmail, auth }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [displayRooms, setDisplayRooms] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Email hiện tại dựa vào state App
  const currentUserEmail = auth?.email || userEmail || null;

  useEffect(() => {
    setDisplayRooms(rooms);
  }, [rooms]);

  // Nếu navigate từ login có roomId → mở form tự động
  useEffect(() => {
    const roomIdFromState = location.state?.roomId;
    if (roomIdFromState) {
      setSelectedRoomId(roomIdFromState);
      navigate(location.pathname, { replace: true }); // xóa state.roomId
    }
  }, [location.state, navigate, location.pathname]);

  const selectedRoom = displayRooms.find(r => r.id === selectedRoomId);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      alert("Vui lòng chọn ngày check-in và check-out");
      return;
    }
    try {
      const params = new URLSearchParams({ checkIn, checkOut });
      if (roomType) params.append("roomType", roomType);

      const res = await fetch(`http://localhost:9192/rooms/search?${params.toString()}`);
      const data = await res.json();
      setDisplayRooms(data);
    } catch (err) {
      console.error(err);
    }
  };

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

      <div className="search-bar">
        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
        <input
          type="text"
          placeholder="Loại phòng"
          value={roomType}
          onChange={e => setRoomType(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
        <button onClick={handleReset}>Tất cả phòng</button>
      </div>

      <section id="rooms2-section">
        <div className="rooms2-container">
          {displayRooms.length > 0 ? (
            displayRooms.map(room => (
              <div key={room.id} className="room2-card">
                <div className="room2-image">
                  <img
                    src={room.photo ? `data:image/jpeg;base64,${room.photo}` : "/no-image.png"}
                    alt={room.roomType}
                  />
                </div>

                <div className="room2-content">
                  <h3>{room.roomType}</h3>
                  <p className="price">Giá: {Number(room.roomPrice).toLocaleString()} VND / đêm</p>

                  <button
                    className="book-btn"
                    onClick={() => {
                      // Nếu chưa login → redirect login
                      if (!currentUserEmail) {
                        navigate("/login", {
                          state: { from: "/rooms", roomId: room.id },
                        });
                        return;
                      }
                      setSelectedRoomId(room.id);
                    }}
                  >
                    {currentUserEmail ? "Đặt ngay" : "Đăng nhập để đặt"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-room">Không có phòng phù hợp.</p>
          )}
        </div>
      </section>

      {/* Booking Form chỉ mở khi user đã login */}
      {selectedRoomId && selectedRoom && currentUserEmail && (
        <BookingForm
          room={selectedRoom}
          userEmail={currentUserEmail}
          onClose={() => setSelectedRoomId(null)}
          onBookingSuccess={() => {
            console.log("Booking thành công");
            setSelectedRoomId(null); // đóng form sau khi booking
          }}
        />
      )}

      <Footer />
    </>
  );
}
