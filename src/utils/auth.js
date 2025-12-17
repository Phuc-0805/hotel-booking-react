// utils/auth.js

// Chuẩn hóa roles thành mảng chữ in hoa
export function normalizeRoles(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    if (raw.length === 0) return [];
    if (typeof raw[0] === 'string') return raw.map(r => r.toUpperCase());
    if (typeof raw[0] === 'object') {
      return raw
        .map(r => (r.authority || r.name || r.role || '').toString().toUpperCase())
        .filter(Boolean);
    }
  }
  if (typeof raw === 'string') {
    const s = raw.trim();
    if (s.startsWith('{') && s.endsWith('}')) {
      const inner = s.slice(1, -1);
      return inner.split(',').map(r => r.trim().toUpperCase()).filter(Boolean);
    }
    return [s.toUpperCase()];
  }
  return [];
}

// Lưu auth vào localStorage
export function setAuth(obj) {
  if (!obj) return;

  // Chuẩn hóa token từ bất kỳ trường nào
  const token = obj.token || obj.accessToken || obj.access_token;
  if (!token) {
    console.warn('setAuth: no token provided, auth not saved');
    return; // không lưu nếu token không tồn tại
  }

  const copy = { ...obj, token };
  copy.roles = normalizeRoles(copy.roles || copy.authorities || copy.role);

  localStorage.setItem("auth", JSON.stringify(copy));
}

// Lấy auth từ localStorage
export function getAuth() {
  const a = localStorage.getItem("auth");
  if (!a) return null;

  try {
    const parsed = JSON.parse(a);
    parsed.roles = normalizeRoles(parsed.roles || parsed.authorities || parsed.role);
    parsed.token = parsed.token || parsed.accessToken || parsed.access_token || null;
    if (!parsed.token) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}

// Kiểm tra login
export function isAuthenticated() {
  return !!getAuth();
}

// Kiểm tra admin
export function isAdmin() {
  const auth = getAuth();
  if (!auth || !auth.roles) return false;
  return auth.roles.includes("ROLE_ADMIN") || auth.roles.includes("ADMIN");
}

// Kiểm tra user
export function isUser() {
  const auth = getAuth();
  if (!auth || !auth.roles) return false;
  return auth.roles.includes("ROLE_USER") || auth.roles.includes("USER");
}

// Logout
export function logout() {
  localStorage.removeItem("auth");
}
