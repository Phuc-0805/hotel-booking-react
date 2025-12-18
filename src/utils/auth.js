export const AUTH_KEY = "hotel_management_auth_v1";

export function normalizeRoles(raw) {
  if (!raw) return [];
  let rolesArray = [];
  if (Array.isArray(raw)) {
    rolesArray = raw.map(r => (typeof r === 'object' ? r.authority || r.role || r.name : r));
  } else if (typeof raw === 'string') {
    rolesArray = raw.replace(/[{}]/g, '').split(',').map(s => s.trim());
  }
  return rolesArray.map(r => r.toString().toUpperCase()).filter(Boolean);
}

export function setAuth(obj) {
  if (!obj) return null;
  const token = obj.token || obj.accessToken || obj.access_token;
  if (!token) return null;
  const authData = {
    ...obj,
    token,
    roles: normalizeRoles(obj.roles || obj.authorities || obj.role),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  return authData;
}

export function getAuth() {
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;
  try {
    const parsed = JSON.parse(data);
    if (!parsed || !parsed.token) return null;
    parsed.roles = normalizeRoles(parsed.roles);
    return parsed;
  } catch { return null; }
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function checkIsAdmin(authObj) {
  if (!authObj || !authObj.roles) return false;
  return authObj.roles.some(r => ["ADMIN", "ROLE_ADMIN"].includes(r));
}