import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then(setBlogs)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content}</p>

            <div className="mt-4 space-x-2">
              <Link className="btn btn-blue" to={`/blog/${blog._id}`}>Read</Link>
              <Link className="btn btn-yellow" to={`/edit/${blog._id}`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
