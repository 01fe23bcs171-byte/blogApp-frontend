import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error("Failed to create blog");
      }

      setTitle("");
      setContent("");
      alert("Blog created successfully 🎉");

    } catch (err) {
      console.error(err);
      setError("Failed to create blog");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit">Create Blog</button>
    </form>
  );
}

export default CreateBlog;
