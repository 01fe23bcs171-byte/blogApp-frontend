import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(() => setError("Failed to load blog"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) navigate(`/blog/${id}`);
    else setError("Update failed");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 mb-4 h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
