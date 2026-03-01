import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/posts", form);
      navigate("/");
    } catch (error) {
      alert("You must be logged in.");
    }
  };

  return (
    <div>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;