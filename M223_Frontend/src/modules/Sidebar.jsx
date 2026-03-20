import '../styles/Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul className="category-list">
          <li className="active">All Posts</li>
          <li>General Discussion</li>
          <li>Creative Corner</li>
          <li>Announcements</li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Popular Tags</h3>
        <div className="tag-cloud">
          <span className="tag">#Pokemon</span><br/>
          <span className="tag">#Trainer</span><br/>
          <span className="tag">#Art</span><br/>
          <span className="tag">#Question</span><br/>
        </div>
      </div>
    </aside>
  )
}