import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import PostCard from './PostCard'
import '../styles/Post.css'

export default function PostList({ searchTerm }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

const filteredPosts = posts.filter(post => {
  const search = searchTerm?.toLowerCase() || "";
  const title = (post.title ?? "").toLowerCase();
  const content = (post.content ?? "").toLowerCase();
  
  return title.includes(search) || content.includes(search);
});


useEffect(() => {
  let isMounted = true;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts', { 
        headers: { 'Cache-Control': 'no-cache' } 
      });
      
      if (isMounted) {
        setPosts(response.data);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message || 'Failed to fetch posts');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchPosts();

  return () => { isMounted = false; };
}, []);


  if (loading) return <div className="loading">Loading posts...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="post-list-container">
      <div className="header-actions">
        <h1>Forum Dashboard</h1>
      </div>

      {posts.length === 0 ? (
        <p className="no-posts">No posts yet. Be the first to create one!</p>
      ) : filteredPosts.length > 0 ? (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="no-results">No posts found matching "{searchTerm}"</p>
      )}
    </div>
  )
}
