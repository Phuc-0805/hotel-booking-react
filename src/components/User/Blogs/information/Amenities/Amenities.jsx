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

                    <p className="modal-heading">🧴 Bộ Tiện Ích Cá Nhân (Amenities) Cao Cấp</p>

                    <p>
                        Chúng tôi hiểu rằng những chi tiết nhỏ nhất tạo nên sự thoải mái lớn nhất. 
                        Mỗi phòng nghỉ đều được trang bị đầy đủ bộ **Đồ dùng 1 lần** (Amenities) tiêu chuẩn 5 sao, 
                        đảm bảo sự tiện lợi tuyệt đối cho quý khách mà không cần mang theo đồ đạc lỉnh kỉnh.
                    </p>

                    <p className="modal-heading">✨ Danh Mục Đồ Dùng (Miễn Phí)</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <ul>
                            <li>🪥 <strong>Dental Kit:</strong> Bàn chải lông mềm & kem đánh răng bạc hà.</li>
                            <li>🪒 <strong>Shaving Kit:</strong> Dao cạo râu 2 lưỡi & kem cạo râu dịu nhẹ.</li>
                            <li>💆‍♀️ <strong>Vanity Kit:</strong> Bông tẩy trang, tăm bông & dũa móng tay.</li>
                        </ul>
                        <ul>
                            <li>🚿 <strong>Bath Care:</strong> Mũ trùm tóc (Shower cap) & Lược chải tóc (Comb).</li>
                            <li>🧵 <strong>Sewing Kit:</strong> Bộ kim chỉ mini cho trường hợp khẩn cấp.</li>
                            <li>🧼 <strong>Hygiene:</strong> Túi vệ sinh & Xà bông rửa tay thiên nhiên.</li>
                        </ul>
                    </div>

                    <p className="modal-heading">🌿 Cam Kết Môi Trường</p>
                    <p>
                        Các bao bì sản phẩm được làm từ <strong>giấy Kraft tự phân hủy</strong> và nhựa sinh học lúa mạch, 
                        góp phần giảm thiểu rác thải nhựa và bảo vệ môi trường xanh.
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