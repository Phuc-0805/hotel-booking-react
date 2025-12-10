import React from "react";
import "../pop.css";

function Restaurant({ isOpen, onClose, content }) {

  if (!isOpen || content?.type !== "Restaurant") return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <img src={content.imageSrc} alt="" className="modal-image" />

        <h2 className="modal-title">{content.title}</h2>

        <div className="modal-body">
            <p>
                Tại khách sạn của chúng tôi, ẩm thực không chỉ là bữa ăn, mà là một hành trình khám phá vị giác đầy tinh tế và đáng nhớ.
                Chúng tôi tự hào giới thiệu một bức tranh ẩm thực đa sắc màu, từ những món ăn truyền thống đậm đà bản sắc cho đến tinh
                hoa quốc tế được chế biến bởi đội ngũ đầu bếp tài năng.

                <br /><br />

                Mỗi không gian ẩm thực, từ nhà hàng cao cấp phục vụ các bữa tối sang trọng, đến quán bar thư giãn với cocktail sáng tạo,
                đều mang đến một trải nghiệm độc đáo. Chúng tôi luôn ưu tiên sử dụng nguyên liệu tươi ngon, chất lượng hàng đầu, được chọn
                lọc kỹ lưỡng, đảm bảo sự hài lòng tuyệt đối cho mọi thực khách. Hãy để chúng tôi đánh thức mọi giác quan của bạn qua từng
                hương vị, trong không gian lịch thiệp và dịch vụ chăm sóc tận tâm.
            </p>
        </div>

        <button className="modal-close-btn" onClick={onClose}>
            Đóng
        </button>
      </div>
    </div>
  );
}

export default Restaurant;
