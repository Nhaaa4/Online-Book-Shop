import { Button } from "@/components/ui/button"
import { useAuth, AuthProvider } from "@/context/authContext"
import { authAPI } from "@/lib/api"
import { BarChart3, LogOut, Package, Settings, Shield, ShoppingCart, User, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

export default function AdminLayout() {
  return (
    <AuthProvider>
      <AdminContent />
      <ToastContainer />
    </AuthProvider>
  )
}

function AdminContent() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await authAPI.getProfile()
        setUser(userResponse.data.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (token) {
      fetchUserData()
    }
  }, [token])

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      logout()
      toast.success('Logged out successfully!')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      logout()
      navigate('/login')
    }
  }

  const isActive = (path) => location.pathname === path

  // If on login page, render just the outlet without sidebar
  if (location.pathname === '/login') {
    return <Outlet />
  }

  if (!token) {
    return <Outlet />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="px-4 py-2 border-b">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <div>
              <p className="font-medium">{user?.fullName || 'Admin User'}</p>
            </div>
          </div>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          <Link to="/">
            <Button
              variant={isActive('/') ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </Button>
          </Link>

          <Link to="/users">
            <Button
              variant={isActive('/users') ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>

          <Link to="/roles">
            <Button
              variant={isActive('/roles') ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Shield className="mr-2 h-4 w-4" />
              Roles
            </Button>
          </Link>

          <Link to="/permissions">
            <Button
              variant={isActive('/permissions') ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Settings className="mr-2 h-4 w-4" />
              Permissions
            </Button>
          </Link>

          <Link to="/books">
            <Button
              variant={isActive('/books') ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Package className="mr-2 h-4 w-4" />
              Books
            </Button>
          </Link>

          <Link to="/orders">
            <Button
              variant={isActive('/orders') ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Button>
          </Link>

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
