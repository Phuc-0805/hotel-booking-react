import React from "react";
import Head from "../Head/Homebar.jsx";
import "../Trangchu.css"; // chứa rules layout + welcome-section
import "../Head/Homebar.jsx"; // chứa các rule sidebar ở trên
import "./welcome.css"
export default function Trangchu() {
  return (
    <div className="admin-layout">
      <Head />
      <div className="page-content">
        <div className="welcome-section">
          <h1>Admin Dashboard</h1>
          <p>Manage your hotel efficiently and effectively.</p>
        </div>
        {/* phần nội dung khác... */}
      </div>
    </div>
  );
}
