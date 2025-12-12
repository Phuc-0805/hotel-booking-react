import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin/Home/Trangchu.jsx";
import ManageRoom from "./components/Admin/Manageroom/Quanlyphong.jsx"
import Login from "./components/User/auth/Login.jsx";
import Register from "./components/User/auth/Register.jsx";
import img1 from "./assets/phong1.jpg"
import img2 from "./assets/phong2.jpg"

import Home from "./components/User/Home/Home.jsx";
import Blog from "./components/User/Blogs/Blog.jsx";
import Contactus from "./components/User/Contactus/contact.jsx";

import BedRoom from "./components/User/Blogs/information/bedroom/bedroom.jsx";
import Restaurant from "./components/User/Blogs/information/Restaurant/restaurant.jsx";
import HotelLobby from "./components/User/Blogs/information/HotelLobby/hotellobby.jsx";
import Services from "./components/User/Blogs/information/Service/service.jsx";
import Event from "./components/User/Blogs/information/Event/event.jsx";
import History from "./components/User/Blogs/information/History/History.jsx";

import Gallery from "./components/User/Gallerys/gallerys.jsx";
import ROOM from "./components/User/Rooms/rooms.jsx"; // RoomList user

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (data) => {
    setModalContent(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // ------ STATE DÙNG CHUNG CHO ADMIN + USER ------
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Phòng Đơn",
      price: 500000,
      type: "Single",
      image: img1,
    },
    {
      id: 2,
      name: "Phòng Đôi",
      price: 800000,
      type: "Double",
      image: img2,
    },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 

        <Route path="/blogs" element={<Blog openModal={openModal} />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/gallerys" element={<Gallery />} />

        {/* TRANG HIỂN THỊ DANH SÁCH PHÒNG CHO USER */}
        <Route path="/rooms" element={<ROOM rooms={rooms} />} />

        {/* Admin: quản lý phòng */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trangchu" element={<Admin/>} />
        <Route path="/managerooms" element={<ManageRoom rooms={rooms} setRooms={setRooms}/>}/>
      </Routes>

      {/* ---- MODAL SWITCH ---- */}
      {modalContent?.type === "BedRoom" && (
        <BedRoom
          isOpen={isModalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      )}

      {modalContent?.type === "Restaurant" && (
        <Restaurant
          isOpen={isModalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      )}

      {modalContent?.type === "HotelLobby" && (
        <HotelLobby
          isOpen={isModalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      )}

      {modalContent?.type === "Services" && (
        <Services
          isOpen={isModalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      )}

      {modalContent?.type === "Events" && (
        <Event
          isOpen={isModalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      )}

      {modalContent?.type === "History" && (
        <History
          isOpen={isModalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
