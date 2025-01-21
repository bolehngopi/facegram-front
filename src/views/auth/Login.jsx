import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Login = () => {
  const { login, auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, [auth, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
    } catch (err) {
      console.log("Login error: ", err);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
              <h5 className="mb-0">Login</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            Don&apos;t have account? <Link to={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};
