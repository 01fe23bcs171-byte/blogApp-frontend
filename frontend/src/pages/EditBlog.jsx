import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    navigate("/");
  };

  return (
    <form onSubmit={update} className="max-w-xl mx-auto p-6 bg-white shadow">
      <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="input mt-4" value={content} onChange={e => setContent(e.target.value)} />
      <button className="btn btn-blue mt-4">Update</button>
    </form>
  );
};

export default EditBlog;
