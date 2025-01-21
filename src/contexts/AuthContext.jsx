import { useState } from "react";
import { createContext } from "react";
import Api from "../libs/Api";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const store = localStorage.getItem("auth");
    try {
      return store ? JSON.parse(store) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  });
  const navigate = useNavigate();

  const login = async (cred) => {
    try {
      const { data } = await Api.post("api/v1/auth/login", cred);
      const userDetails = { token: data.token, ...data.user };
      localStorage.setItem("auth", JSON.stringify(userDetails)); // Use JSON.stringify
      setAuth(userDetails);
      navigate("/home");
    } catch (error) {
      console.error("Login error: ", error);
      throw error;
    }
  };

  const register = async (cred) => {
    try {
      const { data } = await Api.post("api/v1/auth/register", cred);
      const userDetails = { token: data.token, ...data.user };
      localStorage.setItem("auth", JSON.stringify(userDetails)); // Use JSON.stringify
      setAuth(userDetails);
      navigate("/home");
    } catch (error) {
      console.error("Register error: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Optionally call the logout endpoint
      await Api.post("api/v1/auth/logout");
      localStorage.removeItem("auth");
      setAuth(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error);
      throw error;
    }
  };

  // // Optional: Check token expiration and refresh
  // useEffect(() => {
  //   // Implement token refresh logic here
  // }, [auth]);

  return (
    <AuthContext.Provider value={{ logout, login, auth, register }}>
      {children}
    </AuthContext.Provider>
  );
};
