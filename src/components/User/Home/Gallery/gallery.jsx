import React from 'react';
import "./gallery.css";


import img1 from '../../../../assets/gallery1.jpg';
import img2 from '../../../../assets/gallery2.jpg';
import img3 from '../../../../assets/gallery3.jpg';
import img4 from '../../../../assets/gallery4.jpg';
import img5 from '../../../../assets/gallery5.jpg';
import img6 from '../../../../assets/gallery6.jpg';
import img7 from '../../../../assets/gallery7.jpg';
import img8 from '../../../../assets/gallery8.jpg';

const Gallery = () => {

    const galleryImages = [
        { id: 1, src: img1, alt: "Toàn cảnh khách sạn" },
        { id: 2, src: img2, alt: "Phòng Deluxe Twins" },
        { id: 3, src: img3, alt: "Nhà hàng Bistro" },
        { id: 4, src: img4, alt: "Mặt tiền khách sạn" },
        { id: 5, src: img5, alt: "Phòng ngủ cao cấp" },
        { id: 6, src: img6, alt: "Hồ bơi thư giãn" },
        { id: 7, src: img7, alt: "Sảnh đón khách" },
        { id: 8, src: img8, alt: "Không gian ẩm thực" }
    ];

    return (
        <section id="gallery-section">
            <div className="gallery-banner"> {/* Đổi class này để ăn theo CSS banner đen */}
                <div className="gallery-container">
                    <h2>GALLERY</h2>
                </div>
            </div>

            <div className="gallery-container">
                <div className="gallery-grid">
                    {galleryImages.map(image => (
                        <div key={image.id} className="gallery-item">
                            <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="gallery-img"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;