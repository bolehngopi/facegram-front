import { useState } from "react"
import Api from "../libs/Api";
import { useEffect } from "react";
import { PostCard } from "../components/PostCard";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const { data } = await Api.get('api/v1/posts');
      setPosts(data.data || []);
    } catch (err) {
      console.log("Fetch error: ", err);
    } finally {
      setLoading(false);
    }
  }

  document.title = "Facegram - Home";

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <div className="row justify-content-between">
      <div className="col-md-8">
        <h5 className="mb-3">News Feed</h5>
        {loading ? (
          <div>Loading...</div>
        ) : (
          posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard
                key={index}
                caption={post.caption}
                name={post.user.full_name}
                username={post.user.username}
                images={post.attachments}
                timestamp={post.created_at}
                id={post.user.id}
              />
            ))
          ) : (
            <div>No posts available</div>
          ))}
      </div>
    </div>
  )
}