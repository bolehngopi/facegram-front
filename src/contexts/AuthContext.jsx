import { useState } from "react";
import { createContext } from "react";
import Api from "../libs/Api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const sharedAuth = localStorage.getItem("auth");
    return sharedAuth ? JSON.parse(sharedAuth) : null;
  });

  const login = async (credential) => {
    try {
      const { data } = await Api.post('api/v1/auth/login', credential);
      const userDetails = { token: data.token, ...data.user }
      localStorage.setItem('auth', JSON.stringify(userDetails))
      setAuth(userDetails);
      console.log("Login success");
    } catch (err) {
      console.log("Login error");
      throw err
    }
  }

  const register = async (credential) => {
    try {
      const { data } = await Api.post('api/v1/auth/register', credential);
      const userDetails = { token: data.token, ...data.user }
      localStorage.setItem('auth', JSON.stringify(userDetails))
      setAuth(userDetails);
      console.log("Register success");
    } catch (err) {
      console.log("Register error");
      throw err
    }
  }

  const logout = async () => {
    try {
      await Api.post('api/v1/auth/logout');
      setAuth(null);
      localStorage.removeItem('auth');
    } catch (err) {
      console.log("Logout error");
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }} >
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
