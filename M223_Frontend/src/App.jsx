import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import PostList from './modules/PostList'
import PostDetail from './modules/PostDetail'
import CreatePost from './modules/CreatePost'
import EditPost from './modules/EditPost' 
import LoginForm from './modules/LoginForm'
import SignupForm from './modules/SignupForm'
import About from './modules/About'
import Rules from './modules/Rules'
import NoPage from './modules/NoPage'
import Layout from './Layout'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import './styles/Global.css'


function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <AuthProvider>
      <div className="app-wrapper">        
        <Routes>
          <Route path="/" element={<Layout onSearch={setSearchTerm} />}>
            <Route index element={<PostList searchTerm={searchTerm} />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="/post/edit/:id" element={<EditPost />} />
            <Route
              path="create-post"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            <Route path="about" element={<About />} />
            <Route path="rules" element={<Rules />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
