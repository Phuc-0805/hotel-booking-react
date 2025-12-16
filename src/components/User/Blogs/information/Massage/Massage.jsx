import React from 'react';
import "../pop.css";

const Modal = ({ isOpen, onClose, content }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Title */}
                <h2 className="modal-title">{content.title}</h2>

                {/* Optional Image */}
                {content.imageSrc && (
                    <img
                        src={content.imageSrc}
                        alt={content.title}
                        className="modal-image"
                    />
                )}

                <div className="modal-body">

                    <p className="modal-heading">🌸 Oasis Spa – Đánh Thức Mọi Giác Quan</p>

                    <p>
                        Bỏ lại sau lưng những ồn ào của cuộc sống, hãy bước vào không gian tĩnh lặng và ngập tràn hương thảo mộc tại **Oasis Spa**. 
                        Chúng tôi cung cấp các liệu trình trị liệu chuyên sâu giúp cân bằng Thân – Tâm – Trí.
                    </p>

                    <p className="modal-heading">💆‍♀️ Các Gói Trị Liệu Nổi Bật</p>
                    
                    <ul>
                        <li>
                            <strong>Massage Đá Nóng (Hot Stone):</strong> Sử dụng đá núi lửa bazan ấm nóng trượt trên các huyệt đạo, giúp đả thông kinh mạch và giảm đau nhức cơ bắp hiệu quả.
                        </li>
                        <li>
                            <strong>Trị Liệu Thụy Điển (Swedish):</strong> Kỹ thuật xoa bóp nhẹ nhàng kết hợp tinh dầu thiên nhiên, giúp cải thiện tuần hoàn máu và thư giãn sâu.
                        </li>
                        <li>
                            <strong>Chăm Sóc Da Mặt Cao Cấp:</strong> Sử dụng mỹ phẩm hữu cơ, giúp tái tạo làn da, mang lại vẻ tươi trẻ và rạng rỡ.
                        </li>
                    </ul>

                    <p>
                        Không gian riêng tư với tiếng nhạc thiền du dương và trà thảo mộc phục vụ miễn phí sau mỗi liệu trình sẽ mang lại cho quý khách trải nghiệm trọn vẹn nhất.
                    </p>

                    <p style={{ textAlign: 'center', marginTop: '15px', color: '#c51d0d' }}>
                        <strong>🕒 Giờ mở cửa: 09:00 AM – 22:00 PM (Vui lòng đặt lịch trước 1 tiếng)</strong>
                    </p>

                </div>

                <button className="modal-close-btn" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default Modal;