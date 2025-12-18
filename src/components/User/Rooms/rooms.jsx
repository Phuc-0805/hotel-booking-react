import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/header.jsx";
import Footer from "../footer/footer.jsx";
import BookingForm from "./bookingroom.jsx";
import "./rooms.css";

export default function Rooms({ rooms, auth, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [displayRooms, setDisplayRooms] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => { setDisplayRooms(rooms); }, [rooms]);

  useEffect(() => {
    const roomIdFromState = location.state?.roomId;
    if (roomIdFromState) {
      setSelectedRoomId(roomIdFromState);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const selectedRoom = displayRooms.find(r => r.id === selectedRoomId);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) { alert("Vui lòng chọn ngày"); return; }
    try {
      const params = new URLSearchParams({ checkIn, checkOut });
      if (roomType) params.append("roomType", roomType);
      const res = await fetch(`http://localhost:9192/rooms/search?${params.toString()}`);
      const data = await res.json();
      setDisplayRooms(data);
    } catch (err) { console.error("Lỗi kết nối máy chủ", err); }
  };

  return (
    <>
      <Header auth={auth} onLogout={onLogout} />
      <div className="rooms2-header"><h2>Danh sách phòng</h2></div>
      <div className="search-bar">
        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
        <input type="text" placeholder="Loại phòng" value={roomType} onChange={e => setRoomType(e.target.value)} />
        <button onClick={handleSearch}>Tìm kiếm</button>
        <button onClick={() => setDisplayRooms(rooms)}>Tất cả</button>
      </div>
      <section id="rooms2-section">
        <div className="rooms2-container">
          {displayRooms.map(room => (
            <div key={room.id} className="room2-card">
              <div className="room2-image"><img src={room.photo ? `data:image/jpeg;base64,${room.photo}` : "/no-image.png"} alt="" /></div>
              <div className="room2-content">
                <h3>{room.roomType}</h3>
                <p>{Number(room.roomPrice).toLocaleString()} VND</p>
                <button className="book-btn" onClick={() => {
                  if (!auth) { navigate("/login", { state: { from: "/rooms", roomId: room.id } }); return; }
                  setSelectedRoomId(room.id);
                }}>{auth ? "Đặt ngay" : "Đăng nhập để đặt"}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {selectedRoomId && selectedRoom && (
        <BookingForm room={selectedRoom} auth={auth} onClose={() => setSelectedRoomId(null)} onBookingSuccess={() => setSelectedRoomId(null)} />
      )}
      <Footer />
    </>
  );
}