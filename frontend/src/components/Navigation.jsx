import { ShoppingCart, Menu, Search, Heart, Bell, BookOpen, LogOut, Settings, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link, useLocation } from "react-router-dom"
import { toast } from "sonner"
import { useShopContext } from "@/hooks/UseShopContext"
import { useState, useEffect } from "react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = useLocation().pathname
  const { token, setToken, navigate, getCartCount, user } = useShopContext()

  // Handle scroll effect for modern navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalItems = getCartCount()
  const logout = () => {
    localStorage.removeItem("bookshop_user")
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
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-gray-200' 
        : 'bg-white shadow-sm border-pink-100'
    }`}>
      <div className="container mx-auto px-4">
        {/* Main navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo with modern styling */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              BookShop
            </span>
          </Link>

          {/* Navigation menu - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-50 group overflow-hidden ${
                  pathname === link.href 
                    ? "text-pink-600" 
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                {link.label}
                {/* Animated underline */}
                <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 ease-out ${
                  pathname === link.href 
                    ? 'w-3/4 opacity-100' 
                    : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100'
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* Right side actions with modern styling */}
          <div className="flex items-center space-x-2">
            {/* Search button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex hover:bg-gray-100 transition-colors duration-200"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Wishlist/Favorites */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex hover:bg-gray-100 transition-colors duration-200"
            >
              <Heart className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Cart with modern badge */}
            <Link to="/cart" className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-pink-50 transition-all duration-200 group-hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5 text-pink-600" />
              </Button>
              {/* Always show cart badge with total count */}
              <Badge className={`absolute -top-1 -right-1 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full transition-all duration-200 ${
                totalItems > 0 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse' 
                  : 'bg-gray-400'
              }`}>
                {totalItems}
              </Badge>
            </Link>

            {/* Profile dropdown with user avatar */}
            {token && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-pink-50 transition-all duration-200">
                    <Avatar className="h-8 w-8 ring-2 ring-pink-100 hover:ring-pink-200 transition-all duration-200">
                      <AvatarImage src={user?.avatar || "/avatar.svg"} alt={user?.first_name || "User"} />
                      <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium">
                        {user?.first_name?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 mt-2 bg-white/95 backdrop-blur-md border border-pink-100 shadow-lg" 
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.first_name && (
                        <p className="font-medium text-sm text-gray-900">
                          {user.first_name} {user.last_name}
                        </p>
                      )}
                      {user?.email && (
                        <p className="w-[200px] truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-pink-100" />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <UserCircle className="h-4 w-4 text-gray-500" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile?tab=information" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-pink-100" />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Auth buttons with modern styling */}
            <div className="hidden lg:flex items-center space-x-2">
              {!token && (
                <Link to="/authentication">
                  <Button 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Log in
                  </Button>
                </Link>
              )}
            </div>

            {/* Enhanced mobile menu with modern hamburger animation */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="lg:hidden hover:bg-pink-50 hover:scale-110 transition-all duration-300 rounded-xl group"
                >
                  <div className="relative w-6 h-6">
                    {/* Animated hamburger lines */}
                    <div className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 group-hover:bg-pink-600 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
                    <div className={`absolute top-2.5 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 group-hover:bg-pink-600 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`absolute top-4 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 group-hover:bg-pink-600 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 bg-white/98 backdrop-blur-xl border-l border-pink-100 shadow-2xl">
                <div className="flex flex-col h-full relative">
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/30 pointer-events-none"></div>
                  
                  {/* Mobile menu header with enhanced styling */}
                  <div className="relative flex items-center space-x-3 pt-8 pb-6 px-6 border-b border-gradient-to-r from-pink-200/30 to-purple-200/30">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        BookShop
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Discover amazing books</p>
                    </div>
                  </div>

                  {/* Enhanced navigation links with animations */}
                  <div className="relative flex-1 px-6 py-8 overflow-y-auto">
                    <nav className="space-y-2">
                      {navLinks.map((link, index) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className={`relative flex items-center space-x-4 px-4 py-4 rounded-2xl text-base font-medium transition-all duration-300 group overflow-hidden transform hover:scale-[1.02] ${
                            pathname === link.href 
                              ? "text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-200" 
                              : "text-gray-700 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:shadow-md"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                          style={{ 
                            animationDelay: `${index * 100}ms`,
                            animation: 'slideInFromLeft 0.5s ease-out forwards'
                          }}
                        >
                          {/* Icon placeholder */}
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            pathname === link.href 
                              ? 'bg-white' 
                              : 'bg-pink-300 group-hover:bg-pink-500'
                          }`}></div>
                          <span className="flex-1">{link.label}</span>
                          {/* Arrow indicator */}
                          <div className={`transition-all duration-300 ${
                            pathname === link.href 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                          </div>
                          {/* Gradient background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </Link>
                      ))}
                    </nav>

                    {/* Enhanced mobile-only actions */}
                    <div className="mt-8 space-y-3">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Quick Actions</h3>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 rounded-2xl py-4 px-4 transition-all duration-300 transform hover:scale-[1.02] group"
                        style={{ 
                          animationDelay: '400ms',
                          animation: 'slideInFromLeft 0.5s ease-out forwards'
                        }}
                      >
                        <div className="bg-blue-100 p-2 rounded-xl mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                          <Search className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="flex-1 text-left">Search Books</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 rounded-2xl py-4 px-4 transition-all duration-300 transform hover:scale-[1.02] group"
                        style={{ 
                          animationDelay: '500ms',
                          animation: 'slideInFromLeft 0.5s ease-out forwards'
                        }}
                      >
                        <div className="bg-red-100 p-2 rounded-xl mr-4 group-hover:bg-red-200 transition-colors duration-300">
                          <Heart className="h-5 w-5 text-red-500" />
                        </div>
                        <span className="flex-1 text-left">Wishlist</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                        </div>
                      </Button>
                      
                      <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 rounded-2xl py-4 px-4 transition-all duration-300 transform hover:scale-[1.02] group relative"
                          style={{ 
                            animationDelay: '600ms',
                            animation: 'slideInFromLeft 0.5s ease-out forwards'
                          }}
                        >
                          <div className="bg-pink-100 p-2 rounded-xl mr-4 group-hover:bg-pink-200 transition-colors duration-300 relative">
                            <ShoppingCart className="h-5 w-5 text-pink-600" />
                            <Badge className={`absolute -top-1 -right-1 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full transition-all duration-200 ${
                              totalItems > 0 
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse' 
                                : 'bg-gray-400'
                            }`}>
                              {totalItems}
                            </Badge>
                          </div>
                          <div className="flex-1 text-left">
                            <span>Shopping Cart</span>
                            <div className="text-xs text-gray-500 mt-1">
                              {totalItems > 0 ? `${totalItems} items` : 'Empty cart'}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`text-lg font-bold ${
                              totalItems > 0 ? 'text-pink-500' : 'text-gray-400'
                            }`}>
                              {totalItems}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                            </div>
                          </div>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Enhanced mobile auth section */}
                  <div className="relative px-6 py-6 mt-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-sm"></div>
                    <div className="relative">
                      {token ? (
                        <div className="space-y-4">
                          <div className="text-center mb-4">
                            <div className="flex items-center justify-center mb-2">
                              <Avatar className="h-12 w-12 ring-2 ring-pink-200">
                                <AvatarImage src={user?.avatar || "/avatar.svg"} alt={user?.first_name || "User"} />
                                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium">
                                  {user?.first_name?.[0]?.toUpperCase() || 'U'}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900">
                              {user?.first_name ? `${user.first_name} ${user.last_name}` : 'My Account'}
                            </h4>
                            {user?.email && (
                              <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                            )}
                          </div>
                          <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-white/80 rounded-2xl py-4 px-4 transition-all duration-300 transform hover:scale-[1.02] group shadow-sm"
                              style={{ 
                                animationDelay: '700ms',
                                animation: 'slideInFromLeft 0.5s ease-out forwards'
                              }}
                            >
                              <div className="bg-purple-100 p-2 rounded-xl mr-4 group-hover:bg-purple-200 transition-colors duration-300">
                                <UserCircle className="h-5 w-5 text-purple-600" />
                              </div>
                              <span className="flex-1 text-left font-medium">My Profile</span>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                              </div>
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            onClick={logout}
                            className="w-full border-2 border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-2xl py-4 font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-sm"
                            style={{ 
                              animationDelay: '800ms',
                              animation: 'slideInFromLeft 0.5s ease-out forwards'
                            }}
                          >
                            <span>Log out</span>
                          </Button>
                        </div>
                      ) : (
                        <Link to="/authentication" onClick={() => setIsMenuOpen(false)}>
                          <Button 
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md hover:shadow-xl rounded-2xl py-4 font-medium transition-all duration-300 transform hover:scale-[1.02]"
                            style={{ 
                              animationDelay: '700ms',
                              animation: 'slideInFromLeft 0.5s ease-out forwards'
                            }}
                          >
                            Log in / Sign up
                          </Button>
                        </Link>
                      )}
                    </div>
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
