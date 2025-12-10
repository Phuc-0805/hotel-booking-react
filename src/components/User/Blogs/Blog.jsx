import Header from "../Header/header.jsx";
import "./Blog.css"; // Đã sửa tên file CSS thành "Blog.css" để đồng bộ với Blog.jsx
import React from 'react'; // Cần import React để dùng JSX
import img1 from "../../../assets/Noithat.jpg"; 
import img2 from "../../../assets/LE-GRENIER_13490-1.jpg";
import img3 from "../../../assets/khachsan.jpg";

// Dữ liệu mẫu cho các thẻ blog (Đã đưa vào component)
const blogPosts = [
    { 
        id: 1, 
        imageSrc: img1,
        title: "Bed Room", 
        subtitle: "Trải Nghiệm đẳng cấp", 
        description: "Nội thất hiện đại, sang trọng, tiện nghi, chất lượng. Luôn đem lại cho bạn trải nghiệm tốt nhất."
    },
    { 
        id: 2, 
        imageSrc: img2, 
        title: "Restaurant", 
        subtitle: "Ẩm thực tinh tế", 
        description: "Nhà hàng với đa dạng món ăn từ Á đến Âu, phục vụ bởi đội ngũ đầu bếp chuyên nghiệp." 
    },
    { 
        id: 3, 
        imageSrc: img3, 
        title: "Hotel Lobby", 
        subtitle: "Sảnh đón khách sang trọng", 
        description: "Sảnh khách sạn rộng rãi, thiết kế tinh tế,không khí ấm cúng, tạo ấn tượng đầu tiên khó quên cho khách hàng." 
    },
];

export default function Blog() {
    return (
        <>
            <Header /> {/* Giữ lại component Header */}
            <div className="Blog-header"> 
                <h1>BLOG</h1>
            </div>
            {/* 💡 Sửa: Sử dụng id và class name đã thống nhất trong các bước trước */}
            <section id="Blogs-section">   
                {/* Thêm overlay nếu bạn muốn làm tối ảnh nền */}
                {/* Phần container chứa các card blog */}
                <div className="Blogs-container">
                    {blogPosts.map(post => (
                        <div key={post.id} className="Blog-card">
                            
                            <div className="Blog-image">
                                <img 
                                    src={post.imageSrc} 
                                    alt={post.title} 
                                />
                            </div>
                            
                            <div className="Blog-content">
                                <h3>{post.title}</h3>
                                <p className="subtitle">{post.subtitle}</p>
                                <p className="description">{post.description}</p>
                                
                                {/* Nút Xem Chi Tiết đã thêm ở bước trước */}
                                <a href={`/blog/${post.id}`} className="read-more-btn">
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
