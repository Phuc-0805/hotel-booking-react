// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/User/Home/Home.jsx"; 
import Blog from "./components/User/Blogs/Blog.jsx"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* BẮT BUỘC: Hiển thị Home khi URL là "/" */}
        <Route path="/" element={<Home />} />
        
        {/* BẮT BUỘC: Hiển thị Blog khi URL là "/blogs" */}
        <Route path="/blogs" element={<Blog />} />
        
        {/* Các Route cho Services, Gallery, Booking, v.v. cần được thêm nếu muốn các liên kết đó hoạt động */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;