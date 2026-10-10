import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function loadUser() {
  try {
    const saved = localStorage.getItem("ecommerce-demo-user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  function login(email) {
    const demoUser = { email };
    localStorage.setItem("ecommerce-demo-user", JSON.stringify(demoUser));
    setUser(demoUser);
  }

  function register(name, email) {
    const demoUser = { name, email };
    localStorage.setItem("ecommerce-demo-user", JSON.stringify(demoUser));
    setUser(demoUser);
  }

  function logout() {
    localStorage.removeItem("ecommerce-demo-user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}