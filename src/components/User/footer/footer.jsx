// File: footer.jsx (Đã sử dụng React Router)

import React from "react";
// 1. IMPORT Link component TỪ REACT-ROUTER-DOM
import { Link } from "react-router-dom"; 
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa"; 
import "./footer.css";

const Footer = () => {

    // Không cần hàm handleNavigation() nếu dùng <Link>

    const contactItems = [
        { Icon: FaMapMarkerAlt, text: "Address" },
        { Icon: FaPhone, text: "+01 1234569540" },
        { Icon: FaEnvelope, text: "demo@gmail.com" },
    ];

    const menuLinks = [
        // SỬ DỤNG ĐƯỜNG DẪN BẮT ĐẦU BẰNG / (ví dụ: /home) thay vì # (ví dụ: #home)
        // nếu bạn đang điều hướng giữa các trang/route chính
        { name: "Home", href: "../Home/Home.jsx" },
        { name: "Service", href: "../Services/service.jsx" },
        { name: "Rooms", href: "../Rooms/.gitkeep" },
        { name: "Gallery", href: "../Gallerys/.gitkeep" },
        { name: "Blog", href: "../Blog/Blog.jsx" },
        { name: "Contact Us", href: "../Contactus/.gitkeep" },
        { name: "Login", href: "../Login/.gitkeep" }
    ];

    const socialIcons = [
        // Các icon mạng xã hội vẫn nên dùng thẻ <a> để liên kết ngoài
        { Icon: FaFacebookF, href: "https://facebook.com" }, 
        { Icon: FaTwitter, href: "https://twitter.com" },
        { Icon: FaLinkedinIn, href: "https://linkedin.com" },
        { Icon: FaYoutube, href: "https://youtube.com" },
    ];

    return (
        <section className="footer-section">
            <div className="footer-container">
                
                {/* CỘT 1: Contact US */}
                <div className="contact-column">
                    <h3>Contact US</h3>
                    {contactItems.map((item, index) => (
                        <div key={index} className="contact-item">
                            <item.Icon className="contact-icon" /> 
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* CỘT 2: Menu Link (ĐÃ SỬ DỤNG <Link>) */}
                <div className="menu-column">
                    <h3>Menu Link</h3>
                    <ul>
                        {menuLinks.map((link, index) => (
                            <li key={index}>
                                {/* THAY THẾ DIV BẰNG <Link> */}
                                <Link 
                                    to={link.href} // Thuộc tính "to" chỉ định đường dẫn
                                    className="menu-link-item" // Giữ nguyên class để tạo kiểu dáng
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CỘT 3: News letter */}
                <div className="newsletter-column">
                    <h3>News letter</h3>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <button>SUBSCRIBE</button>
                    </div>

                    <div className="social-icons">
                        {socialIcons.map((icon, index) => (
                            <a 
                                key={index} 
                                href={icon.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <icon.Icon className="social-icon" />
                            </a>
                        ))}
                    </div>
                </div>

            </div>
            <div className="footer-bottom-bar"></div> 
        </section>
    );
};

export default Footer;