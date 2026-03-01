import { useEffect, useState } from "react";
import API from "../services/api";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log("Error fetching comments");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/comments/${postId}`, { content });
      setContent("");
      fetchComments();
    } catch (error) {
      alert("Must be logged in to comment.");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      alert("Not authorized.");
    }
  };

  return (
    <div>
      <h3>Comments</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Comment</button>
      </form>

      <br />

      {comments.map((comment) => (
        <div key={comment._id} style={{ borderBottom: "1px solid gray", marginBottom: "5px" }}>
          <p>{comment.content}</p>
          <small>By: {comment.author?.username}</small>

          {(user?.id === comment.author?._id || user?.isAdmin) && (
            <button onClick={() => handleDelete(comment._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentSection;