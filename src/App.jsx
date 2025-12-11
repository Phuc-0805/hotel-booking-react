import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/User/Home/Home.jsx";
import Blog from "./components/User/Blogs/Blog.jsx";
import Contactus from "./components/User/Contactus/contact.jsx";

import BedRoom from "./components/User/Blogs/information/bedroom/bedroom.jsx";
import Restaurant from "./components/User/Blogs/information/Restaurant/restaurant.jsx";
import HotelLobby from "./components/User/Blogs/information/HotelLobby/hotellobby.jsx";
import Services from "./components/User/Blogs/information/Service/service.jsx"
import Event from "./components/User/Blogs/information/Event/event.jsx";
import History from "./components/User/Blogs/information/History/History.jsx"

import Gallery from "./components/User/Gallerys/gallerys.jsx";
import ROOM from "./components/User/Rooms/rooms.jsx";
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





  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route 
          path="/blogs" 
          element={<Blog openModal={openModal} />} 
        />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/gallerys" element={<Gallery />} />
        <Route path="/rooms" element={<ROOM />} />
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
      {modalContent?.type ==="Services"&&(
        <Services
          isOpen={isModalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      )}
      {modalContent?.type ==="Events"&&(
        <Event
          isOpen={isModalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      )}
      {modalContent?.type ==="History"&&(
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