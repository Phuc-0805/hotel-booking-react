import React from 'react';
import "../pop.css"; // Dùng chung CSS với các modal khác

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

                    <p className="modal-heading">🛏️ Tiện Nghi & Linh Hoạt Cho Kỳ Nghỉ</p>

                    <p>
                        Dịch vụ **Extra Bed (Giường phụ)** của chúng tôi là giải pháp hoàn hảo cho các gia đình hoặc nhóm bạn muốn ở chung phòng nhưng vẫn đảm bảo sự thoải mái riêng biệt. 
                        Không chỉ là một chiếc đệm phụ, chúng tôi cung cấp tiêu chuẩn giường ngủ êm ái như giường chính.
                    </p>

                    <p className="modal-heading">✨ Chi Tiết Dịch Vụ</p>
                    
                    <ul>
                        <li>
                            <strong>Chất lượng 5 sao:</strong> Sử dụng đệm lò xo cao cấp dày 25cm, đi kèm chăn ga gối lông vũ tiêu chuẩn khách sạn.
                        </li>
                        <li>
                            <strong>Setup nhanh chóng:</strong> Nhân viên buồng phòng sẽ hỗ trợ kê giường và dọn dẹp chỉ trong vòng 15 phút sau khi yêu cầu.
                        </li>
                        <li>
                            <strong>Bao gồm ăn sáng:</strong> Phí kê giường phụ đã bao gồm suất ăn sáng Buffet Quốc tế cho người thứ 3.
                        </li>
                    </ul>

                    <p className="modal-heading">💰 Chi Phí Tham Khảo</p>
                    <p>
                        Giá: <strong>550.000 VNĐ / đêm</strong> (Chưa bao gồm VAT & Phí phục vụ). <br/>
                        <em>Miễn phí nôi (Crib) cho trẻ em dưới 2 tuổi.</em>
                    </p>

                    <p style={{ textAlign: 'center', marginTop: '15px', color: '#c51d0d' }}>
                        <strong>📞 Vui lòng liên hệ Lễ tân hoặc đặt trước khi Booking để được phục vụ tốt nhất.</strong>
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