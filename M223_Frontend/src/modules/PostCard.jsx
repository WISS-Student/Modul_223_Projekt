import { Link } from 'react-router-dom'


/**
 * This the Post box visible on the dashboard. 
 * When you press on the comments it will lead you to a post view page.
 */
export default function PostCard({ post }) {
  if (!post) return null

  return (
    <div className="post-card">
      <div className="post-header">
        <h2>{post.title}</h2>
        <span className="post-meta">
          by {post.user?.username || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="post-content">{post.content}</p>
      
      <div className="post-footer">
        <Link to={`/post/${post.id}`} className="btn-secondary">
          View Comments ({post.comments?.length || 0})
        </Link>
      </div>
    </div>
  )
}