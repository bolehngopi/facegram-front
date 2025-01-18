import { useState } from "react";
import Api from "../libs/Api";
import { useNavigate } from "react-router";

export const CreatePost = () => {
  const [formData, setFormData] = useState({
    caption: "",
    attachments: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? Array.from(files) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.caption.trim()) return alert("Caption is required.");
    if (formData.attachments.length === 0) return alert("Please add at least one attachment.");

    setLoading(true);
    try {
      const data = new FormData();
      data.append("caption", formData.caption);
      formData.attachments.forEach((file) => data.append("attachments[]", file));

      await Api.post("api/v1/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post created successfully!");
      setFormData({ caption: "", attachments: [] });
      navigate('/');
    } catch (error) {
      console.error("Create post error: ", error);
      alert(error.response?.data?.message || "An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
            <h5 className="mb-0">Create new post</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="caption">Caption</label>
                <textarea
                  className="form-control"
                  name="caption"
                  id="caption"
                  cols="30"
                  rows="3"
                  value={formData.caption}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="attachments">Image(s)</label>
                <input
                  type="file"
                  className="form-control"
                  id="attachments"
                  name="attachments"
                  multiple
                  onChange={handleInput}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Sharing..." : "Share"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
