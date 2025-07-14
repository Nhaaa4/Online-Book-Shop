import { ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useLocation } from "react-router-dom"
import { toast } from "sonner"
import { useShopContext } from "@/hooks/UseShopContext"
import { useState } from "react"

export default function Navigation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = useLocation().pathname
  const { token, setToken, navigate, getCartCount } = useShopContext()

  const totalItems = getCartCount()
  const logout = () => {
    localStorage.removeItem("token")
    setToken('')
    navigate("/authentication")
    toast("Logged out successfully", {
      description: <span className="text-gray-500">You have been logged out of your account.</span>,
      style: {
        background: "#ecfdf5", 
        color: "#166534",      
        border: "1px solid #bbf7d0" 
      },
    })
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="border-b border-pink-100 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            BookShop
          </Link>

          {/* Navigation menu - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors duration-200 hover:text-pink-600 ${
                  pathname === link.href ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="hover:bg-pink-50">
                <ShoppingCart className="h-5 w-5 text-pink-600" />
              </Button>
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* Profile */}
            {token && <Link to="/profile">
              <Button variant="ghost" size="icon" className="hover:bg-pink-50">
                <User className="h-5 w-5 text-pink-600" />
              </Button>
            </Link>}

            {/* Login/Register */}
            <div className="hidden lg:flex items-center space-x-2">
              {token ? (
              <Button variant="ghost" onClick={logout} className="text-pink-600 hover:bg-pink-50">
                Log out
              </Button>
              ) : (
              <Link to="/authentication">
                <Button variant="ghost" className="text-pink-600 hover:bg-pink-50">
                  Log in
                </Button>
              </Link>
              )}
            </div>

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-pink-50">
                  <Menu className="h-5 w-5 text-pink-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6 mx-4">
                  {/* Navigation links */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`text-lg font-medium transition-colors hover:text-pink-600 ${
                        pathname === link.href ? "text-pink-600" : "text-gray-700"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile auth buttons */}
                  <div className="flex flex-col space-y-3 pt-6 border-t border-pink-100">
                    {token ? (
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="w-full border-pink-200 hover:bg-pink-50 bg-transparent"
                    >
                      Log out
                    </Button>
                    ) : (
                    <Link to="/authentication" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-pink-200 hover:bg-pink-50 bg-transparent">
                        Log in
                      </Button>
                    </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
