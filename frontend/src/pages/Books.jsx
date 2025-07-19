import { useState } from "react"
import { Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useShopContext } from "@/hooks/UseShopContext"
import Book from "@/components/Book"

// const books = [
//   {
//     id: 1,
//     title: "The Great Adventure",
//     author: "Jane Smith",
//     price: 24.99,
//     rating: 4.5,
//     reviews: 128,
//     category: "Fiction",
//     genre: "Adventure",
//     img: "/placeholder.svg?height=300&width=200",
//     description: "An epic tale of courage and discovery.",
//   },
//   {
//     id: 2,
//     title: "Mystery of the Lost City",
//     author: "John Doe",
//     price: 19.99,
//     rating: 4.2,
//     reviews: 89,
//     category: "Mystery",
//     genre: "Thriller",
//     img: "/placeholder.svg?height=300&width=200",
//     description: "A thrilling mystery that will keep you guessing.",
//   },
//   {
//     id: 3,
//     title: "Science Explained",
//     author: "Dr. Sarah Wilson",
//     price: 34.99,
//     rating: 4.8,
//     reviews: 256,
//     category: "Non-Fiction",
//     genre: "Science",
//     img: "/placeholder.svg?height=300&width=200",
//     description: "Complex scientific concepts made simple.",
//   },
//   {
//     id: 4,
//     title: "Love in Paris",
//     author: "Marie Claire",
//     price: 16.99,
//     rating: 4.3,
//     reviews: 167,
//     category: "Romance",
//     genre: "Contemporary",
//     img: "/placeholder.svg?height=300&width=200",
//     description: "A heartwarming romance set in the city of love.",
//   },
//   {
//     id: 5,
//     title: "The Digital Future",
//     author: "Tech Guru",
//     price: 29.99,
//     rating: 4.6,
//     reviews: 203,
//     category: "Technology",
//     genre: "Future",
//     img: "/placeholder.svg?height=300&width=200",
//     description: "Exploring the possibilities of tomorrow's technology.",
//   },
//   {
//     id: 6,
//     title: "Cooking Masterclass",
//     author: "Chef Antonio",
//     price: 39.99,
//     rating: 4.7,
//     reviews: 312,
//     category: "Cooking",
//     genre: "Cookbook",
//     img: "/placeholder.svg?height=300&width=200",
//     description: "Master the art of cooking with professional techniques.",
//   },
// ]

export default function Books() {
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([])
  const { books, categories } = useShopContext()
  const priceRanges = ["Under $20", "$20-$30", "$30-$40", "Over $40"]

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(book?.Category?.category_name)
    const matchesPrice =
      priceRange.length === 0 ||
      priceRange.some((range) => {
        switch (range) {
          case "Under $20":
            return book.price < 20
          case "$20-$30":
            return book.price >= 20 && book.price < 30
          case "$30-$40":
            return book.price >= 30 && book.price < 40
          case "Over $40":
            return book.price >= 40
          default:
            return true
        }
      })
    return matchesCategory && matchesPrice
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  const handlePriceRangeChange = (range, checked) => {
    if (checked) {
      setPriceRange((prev) => [...prev, range])
    } else {
      setPriceRange((prev) => prev.filter((r) => r !== range))
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Amazing
            <span className="text-pink-500"> Books</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our vast collection of books across all genres. From bestsellers to hidden gems, find your perfect
            read.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full border-pink-200 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterContent
                    categories={categories}
                    priceRanges={priceRanges}
                    selectedCategories={selectedCategories}
                    priceRange={priceRange}
                    onCategoryChange={handleCategoryChange}
                    onPriceRangeChange={handlePriceRangeChange}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden lg:block">
              <FilterContent
                categories={categories}
                priceRanges={priceRanges}
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                onCategoryChange={handleCategoryChange}
                onPriceRangeChange={handlePriceRangeChange}
              />
            </div>
          </div>

          {/* Books Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">All Books ({sortedBooks.length})</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-pink-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedBooks.map((book) => (
                <Book key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterContent({
  categories,
  priceRanges,
  selectedCategories,
  priceRange,
  onCategoryChange,
  onPriceRangeChange,
}) {
  return (
    <div className="space-y-6 mx-4">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.category_name} className="flex items-center space-x-2">
              <Checkbox
                id={category.category_name}
                checked={selectedCategories.includes(category.category_name)}
                onCheckedChange={(checked) => onCategoryChange(category.category_name, checked)}
                className="border-pink-300 data-[state=checked]:bg-pink-500"
              />
              <Label htmlFor={category.category_name} className="text-sm text-gray-700">
                {category.category_name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range} className="flex items-center space-x-2">
              <Checkbox
                id={range}
                checked={priceRange.includes(range)}
                onCheckedChange={(checked) => onPriceRangeChange(range, checked)}
                className="border-pink-300 data-[state=checked]:bg-pink-500"
              />
              <Label htmlFor={range} className="text-sm text-gray-700">
                {range}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
