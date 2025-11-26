import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function loadUser() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const me = await api("/me", "GET");
      setUser(me);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function login(username, password) {
    const res = await api("/login", "POST", { username, password });
    localStorage.setItem("token", res.access_token);
    setUser(res.user);
  }

  async function signup(username, password) {
    const res = await api("/signup", "POST", { username, password });
    localStorage.setItem("token", res.access_token);
    setUser(res.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
