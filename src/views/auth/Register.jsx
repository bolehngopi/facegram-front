import { useContext } from "react"
import { useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    password: "",
    bio: "",
    is_private: false,
  })
  const { register, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  document.title = "Facegram - Register"

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  useEffect(() => {
    if (auth) {
      navigate('/home');
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await register(formData);
      navigate('/home');
    } catch (error) {
      console.log("Error: ", error);
      alert("Something is not right");
    }
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
              <h5 className="mb-0">Register</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="full_name">Full Name</label>
                  <input type="text" className="form-control" id="full_name" name="full_name" onChange={handleChange} />
                </div>

                <div className="mb-2">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" name="username" onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="bio">Bio</label>
                  <textarea name="bio" id="bio" cols="30" rows="3" className="form-control" onChange={handleChange} ></textarea>
                </div>

                <div className="mb-3 d-flex align-items-center gap-2">
                  <input type="checkbox" id="is_private" name="is_private" onChange={handleChange} />
                  <label htmlFor="is_private">Private Account</label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            Already have an account? <a href="index.html">Login</a>
          </div>

        </div>
      </div>
    </>
  )
}