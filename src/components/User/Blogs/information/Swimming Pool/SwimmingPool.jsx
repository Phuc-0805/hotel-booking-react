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

                    <p className="modal-heading">🏊 Hồ Bơi Vô Cực – Miễn Phí & Đẳng Cấp</p>

                    <p>
                        Đắm mình trong làn nước xanh mát lạnh tại **Infinity Pool** trên tầng thượng của khách sạn. 
                        Đây là đặc quyền **hoàn toàn miễn phí** dành riêng cho khách lưu trú, mang lại trải nghiệm thư giãn tuyệt đối giữa lòng thành phố.
                    </p>

                    <p className="modal-heading">🌊 Trải Nghiệm Khác Biệt</p>
                    
                    <ul>
                        <li>
                            <strong>Tầm nhìn Panorama:</strong> View 360 độ ngắm trọn cảnh biển và thành phố, đặc biệt rực rỡ vào lúc hoàng hôn.
                        </li>
                        <li>
                            <strong>Hệ thống lọc nước muối khoáng:</strong> An toàn cho da, không gây kích ứng mắt, bảo vệ sức khỏe người bơi.
                        </li>
                        <li>
                            <strong>Tiện ích đi kèm:</strong> Khăn tắm, ghế tắm nắng và nước suối detox được phục vụ miễn phí tại khu vực hồ bơi.
                        </li>
                        <li>
                            <strong>Pool Bar:</strong> Thưởng thức các loại Cocktail nhiệt đới ngay cạnh hồ bơi (Dịch vụ đồ uống có tính phí ưu đãi).
                        </li>
                    </ul>

                    <p style={{ textAlign: 'center', marginTop: '15px', color: '#c51d0d' }}>
                        <strong>🕒 Giờ mở cửa: 06:00 AM – 21:00 PM hàng ngày</strong>
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