import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Homebar from "../Head/Homebar.jsx";
import { getAuth } from "../../../utils/auth";
import "../trangchu.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null); // Để lưu user đang được sửa
  const navigate = useNavigate();

  // Tách hàm load ra để gọi lại sau khi xóa hoặc sửa xong
  const loadCustomers = async () => {
    const auth = getAuth();
    const token = auth?.token;

    if (!token) {
      alert("Bạn cần đăng nhập admin");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:9192/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        alert("Không có quyền hoặc token hết hạn");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi load danh sách khách hàng");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [navigate]);

  // --- Chức năng Xóa ---
  const handleDelete = async (email) => {
    if (window.confirm(`Bạn có chắc muốn xóa khách hàng: ${email}?`)) {
      const token = getAuth()?.token;
      try {
        const res = await fetch(`http://localhost:9192/users/delete/${email}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          alert("Xóa thành công!");
          loadCustomers(); // Tải lại danh sách mới
        } else {
          alert("Lỗi khi xóa!");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // --- Chức năng Cập nhật (Sửa) ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = getAuth()?.token;
    try {
      const res = await fetch(`http://localhost:9192/users/update/${editingCustomer.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingCustomer),
      });

      if (res.ok) {
        alert("Cập nhật thành công!");
        setEditingCustomer(null); // Đóng form sửa
        loadCustomers(); // Tải lại danh sách
      } else {
        alert("Lỗi khi cập nhật!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-layout">
      <div className="headerbar">
        <Homebar />
      </div>

      <main className="page-content">
        <section className="QLP-section">
          <h1>Quản lý Khách hàng</h1>
          <p>Danh sách người dùng đăng ký trong hệ thống</p>
        </section>

        {/* Form Sửa (Chỉ hiện khi nhấn nút Sửa) */}
        {editingCustomer && (
          <div className="room-form">
            <h3>Sửa thông tin: {editingCustomer.email}</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editingCustomer.lastName || ""}
                onChange={(e) => setEditingCustomer({...editingCustomer, lastName: e.target.value})}
                placeholder="Họ"
              />
              <input
                type="text"
                value={editingCustomer.firstName || ""}
                onChange={(e) => setEditingCustomer({...editingCustomer, firstName: e.target.value})}
                placeholder="Tên"
              />
              <input
                type="text"
                value={editingCustomer.phone || ""}
                onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                placeholder="Số điện thoại"
              />
              <div className="formQLP-actions">
                <button type="submit" className="save-btn">Lưu</button>
                <button type="button" className="cancel-btn" onClick={() => setEditingCustomer(null)}>Hủy</button>
              </div>
            </form>
          </div>
        )}

        <div className="booking-manager">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Email</th><th>Họ</th><th>Tên</th><th>Số điện thoại</th><th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.email}</td>
                  <td>{c.lastName}</td>
                  <td>{c.firstName}</td>
                  <td>{c.phone || "N/A"}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                      <button onClick={() => setEditingCustomer(c)}>Sửa</button>
                      <button onClick={() => handleDelete(c.email)}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}