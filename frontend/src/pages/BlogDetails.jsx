import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid blog ID");
      return;
    }

    fetch(`${API_URL}/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600">{error}</p>
        <Link to="/" className="text-blue-600 underline">Back to Home</Link>
      </div>
    );
  }

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-10 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 mb-6">{blog.content}</p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/edit/${blog._id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
