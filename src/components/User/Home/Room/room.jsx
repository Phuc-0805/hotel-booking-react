import "./room.css";
import "../../Header/header.css";
import img1 from "../../../../assets/tongquan.jpg";
import img2 from "../../../../assets/Copy-of-Deluxe-Twins.jpg";
import img3 from "../../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg";
import img4 from "../../../../assets/tongquan.jpg";
import img5 from "../../../../assets/Copy-of-Deluxe-Twins.jpg";
import img6 from "../../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg";

const rooms = [
  { img: img1, title: "Bed Room" },
  { img: img2, title: "Bed Room" },
  { img: img3, title: "Bed Room" },
  { img: img4, title: "Bed Room" },
  { img: img5, title: "Bed Room" },
  { img: img6, title: "Bed Room" }
];

export default function Rooms() {
  return (
    <div className="rooms-section">
      <div className="rooms-header">
        <h2><span></span>OUR ROOM<span></span></h2>
        <p>Lorem ipsum available...</p>
      </div>

      <div className="room-grid">
        {rooms.map((room, index) => (
          <div key={index} className={`room-card ${room.highlight ? "highlight" : ""}`}>
            <img src={room.img} alt={room.title} />
            <div className="card-content">
              <h3>{room.title}</h3>
              <p>If you are going to use a passage...</p>
              {/* Thêm nút "Đặt ngay" */}
              <button className="book-now-btn">Đặt ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
