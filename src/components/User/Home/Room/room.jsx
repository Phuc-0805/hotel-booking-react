import "./room.css";
import "../../Header/header.css";
import { useNavigate } from "react-router-dom"; 
import img1 from "../../../../assets/tongquan.jpg";
import img2 from "../../../../assets/Copy-of-Deluxe-Twins.jpg";
import img3 from "../../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg";

const roomsData = [
  { img: img1, title: "Single Room" },
  { img: img2, title: "Double Room" },
  { img: img3, title: "Luxury Room" },
  { img: img1, title: "Family Room" },
  { img: img2, title: "Single Room" },
  { img: img3, title: "Suite Room" }
];

// Nhận prop auth từ Home.jsx truyền xuống
export default function Room({ auth }) {
  const navigate = useNavigate(); 

  const handleBooking = (roomTitle) => {
    if (!auth) {
      // Nếu chưa đăng nhập, chuyển hướng đến login và ghi nhớ trang muốn vào
      navigate("/login", { state: { from: "/rooms" } });
    } else {
      // Nếu đã đăng nhập, chuyển đến trang danh sách phòng chi tiết
      navigate("/rooms");
    }
  };

  return (
    <section className="rooms-section">
      <div className="rooms-container">
        <div className="rooms-header">
          <h2>
            OUR ROOM
            <span></span>
          </h2>
          <p>Khám phá không gian nghỉ dưỡng sang trọng và tiện nghi bậc nhất.</p>
        </div>

        <div className="room-grid">
          {roomsData.map((room, index) => (
            <div className="room-card" key={index}>
              <div className="room-image">
                <img src={room.img} alt={room.title} />
              </div>

              <div className="card-content">
                <h3>{room.title}</h3>
                <p>Trải nghiệm dịch vụ đẳng cấp quốc tế với không gian tinh tế.</p>
                
                <button 
                  className="book-now-btn" 
                  onClick={() => handleBooking(room.title)}
                >
                  Đặt ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}