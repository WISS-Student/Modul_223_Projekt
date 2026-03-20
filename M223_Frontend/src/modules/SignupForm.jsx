import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState(null)
  const { register } = useAuth()
  const navigate = useNavigate()

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    try {
      await register(formData.username, formData.email, formData.password)
      navigate("/login")
    } catch (err) {
      setError(err.message || "Registration failed")
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </>
  )
}