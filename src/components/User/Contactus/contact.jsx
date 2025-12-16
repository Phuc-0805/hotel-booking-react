import React from 'react';
import './contact.css'; // Giả sử file CSS mới đổi tên là ContactUs2.css

import Header from '../Header/header.jsx';
import Footer from '../footer/footer.jsx';

const ContactUs2 = () => {
  return (
    <>
      {/* 1. Header (Menu) */}
      <Header />

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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2s!4v1625000000000!5m2!1sen!2s" 
                allowFullScreen="" 
                loading="lazy"
                title="Google Map"
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
