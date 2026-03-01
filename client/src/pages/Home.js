import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log("Error fetching posts");
    }
  };

  return (
    <div>
      <h2>All Blog Posts</h2>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Home;