import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import { Link } from 'react-router-dom'


/**
 * Components to show and to create comments.
 */
export default function CommentSection({ postId, onCommentAdded }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/post/${postId}`)
        setComments(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        setError(err.message || 'Failed to fetch comments')
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await api.post('/comments', {
        postId,
        content: newComment
      })

      const enrichedComment = {
        ...response.data,
        user: {
          username: user?.username || 'You'
        },
        createdAt: new Date().toISOString()
      }

      setComments(prev => [...prev, enrichedComment])
      setNewComment('')

      if (onCommentAdded) {
        onCommentAdded();
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment')
    }
  }

  if (loading) return <div>Loading comments...</div>

  return (
    <div className="comment-section">
      {error && <div className="error" style={{ color: 'red' }}>{error}</div>}

      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button type="submit" className="btn-primary">Post Comment</button>
        </form>
      ) : (
        <p className="login-prompt">
          <Link to="/login">Log in</Link> to leave a comment
        </p>
      )}

      <div className="comments-list" style={{ marginTop: '20px' }}>
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id || Math.random()} className="comment-card" style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <div className="comment-header">
                <strong>{comment.user?.username || 'Anonymous'}</strong>
                <span className="comment-date" style={{ marginLeft: '10px', fontSize: '0.8em', color: '#666' }}>
                  {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Just now'}
                </span>
              </div>
              <p className="comment-content" style={{ marginTop: '5px' }}>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
