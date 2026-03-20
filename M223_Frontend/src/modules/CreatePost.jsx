import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'

/**
 * Components to show and to create posts.
 */
export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: ''
  })
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return <div>Please <Link to="/login">login</Link> to create a post.</div>
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await api.post('/posts', formData)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post')
    }
  }

  return (
    <div className="create-post-container">
      <h1>Create New Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL (Optional)</label>
          <input
            type="url"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <button type="submit" className="btn-primary">Publish Post</button>
      </form>
    </div>
  )
}