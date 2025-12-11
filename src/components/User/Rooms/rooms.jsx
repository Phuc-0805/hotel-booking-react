import React from "react";
import "./rooms.css";
import Header from "../Header/header.jsx";
import Footer from "../footer/footer.jsx";

export default function Rooms({ rooms }) {
  return (
    <>
      <Header />

      <div className="rooms2-header">
        <h2>Danh sách phòng</h2>
      </div>

      <section id="rooms2-section">

        <div className="rooms2-container">

          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div key={room.id} className="room2-card">

                {/* Ảnh phòng */}
                <div className="room2-image">
                  <img src={room.image} alt={room.type} />
                </div>

                {/* Nội dung phòng */}
                <div className="room2-content">
                  <h3>{room.type}</h3>
                  <p className="type">{room.roomCategory}</p>
                  <p className="price">
                    Giá: {room.price.toLocaleString()} VND / đêm
                  </p>

                  {/* Nút đặt ngay */}
                  <button 
                    className="book-btn"
                    onClick={() => {}}
                  >
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
      <Footer />
    </>
  );
}
