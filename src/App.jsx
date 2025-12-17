import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, logout as doLogout, isAuthenticated } from "./utils/auth";

/* ===== ADMIN ===== */
import Admin from "./components/Admin/Home/Trangchu.jsx";
import ManageRoom from "./components/Admin/Manageroom/Quanlyphong.jsx";
import Bookingmanage from "./components/Admin/bookingmanage/bookingmanage.jsx";
import AdminRoute from "./components/Auth/AdminRoute";
import UserManage from "./components/Admin/UserManager/Usermanager.jsx"

/* ===== USER ===== */
import Home from "./components/User/Home/Home.jsx";
import Blog from "./components/User/Blogs/Blog.jsx";
import Contactus from "./components/User/Contactus/contact.jsx";
import Login from "./components/User/Login/login.jsx";
import Signin from "./components/User/Sign-in/Sign-in.jsx";
import Gallery from "./components/User/Gallerys/gallerys.jsx";
import Rooms from "./components/User/Rooms/rooms.jsx";
import ServicePage from "./components/User/Services/services.jsx";

/* ===== MODAL CONTENT ===== */
import BedRoom from "./components/User/Blogs/information/bedroom/bedroom.jsx";
import Restaurant from "./components/User/Blogs/information/Restaurant/restaurant.jsx";
import HotelLobby from "./components/User/Blogs/information/HotelLobby/hotellobby.jsx";
import Services from "./components/User/Blogs/information/Service/service.jsx";
import Event from "./components/User/Blogs/information/Event/event.jsx";
import History from "./components/User/Blogs/information/History/History.jsx";

function App() {
  /* ===== AUTH STATE TOÀN APP ===== */
  const [auth, setAuth] = useState(() => {
    return getAuth();
  });

  const handleLogout = () => {
    doLogout();
    setAuth(null);
  };

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
        <Route path="/" element={<Home auth={auth} onLogout={handleLogout} />} />
        <Route path="/blogs" element={<Blog openModal={openModal} />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/gallerys" element={<Gallery />} />
        <Route path="/services" element={<ServicePage/>}/>

        {/* ===== USER XEM PHÒNG ===== */}
        <Route
          path="/rooms"
          element={<Rooms rooms={rooms} userEmail={auth?.email} setAuth={setAuth} />}
        />

        {/* ===== AUTH ===== */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <Login setAuth={setAuth} />}
        />
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <Signin />}
        />

        {/* ===== ADMIN ===== */}
        <Route
          path="/trangchu"
          element={
            <AdminRoute auth={auth}>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/managerooms"
          element={
            <AdminRoute auth={auth}>
              <ManageRoom rooms={rooms} setRooms={setRooms} reloadRooms={loadRooms} />
            </AdminRoute>
          }
        />
        <Route
          path="/Bookingroom"
          element={
            <AdminRoute auth={auth}>
              <Bookingmanage />
            </AdminRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <AdminRoute auth={auth}>
              <UserManage />
            </AdminRoute>
          }
        />
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
    </BrowserRouter>
  );
}

export default App;
