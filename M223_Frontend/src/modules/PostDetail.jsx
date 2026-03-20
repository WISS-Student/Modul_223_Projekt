import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import CommentSection from './CommentSection'
import '../styles/Post.css'

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentCount, setCommentCount] = useState(0)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`)
        setPost(response.data)
        setCommentCount(response.data.comments?.length || 0)
      } catch (err) {
        setError(err.message || 'Failed to fetch post')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${id}`);
        alert("Post deleted successfully");
        navigate("/");
      } catch (err) {
        alert("Failed to delete post: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleCommentAdded = () => {
    setCommentCount(prev => prev + 1)
  }

  if (loading) return <div className="loading">Loading post...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!post) return <div className="error">Post not found</div>

  return (
    <div className="post-detail-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      <div className="post-card">
        <div className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>Posted by {post.user?.username}</span>
            <span> • </span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="post-content">
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post attachment" className="post-image" />
          )}
          <p>{post.content}</p>
        </div>

        {/* 
          PERMISSION BLOCK: 
          - Entire block shows if user is Admin OR the Author.
          - Edit button ONLY shows for the Author.
          - Delete button shows for both Admin and Author.
        */}
        {user && (user.roles?.includes('ROLE_ADMIN') || user.id === post.user?.id) && (
          <div className="admin-actions">
            {user.id === post.user?.id && (
              <button
                onClick={() => navigate(`/post/edit/${id}`)}
                className="btn-secondary"
              >
                Edit Post
              </button>
            )}

            <button
              onClick={handleDelete}
              className="btn-delete"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>

      <div className="comments-section">
        <h2>Comments ({commentCount})</h2>
        <CommentSection postId={id} onCommentAdded={handleCommentAdded} />
      </div>
    </div>
  )
}
