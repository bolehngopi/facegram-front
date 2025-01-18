import { Navigate, useNavigate, useParams } from "react-router"
import Api from "../libs/Api";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Profile = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setLoading(true);

      const { data } = await Api.get(`api/v1/users/${id}`)
      setUser(data);
    } catch (err) {
      console.log("Error load user: ", err);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (user?.is_private && (auth?.id !== user?.id)) {
      navigate('/', { replace: true });
    }
  }, [auth, navigate, user]);

  useEffect(() => {
    fetchUser()
  }, []);

  document.title = `Facegram - Profile of ${user?.username || "private account"}`;

  return (
    <>
      <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h5 className="mb-0">{user?.full_name}</h5>
            <span>@{user?.username}</span>
          </div>
          <small className="mb-0 text-muted">
            {user?.bio}
          </small>
        </div>
        <div>
          <a href="user-profile-following.html" className="btn btn-primary w-100 mb-2">
            Follow
          </a>
          <div className="d-flex gap-3">
            <div>
              <div className="profile-label"><b>5</b> posts</div>
            </div>
            <div className="profile-dropdown">
              <div className="profile-label"><b>100</b> followers</div>
              <div className="profile-list">
                <div className="card">
                  <div className="card-body">
                    <div className="profile-user">
                      <a href="user-profile-private.html">@davidnaista</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@superipey</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@lukicenturi</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@_erik3010</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@asawgi</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@irfnmaulaa</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-dropdown">
              <div className="profile-label"><b>100</b> following</div>
              <div className="profile-list">
                <div className="card">
                  <div className="card-body">
                    <div className="profile-user">
                      <a href="user-profile-private.html">@davidnaista</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@superipey</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@lukicenturi</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@_erik3010</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@asawgi</a>
                    </div>
                    <div className="profile-user">
                      <a href="user-profile-private.html">@irfnmaulaa</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          user?.posts?.length > 0 ? (
            user?.posts?.map((post, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="card-images mb-2">
                      {post?.attachments?.map((image, index) => (
                        <img
                          key={index} // Ensure unique key
                          src={`${import.meta.env.VITE_API_URL}/storage/${image.storage_path}`}
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
          ))}
      </div>
    </>
  )
}