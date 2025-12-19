import "./Aboutus.css";
import "../../Header/header.css";
import img1 from "../../../../assets/LE-GRENIER_13490-1.jpg";

export default function AboutUs() {
  return (
    <div className="aboutus-section">
      <div className="aboutus-content">
        <h2>
          THÔNG TIN KHÁCH SẠN <span></span>
        </h2>
        <p>
          Khởi đầu từ một kiến trúc cổ điển đầy hoài niệm, khách sạn đã trải qua hành trình phát triển bền bỉ qua nhiều thập kỷ. Từ một điểm dừng chân khiêm tốn, nơi đây dần chuyển mình thành biểu tượng của sự sang trọng và tinh tế, chứng kiến bao thăng trầm của thời đại. Dù đã qua nhiều lần trùng tu để đáp ứng tiêu chuẩn tiện nghi hiện đại, khách sạn vẫn giữ trọn vẹn nét đẹp di sản cùng cam kết về lòng hiếu khách tận tâm, mang đến cho du khách cảm giác như đang bước vào một trang sử sống động và ấm áp.
        </p>
        <button className="read-more-btn">ĐỌC THÊM</button>
      </div>

      <div className="aboutus-image">
       <img src={img1} alt="About Us" />
      </div>
    </div>
  );
}
