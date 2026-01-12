import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs/${id}`)
      .then((res) => res.json())
      .then(setBlog);
  }, [id]);

  const handleDelete = async () => {
    await fetch(`${API_URL}/api/blogs/${id}`, { method: "DELETE" });
    navigate("/");
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="mb-6">{blog.content}</p>

      <div className="flex gap-3">
        <Link to="/" className="bg-gray-600 text-white px-4 py-2 rounded">
          Home
        </Link>
        <Link
          to={`/edit/${blog._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
