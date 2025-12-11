import React from "react";
import { NavLink } from "react-router-dom";
import "./Homebar.css"; // chứa các rule sidebar ở trên
import "../Trangchu.css"; // chứa các rule layout ở dưới
export default function Homebar() {
  return (
    <aside className="headerbar">
      <div className="headerbar-container">
        <div className="header-dashboard-container">
           <h2 style={{margin:0}}>Dashboard</h2>
        </div>

        <nav className="headerbar-mucluc">
          <NavLink to="/trangchu" className="header-item">Trang chủ</NavLink>
          <NavLink to="/managerooms" className="header-item">Quản lý phòng</NavLink>
          <NavLink to="/Bookingrooom" className="header-item">Quản lý đặt phòng</NavLink>
          <NavLink to="/customers" className="header-item">Quản lý khách hàng</NavLink>
          <NavLink to="/contactus" className="header-item">Cài đặt</NavLink>
        </nav>
      </div>
    </aside>
  );
}
