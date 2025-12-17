import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== ADMIN ===== */
import Admin from "./components/Admin/Home/Trangchu.jsx";
import ManageRoom from "./components/Admin/Manageroom/Quanlyphong.jsx";
import Bookingmanage from "./components/Admin/bookingmanage/bookingmanage.jsx";

/* ===== USER ===== */
import Home from "./components/User/Home/Home.jsx";
import Blog from "./components/User/Blogs/Blog.jsx";
import Contactus from "./components/User/Contactus/contact.jsx";
import Login from "./components/User/Login/login.jsx";
import Signin from "./components/User/Sign-in/Sign-in.jsx";
import Gallery from "./components/User/Gallerys/gallerys.jsx";
import ROOM from "./components/User/Rooms/rooms.jsx";
import ServicePage from "./components/User/Services/servicespage.jsx";

/* ===== MODAL CONTENT ===== */
import BedRoom from "./components/User/Blogs/information/bedroom/bedroom.jsx";
import Restaurant from "./components/User/Blogs/information/Restaurant/restaurant.jsx";
import HotelLobby from "./components/User/Blogs/information/HotelLobby/hotellobby.jsx";
import Services from "./components/User/Blogs/information/Service/service.jsx";
import Event from "./components/User/Blogs/information/Event/event.jsx";
import History from "./components/User/Blogs/information/History/History.jsx";
import Breakfast from "./components/User/Blogs/information/Breakfast/Breakfast.jsx";
import AirportPickup from "./components/User/Blogs/information/Airport pickup/Airport_pickup.jsx";
import ExtraBed from "./components/User/Blogs/information/ExtraBed/ExtraBed.jsx";
import SwimmingPool from "./components/User/Blogs/information/Swimming Pool/SwimmingPool.jsx";
import Massage from "./components/User/Blogs/information/Massage/Massage.jsx";
import Amenities from "./components/User/Blogs/information/Amenities/Amenities.jsx";

function App() {
  /* ===== MODAL STATE ===== */
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

  /* ===== ROOMS STATE (LẤY TỪ BACKEND) ===== */
  const [rooms, setRooms] = useState([]);

  /* ===== LOAD ROOMS FROM SPRING BOOT ===== */
  const loadRooms = async () => {
    try {
      const res = await fetch("http://localhost:9192/rooms/all-rooms");
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error("Lỗi load rooms:", error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ===== USER ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blog openModal={openModal} />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/gallerys" element={<Gallery />} />

        {/* USER XEM PHÒNG */}
        <Route path="/rooms" element={<ROOM rooms={rooms} />} />

        {/* ===== AUTH ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signin />} />

        {/* ===== ADMIN ===== */}
        <Route path="/trangchu" element={<Admin />} />
        <Route
          path="/managerooms"
          element={
            <ManageRoom
              rooms={rooms}
              setRooms={setRooms}
              reloadRooms={loadRooms}
            />
          }
        />
        <Route path="/Bookingroom" element={<Bookingmanage />} />
        <Route path="/services" element={<ServicePage />} />
      </Routes>

      {/* ===== MODALS ===== */}
      {modalContent?.type === "BedRoom" && (
        <BedRoom isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}

      {modalContent?.type === "Restaurant" && (
        <Restaurant isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}

      {modalContent?.type === "HotelLobby" && (
        <HotelLobby isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}

      {modalContent?.type === "Services" && (
        <Services isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}

      {modalContent?.type === "Events" && (
        <Event isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}

      {modalContent?.type === "History" && (
        <History isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}
      {modalContent?.type === "Breakfast" && (
        <Breakfast isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}
      {modalContent?.type === "AirportPickup" && (
        <AirportPickup isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}
      {modalContent?.type === "ExtraBed" && (
        <ExtraBed isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}
      {modalContent?.type === "SwimmingPool" && (
        <SwimmingPool isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}
      {modalContent?.type === "Massage" && (
        <Massage isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}
      {modalContent?.type === "Amenities" && (
        <Amenities isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      )}
    </BrowserRouter>
  );
}

export default App;