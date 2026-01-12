import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>

            <div className="flex gap-2">
              <Link to={`/blog/${blog._id}`} className="bg-blue-600 text-white px-4 py-1 rounded">
                Read
              </Link>
              <Link to={`/edit/${blog._id}`} className="bg-yellow-500 text-white px-4 py-1 rounded">
                Edit
              </Link>
              <Link to={`/blog/${blog._id}`} className="bg-red-600 text-white px-4 py-1 rounded">
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
