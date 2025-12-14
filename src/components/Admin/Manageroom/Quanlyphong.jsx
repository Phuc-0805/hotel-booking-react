import React, { useEffect, useState } from "react";
import Head from "../Head/Homebar.jsx";
import "../Trangchu.css";
import "./Quanlyphong.css";

export default function Trangchu() {
  const [rooms, setRooms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [newRoom, setNewRoom] = useState({
    roomType: "",
    roomPrice: "",
    photo: null
  });

  // ================= LOAD ROOMS =================
  const loadRooms = async () => {
    try {
      const res = await fetch("http://localhost:9192/rooms/all-rooms");
      if (!res.ok) throw new Error("Không load được danh sách phòng");
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Lỗi load rooms:", err);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // ================= ADD ROOM =================
  const handleAddRoom = async () => {
    if (!newRoom.roomType || !newRoom.roomPrice || !newRoom.photo) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("roomType", newRoom.roomType.trim());
    formData.append("roomPrice", newRoom.roomPrice.toString());
    formData.append("photo", newRoom.photo);

    try {
      const response = await fetch("http://localhost:9192/rooms/add/new-room", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Thêm phòng thất bại");

      alert("✅ Thêm phòng thành công!");
      setShowAddForm(false);
      setNewRoom({ roomType: "", roomPrice: "", photo: null });
      loadRooms();
    } catch (error) {
      console.error("Lỗi thêm phòng:", error);
      alert("❌ Lỗi khi thêm phòng");
    }
  };

  // ================= DELETE ROOM =================
  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm("Bạn có chắc muốn xóa phòng này?")) return;

    try {
      const response = await fetch(
        `http://localhost:9192/rooms/delete/room/${roomId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Xóa phòng thất bại");

      alert("✅ Xóa phòng thành công!");
      loadRooms();
    } catch (error) {
      console.error("Lỗi xóa phòng:", error);
      alert("❌ Lỗi khi xóa phòng");
    }
  };

  // ================= UPDATE ROOM =================
  const handleUpdateRoom = async () => {
    if (!editingRoom) return;

    const formData = new FormData();
    formData.append("roomType", editingRoom.roomType.trim());
    formData.append("roomPrice", editingRoom.roomPrice.toString());
    if (editingRoom.photo) formData.append("photo", editingRoom.photo);

    try {
      const res = await fetch(
        `http://localhost:9192/rooms/update/${editingRoom.id}`,
        { method: "PUT", body: formData }
      );

      if (!res.ok) throw new Error("Cập nhật thất bại");

      alert("✅ Cập nhật phòng thành công!");
      setEditingRoom(null);
      loadRooms();
    } catch (error) {
      console.error("Lỗi update phòng:", error);
      alert("❌ Lỗi khi cập nhật phòng");
    }
  };

  // ================= RENDER =================
  return (
    <div className="admin-layout">
      <Head />

      <div className="page-content">
        <div className="QLP-section">
          <div className="QLP-header-3">
            <h1>Quản lý phòng</h1>
            <button className="QLP-btn-3" onClick={() => setShowAddForm(true)}>
              + Thêm phòng
            </button>
          </div>

          {/* ===== FORM ADD ROOM ===== */}
          {showAddForm && (
            <div className="room-form-3">
              <h3>Thêm phòng mới</h3>

              <input
                type="text"
                placeholder="Loại phòng"
                value={newRoom.roomType}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, roomType: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Giá phòng"
                value={newRoom.roomPrice}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, roomPrice: e.target.value })
                }
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewRoom({ ...newRoom, photo: e.target.files[0] })
                }
              />

              <div className="QLPform-actions">
                <button className="QLP-btnsua-3" onClick={handleAddRoom}>
                  Lưu
                </button>
                <button className="QLP-btnxoa-3" onClick={() => setShowAddForm(false)}>
                  Hủy
                </button>
              </div>
            </div>
          )}

          {/* ===== ROOM LIST ===== */}
          <h2 style={{ marginTop: "30px" }}>Danh sách phòng</h2>

          <div className="room-list-3">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div className="room-card-3" key={room.id}>
                  <img
                    className="room-img-3"
                    src={
                      room.photo
                        ? `data:image/jpeg;base64,${room.photo}`
                        : "/no-image.png"
                    }
                    alt={room.roomType}
                  />

                  <div className="room-info-3">
                    <h3>{room.roomType}</h3>
                    <p className="price-3">
                      {Number(room.roomPrice).toLocaleString()} đ
                    </p>

                    <div className="room-actions">
                      <button
                        className="QLP-btnsua-3"
                        onClick={() => setEditingRoom(room)}
                      >
                        Sửa
                      </button>
                      <button
                        className="QLP-btnxoa-3"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Chưa có phòng nào</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
