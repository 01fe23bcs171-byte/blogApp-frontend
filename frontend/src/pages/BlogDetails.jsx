import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${id}`);
        if (!res.ok) throw new Error("Blog not found");

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // 🔹 Delete blog
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("Blog deleted successfully 🗑️");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading blog...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Blog not found
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <p className="text-gray-500 text-sm mb-6">
        Created on {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <div className="text-gray-700 whitespace-pre-wrap mb-8">
        {blog.content}
      </div>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Home
        </Link>

        <Link
          to={`/edit/${blog._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
