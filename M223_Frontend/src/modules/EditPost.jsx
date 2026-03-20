import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import '../styles/Post.css'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`)
        setTitle(response.data.title)
        setContent(response.data.content)
        setImageUrl(response.data.imageUrl || '')
      } catch (err) {
        setError("Failed to load post data")
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/posts/${id}`, { title, content, imageUrl })
      alert("Post updated successfully!")
      navigate(`/post/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update post")
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="create-post-container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} className="form-card">
        {error && <p className="error" style={{color: 'red'}}>{error}</p>}
        
        <div className="form-group">
          <label>Title</label>
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Image URL (Optional)</label>
          <input 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="https://..." 
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn-publish">Save Changes</button>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
