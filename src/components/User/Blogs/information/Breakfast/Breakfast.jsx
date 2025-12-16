import React from 'react';

import "../pop.css";
const Modal = ({ isOpen, onClose, content }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Nút đóng */}
                

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

                {/* Nội dung mô tả — chuyển từ markdown sang HTML thủ công */}
                <div className="modal-body">

                    {/* --- Phần hiển thị Tags --- */}
                    {content.features && (
                        <div className="modal-features-list" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
                            {content.features.map((item, index) => (
                                <span key={index} className="modal-tag-item" style={{ background: '#f0f4f8', padding: '5px 10px', borderRadius: '15px', fontSize: '0.9em', color: '#333' }}>
                                    ✅ {item}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* --- Nội dung chính --- */}
                    <p className="modal-heading">🍳 Khởi Đầu Ngày Mới Hoàn Hảo</p>

                    <p>
                        Tại <strong>Khách sạn của chúng tôi</strong>, bữa sáng không chỉ là một bữa ăn, 
                        mà là một hành trình đánh thức vị giác. Chúng tôi phục vụ thực đơn 
                        <strong> International Buffet </strong> đẳng cấp, nơi hương vị truyền thống Việt Nam 
                        hòa quyện cùng nét tinh tế của ẩm thực phương Tây.
                    </p>

                    <p className="modal-heading">🥐 Thực Đơn Đa Dạng & Tươi Ngon</p>

                    <p>
                        Quý khách sẽ được thưởng thức nguồn nguyên liệu tươi sạch nhất được tuyển chọn mỗi ngày. 
                        <strong> Quầy đồ nóng Á Đông </strong> nổi bật với món phở bò truyền thống, 
                        hủ tiếu Nam Vang hay cháo nóng hổi mang đậm hồn Việt.
                    </p>

                    <p>
                        Bên cạnh đó là <strong> Bakery & Pastry Âu Châu </strong> với các loại bánh mì nướng thủ công, 
                        Croissant bơ Pháp thơm lừng, dùng kèm các loại mứt trái cây nhiệt đới và bơ thượng hạng.
                        Đặc biệt có khu vực <strong> Healthy Corner </strong> dành cho lối sống lành mạnh.
                    </p>

                    <p>
                        Không gian nhà hàng ngập tràn ánh sáng tự nhiên cùng hương thơm của 
                        <strong> cà phê rang xay tại chỗ </strong> sẽ mang lại nguồn năng lượng tuyệt vời 
                        để quý khách sẵn sàng cho một ngày khám phá thú vị.
                    </p>
                    
                    <p style={{ textAlign: 'center', marginTop: '15px', fontStyle: 'italic', color: '#c51d0d' }}>
                        <strong>🕒 Giờ phục vụ: 06:00 AM – 10:00 AM hàng ngày</strong>
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