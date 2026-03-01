import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div style={{ border: "1px solid black", marginBottom: "10px", padding: "10px" }}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
      <p><strong>Author:</strong> {post.author?.username}</p>
      <Link to={`/posts/${post._id}`}>Read More</Link>
    </div>
  );
}

export default PostCard;