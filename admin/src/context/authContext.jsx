import { authAPI } from "@/lib/api"
import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AuthContext = createContext(undefined)

function AuthProvider({ children }) {
  const [token, setToken] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      console.log('Attempting login with:', { email, password: '***' });
      const response = await authAPI.login({ email, password });
      console.log('Login response:', response);

      if (response.data.token) {
        toast("Login successful", {
          description: <span className="text-gray-500">Welcome back to BookShop!</span>,
        });
        setToken(response.data.token);
        localStorage.setItem("bookshop_admin", response.data.token);
        navigate('/')
      } 
    } catch (error) {
      console.error("Login error:", error);
      toast("Login failed", {
        description: <span className="text-gray-500">{error.response?.data?.message}</span> || <span className="text-gray-500">An error occurred during login.</span>,
      });
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    try {
      setToken(null)
      localStorage.removeItem("bookshop_admin")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  useEffect(() => {
    if (!token && localStorage.getItem('bookshop_admin')) {
      setToken(localStorage.getItem('bookshop_admin'));
    }
  }, [token, setToken]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider}