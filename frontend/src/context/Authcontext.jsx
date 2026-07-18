import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const API_URL = "http://127.0.0.1:8000/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { access_token } = response.data;
    setToken(access_token);
    setUser({ email });
    return access_token;
  };

  const register = async (email, password) => {
    await axios.post(`${API_URL}/register`, { email, password });
    return login(email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
