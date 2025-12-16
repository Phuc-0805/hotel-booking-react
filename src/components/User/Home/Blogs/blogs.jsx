import "./blogs.css";
import React from 'react';
// Nếu bạn đã đặt CSS trong file riêng (ví dụ: Blogs.css), hãy import nó ở đây:
// import '../styles/Blogs.css'; 
import img1 from "../../../../assets/Noithat.jpg"; 
import img2 from "../../../../assets/LE-GRENIER_13490-1.jpg";
import img3 from "../../../../assets/khachsan.jpg";
import img4 from "../../../../assets/message.jpg.webp";
import img5 from "../../../../assets/event.jpg";
import img6 from "../../../../assets/History.png";
import img7 from "../../../../assets/breakfast.png";
import img8 from "../../../../assets/airportpickup.jpg";
import img9 from "../../../../assets/extrabed.jpg";
import img10 from "../../../../assets/swimmingpool.jpg";
import img11 from "../../../../assets/massage.jpg";
import img12 from "../../../../assets/Amenities.jpg";
const Blogs = () => {
    // Dữ liệu mẫu cho các thẻ blog
    const blogPosts = [
        { 
            id: 1, 
            imageSrc: img1, // Thay bằng đường dẫn ảnh thật
            title: "Bed Room", 
            subtitle: "Trải Nghiệm đẳng cấp", 
            description: "Nội thất hiện đại, sang trọng, tiện nghi, chất lượng. Luôn đem lại cho bạn trải nghiệm tốt nhất."
        },
        { 
            id: 2, 
            imageSrc: img2, // Thay bằng đường dẫn ảnh thật
            title: "Restaurant", 
            subtitle: "Ẩm thực tinh tế", 
            description: "Nhà hàng với đa dạng món ăn từ Á đến Âu, phục vụ bởi đội ngũ đầu bếp chuyên nghiệp." 
        },
        { 
            id: 3, 
            imageSrc: img3, // Thay bằng đường dẫn ảnh thật
            title: "Hotel Lobby", 
            subtitle: "Sảnh đón khách sang trọng", 
            description: "Sảnh khách sạn rộng rãi, thiết kế tinh tế,không khí ấm cúng, tạo ấn tượng đầu tiên khó quên cho khách hàng." 
        },
        {
            id: 4,
            imageSrc: img4, // Thay bằng đường dẫn ảnh thật
            title: "Services",
            subtitle: "Dịch vụ hoàn hảo",
            description: "Dịch vụ chuyên nghiệp, đầy đủ, tiện nghi, tận tâm, luôn sẵn sàng hỗ trợ khách hàng 24/7."
        },
        {
            id: 5,
            imageSrc: img5, // Thay bằng đường dẫn ảnh thật
            title: "Events",
            subtitle: "Sự kiện đặc sắc",
            description: "Tổ chức sự kiện độc đáo, sáng tạo, sôi động, mang đến trải nghiệm khó quên cho khách hàng."
        },
        {
            id: 6,
            imageSrc: img6, // Thay bằng đường dẫn ảnh thật
            title: "History",
            subtitle: "Truyền thống lâu đời",
            description: "Khách sạn với lịch sử phát triển lâu đời, mang đậm giá trị văn hóa và truyền thống."
        },
        {
            id: 7,
            imageSrc: img7, // Thay bằng đường dẫn ảnh thật
            title: "Breakfast",
            subtitle: "Bữa sáng hoàn hảo",
            description: "Bữa sáng đa dạng, tươi ngon, phục vụ từ 6h đến 10h hàng ngày."
        },
        {
            id: 8,
            imageSrc: img8, // Thay bằng đường dẫn ảnh thật
            title: "Airport Pickup",
            subtitle: "Đón tiễn sân bay",
            description: "Dịch vụ đón tiễn sân bay chuyên nghiệp, tiện lợi, an toàn."
        },
        {
            id: 9,
            imageSrc: img9, // Thay bằng đường dẫn ảnh thật
            title: "Extra Bed",
            subtitle: "Giường phụ tiện nghi",
            description: "Dịch vụ giường phụ chất lượng cao, đảm bảo sự thoải mái cho khách hàng."
        },
        {
            id: 10,
            imageSrc: img10, // Thay bằng đường dẫn ảnh thật
            title: "Swimming Pool",
            subtitle: "Hồ bơi đẳng cấp",
            description: "Hồ bơi vô cực với tầm nhìn tuyệt đẹp, mang đến trải nghiệm thư giãn tuyệt vời."
        },
        {
            id: 11,
            imageSrc: img11, // Thay bằng đường dẫn ảnh thật
            title: "Massage",
            subtitle: "Dịch vụ massage chuyên nghiệp",
            description: "Dịch vụ massage thư giãn, phục hồi sức khỏe, mang lại cảm giác sảng khoái."
        },
        {
            id: 12,
            imageSrc: img12, // Thay bằng đường dẫn ảnh thật
            title: "Amenities",
            subtitle: "Bộ tiện ích cá nhân cao cấp",
            description: "Bộ đồ dùng cá nhân tiêu chuẩn 5 sao, đảm bảo sự tiện lợi tuyệt đối cho quý khách."
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