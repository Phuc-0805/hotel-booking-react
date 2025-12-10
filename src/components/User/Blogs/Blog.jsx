import Header from "../Header/header.jsx";
import Footer from "../footer/footer.jsx";
import "./Blog.css";
import React from "react"; 

import img1 from "../../../assets/Noithat.jpg"; 
import img2 from "../../../assets/LE-GRENIER_13490-1.jpg";
import img3 from "../../../assets/khachsan.jpg";
import img4 from "../../../assets/message.jpg.webp";
import img5 from "../../../assets/event.jpg";
import img6 from "../../../assets/History.png";

export default function Blog({ openModal }) {

    const blogPosts = [
        { id: 1, imageSrc: img1, title: "Bed Room", subtitle: "Trải Nghiệm đẳng cấp", description: "Nội thất hiện đại, sang trọng, tiện nghi, chất lượng. Luôn đem lại cho bạn trải nghiệm tốt nhất." },
        { id: 2, imageSrc: img2, title: "Restaurant", subtitle: "Ẩm thực tinh tế", description: "Nhà hàng với đa dạng món ăn từ Á đến Âu, phục vụ bởi đội ngũ đầu bếp chuyên nghiệp." },
        { id: 3, imageSrc: img3, title: "Hotel Lobby", subtitle: "Sảnh đón khách sang trọng", description: "Sảnh khách sạn rộng rãi, thiết kế tinh tế, không khí ấm cúng, tạo ấn tượng đầu tiên khó quên cho khách hàng." },
        { id: 4, imageSrc: img4, title: "Services", subtitle: "Dịch vụ hoàn hảo", description: "Dịch vụ chuyên nghiệp, đầy đủ, tiện nghi, tận tâm, luôn sẵn sàng hỗ trợ khách hàng 24/7." },
        { id: 5, imageSrc: img5, title: "Events", subtitle: "Sự kiện đặc sắc", description: "Tổ chức sự kiện độc đáo, sáng tạo, sôi động, mang đến trải nghiệm khó quên cho khách hàng." },
        { id: 6, imageSrc: img6, title: "History", subtitle: "Truyền thống lâu đời", description: "Khách sạn với lịch sử phát triển lâu đời, mang đậm giá trị văn hóa và truyền thống." }
    ].map(post => ({
        ...post,
        type: post.title.replace(/\s+/g, "") // tạo type tự động, không dấu cách
    }));

    return (
        <>
            <Header />

            <div className="Blog-header"> 
                <h1>BLOG</h1> 
            </div>
                
            <section id="Blogs-section">
                <div className="Blogs-container">
                    {blogPosts.map(post => (
                        <div key={post.id} className="Blog-card">

                            <div className="Blog-image">
                                <img src={post.imageSrc} alt={post.title} />
                            </div>

                            <div className="Blog-content">
                                <h3>{post.title}</h3>
                                <p className="subtitle">{post.subtitle}</p>
                                <p className="description">{post.description}</p>

                                <button onClick={() => openModal(post)}>
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
