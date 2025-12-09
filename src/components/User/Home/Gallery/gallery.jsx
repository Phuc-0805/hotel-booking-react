import "./gallery.css";
import React from 'react';
// Import các hình ảnh dưới dạng biến
import img1 from "../../../../assets/tongquan.jpg";
import img2 from "../../../../assets/Copy-of-Deluxe-Twins.jpg";
import img3 from "../../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg";
import img4 from "../../../../assets/khachsan.jpg";
import img5 from "../../../../assets/Copy-of-Deluxe-Twins.jpg";
import img6 from "../../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg";
import img7 from "../../../../assets/phong1.jpg";
import img8 from "../../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg";
const Gallery = () => {
    // Dữ liệu mẫu cho các hình ảnh
    // LƯU Ý QUAN TRỌNG: Sử dụng các biến đã import (img1, img2,...) 
    // chứ không phải chuỗi (string) "img1".
    const galleryImages = [
        { id: 1, src: img1, alt: "Phòng khách/khu vực sinh hoạt" },
        { id: 2, src: img2, alt: "Phòng ngủ giường đỏ" },
        { id: 3, src: img3, alt: "Phòng ngủ view thành phố" },
        { id: 4, src: img4, alt: "Phòng ngủ giường đôi" },
        { id: 5, src: img5, alt: "Phòng ngủ ánh sáng tím" },
        { id: 6, src: img6, alt: "Phòng ngủ giường trắng đen" },
        { id: 7, src: img7, alt: "Sảnh khách sạn" },
        { id: 8, src: img8, alt: "Phòng ngủ giường trắng đen" }
    ];

    return (
        <section id="gallery-section">
            <div className="gallery-header">
                <h2>GALLERY</h2>
            </div>

            <div className="gallery-container">
                {galleryImages.map(image => (
                    <div key={image.id} className="gallery-item">
                        <img 
                            // Sửa lỗi: Sử dụng cú pháp {image.src} để truyền 
                            // giá trị biến URL đã import.
                            src={image.src} 
                            alt={image.alt} 
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;