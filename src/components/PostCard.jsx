import { Link } from "react-router";

export const PostCard = ({ name, username, images, timestamp, caption, id }) => {
  return (
    <div className="card mb-4">
      <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
        <h6 className="mb-0">{name}</h6>
        {/* Convert timestamp to readable format */}
        <small className="text-muted">{new Date(timestamp).toLocaleString()}</small>
      </div>
      <div className="card-body">
        <div className="card-images mb-2">
          {/* Render images dynamically */}
          {images.map((image, index) => (
            <img
              key={index} // Ensure unique key
              src={`${import.meta.env.VITE_API_URL}/storage/${image.storage_path}`}
              alt={`Image ${index + 1} from ${username}`}
              className="w-100 mb-2"
            />
          ))}
        </div>
        <p className="mb-0 text-muted">
          <b>
            <Link to={`/profile/${id}`}>{username}</Link>
          </b>{" "}
          {caption}
        </p>
      </div>
    </div>
  );
};
