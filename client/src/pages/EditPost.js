import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setForm({
        title: res.data.title,
        content: res.data.content
      });
    } catch (error) {
      alert("Error loading post.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/posts/${id}`, form);
      navigate(`/posts/${id}`);
    } catch (error) {
      alert("Not authorized.");
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPost;