import Book from "@/components/Book";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useShopContext } from "@/hooks/UseShopContext";
import { ArrowRight, Award, BookOpen, Play, Star, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Book Enthusiast",
    content:
      "BookShop has completely transformed my reading experience. The recommendations are spot-on and the delivery is always fast!",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Literature Professor",
    content:
      "As an educator, I appreciate the vast collection and competitive prices. My students love the easy ordering process.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Avid Reader",
    content:
      "The best online bookstore I've ever used. Great customer service and an amazing selection of both popular and rare books.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
]

export default function Home() {
  const { books, navigate } = useShopContext();
  const [email, setEmail] = useState("");

  const featuredBooks = books.slice(0, 4); 

  return (
    <>
     <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Your Next Great
                  <span className="text-pink-500 block">Adventure Awaits</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Discover millions of books, from bestsellers to hidden gems. Fast delivery, competitive prices, and
                  personalized recommendations just for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/books">
                  <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg">
                    Browse Books
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-pink-200 hover:bg-pink-50 px-8 py-4 text-lg bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600">Books Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Happy Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {featuredBooks.slice(0, 2).map((book, index) => (
                  <div key={book.id} className={`${index % 2 === 0 ? "mt-8" : ""}`} onClick={() => navigate(`/books/${book.id}`)}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-pink-100">
                      <CardContent className="p-4">
                        <div className="aspect-[3/4] relative mb-3 overflow-hidden rounded-lg">
                          <img
                            src={book?.image_url || "/placeholder.svg"}
                            alt={book.title}
                            fill
                            className="w-full h-full group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">{book?.Author?.first_name} {book?.Author?.last_name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-pink-600">${book.price}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BookShop?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're more than just a bookstore. We're your partner in discovering amazing stories and knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                <BookOpen className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vast Collection</h3>
              <p className="text-gray-600">Over 1 million books across all genres and categories</p>
            </div>

            <div className="text-center group">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with regular discounts and offers</p>
            </div>

            <div className="text-center group">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Join thousands of book lovers sharing reviews and recommendations</p>
            </div>

            <div className="text-center group">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                <Award className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Service</h3>
              <p className="text-gray-600">Fast shipping, easy returns, and excellent customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Books</h2>
            <p className="text-xl text-gray-600">Handpicked selections from our expert curators</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/books">
              <Button size="lg" variant="outline" className="border-pink-200 hover:bg-pink-50 bg-transparent">
                View All Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Readers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-pink-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Get the latest book recommendations, exclusive offers, and literary news delivered to your inbox.
          </p>

          <form className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-0 text-gray-900"
              required
            />
            <Button type="submit" variant="secondary" className="bg-white text-pink-600 hover:bg-pink-50">
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-pink-100 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
        </div>
      </section>
    </>
  )
}