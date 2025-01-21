import { useParams } from "react-router";
import Api from "../libs/Api";
import { useState, useEffect } from "react";

export const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (user) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await Api.get(`api/v1/users/${user}`);
      setUser(data);
      console.log(data);
    } catch (err) {
      console.log("Error load user: ", err);
      setError("Failed to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  useEffect(() => {
    document.title = `Facegram - Profile of ${
      user?.username || "private account"
    }`;
  }, [user]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h5 className="mb-0">{user?.full_name}</h5>
            <span>@{user?.username}</span>
          </div>
          <small className="mb-0 text-muted">{user?.bio}</small>
        </div>
        <div>
          <button className="btn btn-primary w-100 mb-2">Follow</button>
          <div className="d-flex gap-3">
            <div>
              <div className="profile-label">
                <b>{user?.posts?.length || 0}</b> posts
              </div>
            </div>
            <div className="profile-dropdown">
              <div className="profile-label">
                <b>100</b> followers
              </div>
              <div className="profile-list">
                <div className="card">
                  <div className="card-body">{/* Render followers here */}</div>
                </div>
              </div>
            </div>
            <div className="profile-dropdown">
              <div className="profile-label">
                <b>100</b> following
              </div>
              <div className="profile-list">
                <div className="card">
                  <div className="card-body">{/* Render following here */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        {user?.is_private ? (
          <div>This account is private</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : user?.posts?.length > 0 ? (
          user.posts.map((post, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="card-images mb-2">
                    {post?.attachments?.map((image, index) => (
                      <img
                        key={index}
                        src={`${import.meta.env.VITE_API_URL}/storage/${
                          image.storage_path
                        }`}
                        alt={`Image ${index + 1} from ${user.username}`}
                        className="w-100"
                      />
                    ))}
                  </div>
                  <p className="mb-0 text-muted">{post.caption}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </>
  );
};
