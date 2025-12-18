import React, { useEffect } from 'react';
import Header from '../Header/header.jsx';
import Footer from '../footer/footer';
import './services.css';

// Import hình ảnh từ assets
import poolImg from '../../../assets/infinitypool.jpg';
import massageImg from '../../../assets/massage.jpg';
import restaurantImg from '../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg';
import kidimg from '../../../assets/kids.jpg';
import gymImg from '../../../assets/gym.jpg';
import waterParkImg from '../../../assets/congviennuoc.jpg'; 
import santhethao from '../../../assets/santhethao.jpg';
import barimg from '../../../assets/bar.jpg';

// Nhận props auth và onLogout để đồng bộ trạng thái đăng nhập
const ServicePage = ({ auth, onLogout }) => {
  
  // Motion: Scroll lên đầu trang khi load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Nhóm 1: Khu Vực Giải Trí & Thư Giãn
  const relaxServices = [
    {
      id: 1,
      title: "Hồ Bơi Vô Cực",
      desc: "Trải nghiệm bơi lội với tầm nhìn bao quát.",
      img: poolImg
    },
    {
      id: 2,
      title: "Công Viên Nước Mini",
      desc: "Khu vực vui chơi an toàn và sôi động dành cho trẻ em.",
      img: waterParkImg
    },
    {
      id: 3,
      title: "Oasis Spa & Massage",
      desc: "Đắm mình trong không gian thư giãn tuyệt đối với các liệu pháp massage độc quyền giúp phục hồi sức khỏe.",
      img: massageImg
    },
    {
      id: 4,
      title: "Phòng Gym 24/7",
      desc: "Trang bị hiện đại, giúp duy trì thói quen tập luyện.",
      img: gymImg
    }
  ];

  // Nhóm 2: Dịch Vụ Giải Trí & Trải Nghiệm
  const experienceServices = [
    {
      id: 5,
      title: "Kids' Club",
      desc: "Các hoạt động sáng tạo, lớp học thủ công và trò chơi có giám sát chuyên nghiệp.",
      img: kidimg
    },
    {
      id: 6,
      title: "Phòng Karaoke & Bar",
      desc: "Đêm sôi động với âm nhạc, đồ uống hảo hạng, hoàn hảo cho việc giao lưu.",
      img: barimg
    },
    {
      id: 7,
      title: "Sân Thể Thao Đa Năng",
      desc: "Phục vụ các hoạt động như Tennis, bóng chuyền bãi biển hoặc Yoga buổi sáng.",
      img: santhethao
    }
  ];

  const renderServiceGrid = (list) => (
    <div className="grid-container">
      {list.map((item, index) => (
        <div key={item.id} className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="card-image-box">
            <img src={item.img} alt={item.title} />
          </div>
          <div className="card-content">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="services-page-wrapper">
      {/* TRUYỀN PROPS VÀO ĐÂY ĐỂ HEADER CẬP NHẬT NGAY LẬP TỨC */}
      <Header auth={auth} onLogout={onLogout} />

      <div className="services-banner">
        <div className="services-container-banner">
          <h2>SERVICES</h2>
        </div>
      </div>

      <main className="services-container">

        {/* Section 1: Thư Giãn */}
        <section className="services-section">
          <div className="section-header">
            <h2>💧 Khu Vực Giải Trí & Thư Giãn</h2>
            <div className="section-line"></div>
          </div>
          {renderServiceGrid(relaxServices)}
        </section>

        {/* Section 2: Trải Nghiệm */}
        <section className="services-section">
          <div className="section-header">
            <h2>🎯 Dịch Vụ Giải Trí & Trải Nghiệm</h2>
            <div className="section-line"></div>
          </div>
          {renderServiceGrid(experienceServices)}
        </section>

        {/* Closing Section */}
        <section className="services-closing">
          <p>Chúng tôi cam kết biến mọi khoảnh khắc tại đây thành những kỷ niệm đáng nhớ.</p>
          <h3>Đừng bỏ lỡ cơ hội khám phá trọn vẹn khu nghỉ dưỡng của chúng tôi!</h3>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;