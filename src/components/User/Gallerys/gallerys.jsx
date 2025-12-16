import React from 'react';
import './gallerys.css'; 
import Header from '../Header/header'; 
import Footer from '../footer/footer';

import gallery1 from '../../../assets/gallery1.jpg';
import gallery2 from '../../../assets/gallery2.jpg';
import gallery3 from '../../../assets/gallery3.jpg';
import gallery4 from '../../../assets/gallery4.jpg';
import gallery5 from '../../../assets/gallery5.jpg';
import gallery6 from '../../../assets/gallery6.jpg';
import gallery7 from '../../../assets/gallery7.jpg';
import gallery8 from '../../../assets/gallery8.jpg';
<<<<<<< HEAD
const Gallery = () => {
  // Danh sách ảnh mẫu (bạn có thể thay link ảnh thật của bạn vào đây)
=======

const Gallery2 = () => {
>>>>>>> origin/main
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
  ];

  return (
    <>
      <Header />
<<<<<<< HEAD

      <div className="gallery-wrapper">
        
        {/* Banner Tiêu đề */}
        <div className="gallery-banner">
          <div className="gallery-container">
=======
        <div className="gallery2-banner">
          <div className="gallery2-container">
>>>>>>> origin/main
            <h2>GALLERY</h2>
          </div>
        </div>

<<<<<<< HEAD
        {/* Lưới ảnh */}
        <div className="gallery-container">
          <div className="gallery-grid">
            {images.map((imgSrc, index) => (
              <div key={index} className="gallery-item">
                <img src={imgSrc} alt={`Gallery Image ${index + 1}`} className="gallery-img" />
=======
      <div className="gallery2-wrapper">
        {/* Lưới ảnh */}
        <div className="gallery2-container">
          <div className="gallery2-grid">
            {images.map((imgSrc, index) => (
              <div key={index} className="gallery2-item">
                <img 
                  src={imgSrc} 
                  alt={`Gallery Image ${index + 1}`} 
                  className="gallery2-img" 
                />
>>>>>>> origin/main
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

<<<<<<< HEAD
export default Gallery;
=======
export default Gallery2;
>>>>>>> origin/main
