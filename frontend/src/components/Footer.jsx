import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-pink-400">
              BookShop
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner in discovering amazing books. We've been connecting readers with their next great
              adventure since 2020.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-gray-900 hover:text-pink-400">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-900 hover:text-pink-400">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-900 hover:text-pink-400">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-900 hover:text-pink-400">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-400">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-pink-400 transition-colors">
                Home
              </Link>
              <Link to="/books" className="block text-gray-300 hover:text-pink-400 transition-colors">
                Browse Books
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-pink-400 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-pink-400 transition-colors">
                Contact Us
              </Link>
              <Link to="/profile" className="block text-gray-300 hover:text-pink-400 transition-colors">
                My Profile
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-400">Customer Service</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-gray-300 hover:text-pink-400 transition-colors">
                Help Center
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-pink-400 transition-colors">
                Contact Us
              </Link>
              <Link to="/shipping" className="block text-gray-300 hover:text-pink-400 transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-gray-300 hover:text-pink-400 transition-colors">
                Returns & Exchanges
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-pink-400 transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-400">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-pink-400" />
                <span className="text-sm">support@bookshop.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-pink-400" />
                <span className="text-sm">855-123-BOOKSHOP</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-pink-400" />
                <span className="text-sm">123 Book Street, Reading City</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-pink-400">Newsletter</h4>
              <p className="text-sm text-gray-300">Get book recommendations & deals</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-pink-400"
                />
                <Button className="bg-pink-500 hover:bg-pink-600 text-white">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">&copy; {new Date().getFullYear()} BookShop. All rights reserved.</div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-pink-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-pink-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-pink-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
