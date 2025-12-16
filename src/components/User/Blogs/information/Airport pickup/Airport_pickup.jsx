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

                    {/* --- Phần hiển thị Tags (nếu có) --- */}
                    {content.features && (
                        <div className="modal-features-list">
                            {content.features.map((item, index) => (
                                <span key={index} className="modal-tag-item">
                                    ✅ {item}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* --- Nội dung chính về AIRPORT PICKUP --- */}
                    <p className="modal-heading">✈️ Đón Tiễn Sân Bay: Hành Trình Êm Ái & Đẳng Cấp</p>

                    <p>
                        Gạt bỏ mọi mệt mỏi sau chuyến bay dài và sự ồn ào nơi phi trường. 
                        Dịch vụ <strong>Airport Pickup & Transfer</strong> của chúng tôi cam kết mang lại 
                        sự riêng tư, thoải mái và an toàn tuyệt đối ngay từ khoảnh khắc quý khách đặt chân đến thành phố.
                    </p>

                    <p className="modal-heading">🚘 Trải Nghiệm Thượng Lưu Trên Mọi Cung Đường</p>
                    
                    <p>
                        Chúng tôi cung cấp các giải pháp di chuyển linh hoạt, đáp ứng mọi nhu cầu của đoàn khách hoặc cá nhân:
                    </p>
                    
                    <ul>
                        <li>
                            <strong>Đội xe sang trọng đời mới:</strong> Tuỳ chọn đa dạng từ các dòng Sedan cao cấp (Mercedes E-Class, BMW 5 Series) 
                            đến SUV rộng rãi hoặc Limousine Dcar thượng hạng cho các nhóm VIP.
                        </li>
                        <li>
                            <strong>Tài xế chuyên nghiệp (Private Chauffeur):</strong> Đội ngũ tài xế được đào tạo bài bản, 
                            thông thạo tiếng Anh, luôn đúng giờ, hỗ trợ mang vác hành lý và am hiểu lộ trình giao thông.
                        </li>
                        <li>
                            <strong>Tiện nghi 5 sao trên xe:</strong> Xe luôn được trang bị sẵn khăn lạnh, nước suối khoáng, 
                            Wifi tốc độ cao và cổng sạc thiết bị để quý khách thư giãn hoặc làm việc ngay trên đường đi.
                        </li>
                    </ul>

                    <p>
                        Chỉ cần cung cấp mã chuyến bay, nhân viên của chúng tôi sẽ chờ sẵn tại sảnh đến 
                        với bảng tên trang trọng, sẵn sàng hỗ trợ quý khách về khách sạn nhanh chóng nhất.
                    </p>

                    <p style={{ textAlign: 'center', marginTop: '15px', fontStyle: 'italic', color: '#c51d0d' }}>
                        <strong>🕒 Dịch vụ hoạt động 24/7 (Vui lòng đặt trước tối thiểu 4 tiếng)</strong>
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