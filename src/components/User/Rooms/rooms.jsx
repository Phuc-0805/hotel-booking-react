import React from 'react';
import './rooms.css'; // đổi tên file CSS mới

const RoomList = () => {
  // Dữ liệu mẫu các loại phòng
  const rooms = [
    {
      id: 1,
      name: 'Phòng Đơn (Single Room)',
      type: 'Standard',
      price: 500000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop',
      features: ['1 Giường đơn', 'Wifi miễn phí', 'Bữa sáng', 'Diện tích 25m2'],
      description: 'Phòng nhỏ gọn, ấm cúng dành cho khách đi công tác hoặc du lịch một mình.'
    },
    {
      id: 2,
      name: 'Phòng Đôi (Double Room)',
      type: 'Superior',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop',
      features: ['1 Giường đôi lớn', 'View thành phố', 'Bồn tắm', 'Diện tích 35m2'],
      description: 'Không gian rộng rãi, thoáng đãng, phù hợp cho các cặp đôi.'
    },
    {
      id: 3,
      name: 'Phòng Gia Đình (Family Suite)',
      type: 'Deluxe',
      price: 1500000,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop',
      features: ['2 Giường đôi', 'Phòng khách riêng', 'Bếp nhỏ', 'Diện tích 60m2'],
      description: 'Lựa chọn hoàn hảo cho gia đình 4 người với đầy đủ tiện nghi như ở nhà.'
    },
    {
      id: 4,
      name: 'Phòng Tổng Thống (Presidential Suite)',
      type: 'Luxury',
      price: 5000000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop',
      features: ['Toàn cảnh 360 độ', 'Jacuzzi riêng', 'Phục vụ 24/7', 'Diện tích 120m2'],
      description: 'Đẳng cấp sang trọng bậc nhất, trải nghiệm thượng lưu không thể nào quên.'
    }
  ];

  // Hàm xử lý định dạng tiền tệ VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="room2-page-wrapper">
      <div className="room2-container">
        <h2 className="room2-section-title">Danh Sách Phòng Nghỉ</h2>
        <div className="room2-list">
          {rooms.map((room) => (
            <div key={room.id} className="room2-card">
              {/* Phần Ảnh */}
              <div className="room2-img-col">
                <img src={room.image} alt={room.name} />
                <span className="room2-badge">{room.type}</span>
              </div>

              {/* Phần Thông tin */}
              <div className="room2-info-col">
                <h3>{room.name}</h3>
                <p className="room2-desc">{room.description}</p>
                <ul className="room2-features">
                  {room.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>

              {/* Phần Giá và Nút đặt */}
              <div className="room2-action-col">
                <div className="room2-price-box">
                  <span className="room2-price">{formatCurrency(room.price)}</span>
                  <span className="room2-unit">/ đêm</span>
                </div>
                <button
                  className="room2-btn-book"
                  onClick={() => alert(`Bạn đã chọn đặt ${room.name}`)}
                >
                  Đặt Phòng Ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomList;
