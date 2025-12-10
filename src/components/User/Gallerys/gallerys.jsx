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

const Gallery2 = () => {
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
        <div className="gallery2-banner">
          <div className="gallery2-container">
            <h2>GALLERY</h2>
          </div>
        </div>

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
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Gallery2;
