import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

/**
 * Component for the Login page.
 */
export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const { login } = useAuth()
    const navigate = useNavigate()

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await login(formData.username, formData.password)
            navigate("/")
        } catch (error) {
            alert("Login failed: " + error.message)
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}