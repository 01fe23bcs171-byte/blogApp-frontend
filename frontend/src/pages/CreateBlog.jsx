import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

      {blogs.length === 0 && <p>No blogs yet</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>

            <div className="flex gap-2">
              <Link
                to={`/blog/${blog._id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Read
              </Link>
              <Link
                to={`/edit/${blog._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
