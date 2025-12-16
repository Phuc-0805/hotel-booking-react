import "./room.css";
import "../../Header/header.css";
import img1 from "../../../../assets/tongquan.jpg";
import img2 from "../../../../assets/Copy-of-Deluxe-Twins.jpg";
import img3 from "../../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg";

const rooms = [
  { img: img1, title: "Bed Room" },
  { img: img2, title: "Deluxe Room" },
  { img: img3, title: "Luxury Room" },
  { img: img1, title: "Family Room" },
  { img: img2, title: "Twin Room" },
  { img: img3, title: "Suite Room" }
];

export default function Rooms() {
  return (
    <section className="rooms-section">
      {/* container chung để header & grid cùng trục */}
      <div className="rooms-container">

        <div className="rooms-header">
          <h2>
            OUR ROOM
            <span></span>
          </h2>
          <p>Lorem ipsum available...</p>
        </div>

        <div className="room-grid">
          {rooms.map((room, index) => (
            <div className="room-card" key={index}>
              <div className="room-image">
                <img src={room.img} alt={room.title} />
              </div>

              <div className="card-content">
                <h3>{room.title}</h3>
                <p>If you are going to use a passage...</p>
                <button className="book-now-btn">Đặt ngay</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
