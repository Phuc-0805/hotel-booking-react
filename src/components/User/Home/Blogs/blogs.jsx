import "./blogs.css";
import React from 'react';
// Nếu bạn đã đặt CSS trong file riêng (ví dụ: Blogs.css), hãy import nó ở đây:
// import '../styles/Blogs.css'; 
import img1 from "../../../../assets/Noithat.jpg"; 
import img2 from "../../../../assets/LE-GRENIER_13490-1.jpg";
import img3 from "../../../../assets/khachsan.jpg";
const Blogs = () => {
    // Dữ liệu mẫu cho các thẻ blog
    const blogPosts = [
        { 
            id: 1, 
            imageSrc: img1, // Thay bằng đường dẫn ảnh thật
            title: "Phòng Nghỉ", 
            subtitle: "Trải Nghiệm đẳng cấp", 
            description: "Nội thất hiện đại, sang trọng, tiện nghi, chất lượng. Luôn đem lại cho bạn trải nghiệm tốt nhất."
        },
        { 
            id: 2, 
            imageSrc: img2, // Thay bằng đường dẫn ảnh thật
            title: "Nhà Hàng", 
            subtitle: "Ẩm thực tinh tế", 
            description: "Nhà hàng với đa dạng món ăn từ Á đến Âu, phục vụ bởi đội ngũ đầu bếp chuyên nghiệp." 
        },
        { 
            id: 3, 
            imageSrc: img3, // Thay bằng đường dẫn ảnh thật
            title: "Sảnh Đường", 
            subtitle: "Sảnh đón khách sang trọng", 
            description: "Sảnh khách sạn rộng rãi, thiết kế tinh tế,không khí ấm cúng, tạo ấn tượng đầu tiên khó quên cho khách hàng." 
        },
    ];

    return (
        <section id="blogs-section">
            
            <div className="blogs-header">
                <h2>BLOG</h2>
                {/* Phụ đề màu xanh lam */}
                <p>Lorem ipsum available, but the majority have suffered</p>
            </div>

            <div className="blogs-container">
                {blogPosts.map(post => (
                    <div key={post.id} className="blog-card">
                        
                        {/* Khu vực Hình ảnh */}
                        <div className="blog-image">
                            <img 
                                src={post.imageSrc} 
                                alt={post.title} 
                            />
                        </div>
                        
                        {/* Khu vực Nội dung */}
                        <div className="blog-content">
                            <h3>{post.title}</h3>
                            <p className="subtitle">{post.subtitle}</p>
                            <p className="description">{post.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blogs;