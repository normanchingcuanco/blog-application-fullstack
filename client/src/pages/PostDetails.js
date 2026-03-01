import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import CommentSection from "../components/CommentSection";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.log("Error fetching post");
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/posts/${id}`);
      navigate("/");
    } catch (error) {
      alert("Not authorized.");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Author:</strong> {post.author?.username}</p>

      {/* Edit + Delete (Author or Admin only) */}
      {(user?.id === post.author?._id || user?.isAdmin) && (
        <div style={{ marginBottom: "10px" }}>
          <Link to={`/edit/${post._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <hr />

      <CommentSection postId={id} />
    </div>
  );
}

export default PostDetails;