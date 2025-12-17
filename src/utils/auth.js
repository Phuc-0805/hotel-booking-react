export function getAuth() {
  const a = localStorage.getItem("auth");
  return a ? JSON.parse(a) : null;
}

export function setAuth(obj) {
  localStorage.setItem("auth", JSON.stringify(obj));
}

export function isAuthenticated() {
  return !!getAuth();
}

export function isAdmin() {
  const auth = getAuth();
  if (!auth || !auth.roles) return false;
  return auth.roles.includes("ROLE_ADMIN") || auth.roles.includes("admin");
}

export function isUser() {
  const auth = getAuth();
  if (!auth || !auth.roles) return false;
  return auth.roles.includes("ROLE_USER") || auth.roles.includes("user");
}

export function logout() {
  localStorage.removeItem("auth");
}