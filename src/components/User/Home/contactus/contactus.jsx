// ContactUs.jsx
import "./contactus.css";
import React from 'react';
// Nếu bạn đã đặt CSS trong file riêng (ví dụ: Contact.css), hãy import nó ở đây:

const ContactUs = () => {

    // Dữ liệu mẫu cho thông tin liên hệ và vị trí
    const contactInfo = {
        name: "Eiffel Tower",
        address: "Av. Gustave Eiffel, 75007 Paris, France",
        rating: 4.7,
        reviews: "474,081 reviews",
        // Thay thế bằng URL nhúng Google Maps thực tế của bạn
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.992224151322!2d2.292209715783321!3d48.85825367928734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x87d165c71d87f71e!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1677840000000!5m2!1sen!2sfr"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic gửi form tại đây (ví dụ: API call)
        alert('Form submitted! (Chức năng gửi đang được phát triển)');
    };

    return (
        <section id="contact-section">
            <div className="contact-header">
                <h2>CONTACT US</h2>
            </div>
            
            <div className="contact-container">
                
                {/* Cột 1: Form Liên hệ (Đã giữ nguyên) */}
                <div className="contact-form-column">
                    <form onSubmit={handleSubmit}>
                        
                        {/* Tên */}
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Name" 
                                required 
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email" 
                                required 
                            />
                        </div>

                        {/* Số điện thoại */}
                        <div className="form-group">
                            <input 
                                type="tel" 
                                className="form-control" 
                                placeholder="Phone Number" 
                                required 
                            />
                        </div>

                        {/* Tin nhắn */}
                        <div className="form-group">
                            <textarea 
                                className="form-control" 
                                placeholder="Message" 
                                rows="5" 
                                required
                            ></textarea>
                        </div>

                        {/* Nút Gửi */}
                        <button type="submit" className="send-button">
                            SEND
                        </button>
                    </form>
                </div>
                
                {/* Cột 2: Google Map (ĐÃ CHỈNH SỬA CẤU TRÚC BÊN TRONG) */}
                <div className="contact-map-column">
                    
                    {/* KHỐI THÔNG TIN NỔI TRÊN MAP - Sử dụng lớp CSS mới */
                       /* Lưu ý: Nếu bạn muốn nó nổi trên iframe, bạn cần đảm bảo 
                          CSS cho .contact-map-column có position: relative 
                          và .map-info-block có position: absolute và z-index cao. */}
                    <div className="map-info-block">
                        <div className="map-text-content">
                            <h4>{contactInfo.name}</h4>
                            <p className="map-address">{contactInfo.address}</p>
                            
                            {/* Hàng chứa đánh giá và liên kết View larger map */}
                            <div className="map-rating-row">
                                <span className="map-rating-value">{contactInfo.rating} ⭐</span> 
                                <span className="map-reviews">{contactInfo.reviews}</span>
                                <a href="#" className="map-link larger-map-link">View larger map</a>
                            </div>

                            {/* Liên kết Directions (Đã tách ra để phù hợp với giao diện) */}
                            <a href="https://www.google.com/maps/dir/48.8601736,2.2953879/Eiffel+Tower+Av.+Gustave+Eiffel+75007+Paris+France/@48.8583701,2.2944813,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47e66e2964e34e2d:0x8ddca9ee380ef7e0!2m2!1d2.2944813!2d48.8583701?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D" className="map-link directions-link">Directions</a>
                        </div>
                    </div>
                    
                    {/* Iframe nhúng Google Map */}
                    <iframe
                        src={contactInfo.mapEmbedUrl}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Location"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;