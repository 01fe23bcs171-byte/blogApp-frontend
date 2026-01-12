import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const BlogDetails = () => {
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog not found')
        }
        throw new Error('Failed to fetch blog')
      }
      const data = await response.json()
      setBlog(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
          method: 'DELETE'
        })
        if (!response.ok) {
          throw new Error('Failed to delete blog')
        }
        // Navigate to home page after successful deletion
        navigate('/')
      } catch (err) {
        setError(err.message)
      }
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading blog...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error}</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Blog not found</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <div className="text-sm text-gray-500">
            Created on: {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="blog-content text-gray-700 whitespace-pre-wrap mb-8">
          {blog.content}
        </div>

        <div className="flex space-x-4 pt-6 border-t border-gray-200">
          <Link 
            to="/"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link 
            to={`/edit/${blog._id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Edit Blog
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
