import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password
      })
      const userData = response.data
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return userData
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, email, password) => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user ? user.token : null
  }

  const value = {
    user,
    login,
    register,
    logout,
    getToken,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}