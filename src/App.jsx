import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/User/Home/Home.jsx";
import Blog from "./components/User/Blogs/Blog.jsx";

import BedRoom from "./components/User/Blogs/information/bedroom/bedroom.jsx";
import Restaurant from "./components/User/Blogs/information/Restaurant/restaurant.jsx";

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
    </BrowserRouter>
  );
}

export default App;
