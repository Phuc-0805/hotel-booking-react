import React from 'react';
import './contact.css'; 

import Header from '../Header/header.jsx';
import Footer from '../footer/footer.jsx';

// Thêm { auth, onLogout } vào tham số của component
const ContactUs2 = ({ auth, onLogout }) => {
  return (
    <>
      {/* 1. Header: Truyền props auth và onLogout để Header cập nhật giao diện ngay lập tức */}
      <Header auth={auth} onLogout={onLogout} />

      {/* 2. Phần thân trang Contact (Banner + Form + Map) */}
      <div className="contact2-wrapper">
        
        {/* Banner Đen Tiêu đề */}
        <div className="contact2-banner">
          <div className="contact2-container">
            <h2>CONTACT US</h2>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="contact2-container">
          <div className="contact2-content">
            
            {/* Cột Trái: Form */}
            <div className="contact2-col">
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Name" className="contact2-input" />
                <input type="email" placeholder="Email" className="contact2-input" />
                <input type="text" placeholder="Phone Number" className="contact2-input" />
                <textarea 
                  rows="5" 
                  placeholder="Message" 
                  className="contact2-input"
                  style={{ resize: 'vertical' }}
                ></textarea>
                
                <button type="submit" className="contact2-btn-submit">
                  SEND
                </button>
              </form>
            </div>

            {/* Cột Phải: Map */}
            <div className="contact2-col">
              <iframe 
                className="contact2-map-frame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9244039367466!2d105.816454175314!3d21.035710580615175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0d127a01e7%3A0xab0696e310ad582a!2zTMOqIEjhu5NuZyBQaG9uZywgQmEgxJDDrG5oLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000" 
                allowFullScreen="" 
                loading="lazy"
                title="Google Map"
                style={{ border: 0 }}
              ></iframe>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Footer (Chân trang) */}
      <Footer />
    </>
  );
};

export default ContactUs2;