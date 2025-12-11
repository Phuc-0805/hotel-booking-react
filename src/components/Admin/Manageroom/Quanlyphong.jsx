import React, { useState } from "react";
import Head from "../Head/Homebar.jsx";
import "../Trangchu.css";
import "./Quanlyphong.css";

export default function Trangchu({ rooms, setRooms }) {

  const [newRoom, setNewRoom] = useState({
    name: "",
    price: "",
    type: "",
    image: ""
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddRoom = () => {
    if (!newRoom.name || !newRoom.price || !newRoom.type || !newRoom.image) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newData = {
      id: rooms.length + 1,
      name: newRoom.name,
      price: Number(newRoom.price),
      type: newRoom.type,
      image: newRoom.image
    };

    setRooms([...rooms, newData]);
    setNewRoom({ name: "", price: "", type: "", image: "" });
    setShowForm(false);
  };

  return (
    <div className="admin-layout">
      <Head />

      <div className="page-content">
        <div className="QLP-section">
          <div className="QLP-header">
            <h1>Quản lý phòng</h1>

            <button className="QLP-btn" onClick={() => setShowForm(true)}>
                + Thêm phòng
            </button>
            </div>

          {/* Form thêm phòng */}
          {showForm && (
            <div className="room-form">
              <h3>Thêm phòng mới</h3>

              <input
                type="text"
                placeholder="Tên phòng"
                value={newRoom.name}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, name: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Giá phòng"
                value={newRoom.price}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, price: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Loại phòng (Single, Double, Suite...)"
                value={newRoom.type}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, type: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Link ảnh phòng"
                value={newRoom.image}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, image: e.target.value })
                }
              />

              <div className="form-actions">
                <button className="save-btn" onClick={handleAddRoom}>
                  Lưu
                </button>

                <button className="cancel-btn" onClick={() => setShowForm(false)}>
                  Hủy
                </button>
              </div>
            </div>
          )}
          <h2 style={{ marginTop: "30px" }}>Danh sách phòng</h2>

            <div className="room-list">
            {rooms.map((room) => (
                <div className="room-card" key={room.id}>
                <img src={room.image} alt={room.name} className="room-img" />
                <div className="room-info">
                    <h3>{room.name}</h3>
                    <p>Loại: {room.type}</p>
                    <p className="price">{room.price.toLocaleString()} đ</p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}
