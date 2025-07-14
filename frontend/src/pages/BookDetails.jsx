import { getBookById } from "@/service/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Star, ShoppingCart, Heart, Share2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useShopContext } from "@/hooks/UseShopContext";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useShopContext();

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  const fetchBook = async () => {
    try {
      const response = await getBookById(id);
      if (!response.success) {
        toast(response.message);
      }
      setBook(response.data);
    } catch (err) {
      console.error("Error fetching book details:", err);
      toast(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2">
        {/* Book Image */}
        <div className="space-y-4 flex justify-center items-center">
          <div className="max-w-96 relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={book.image_url || "/placeholder.svg"}
              alt={book.title}
              fill
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2 bg-pink-100 text-pink-700">
              {book.Category?.category_name}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">by {book.Author?.first_name} {book.Author?.last_name}</p>

            <div className="text-sm mb-3">
              <span className="text-gray-600">ISBN:</span>
              <span className="ml-2 text-gray-800">{book.isbn}</span>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-medium">
                  {book.rating}
                </span>
              </div>
              <span className="text-gray-600">
                ({book.totalReviews} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-pink-600">
                ${book.price}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  className="h-8 w-8 border-pink-200"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="h-8 w-8 border-pink-200"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                onClick={() => {addToCart(book.id, quantity)}}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="border-pink-200 hover:bg-pink-50 bg-transparent"
              >
                <Heart className="h-4 w-4 text-pink-600" />
              </Button>
              <Button
                variant="outline"
                className="border-pink-200 hover:bg-pink-50 bg-transparent"
              >
                <Share2 className="h-4 w-4 text-pink-600" />
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <div>
              <h2 className="text-xl font-semibold">Description</h2>
              <div>
                <p className="text-gray-500 text-md leading-relaxed">{book.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-12 space-y-8">
        {/* Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating Overview */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {book.rating}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{book.totalReviews} reviews</p>
              </div>
              {/* <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{item.stars}★</span>
                    <Progress value={item.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-8">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div> */}
            </div>

            <Separator />

            {/* Write Review */}
            {/* <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Write a Review</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Your Rating:</span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 cursor-pointer ${
                      i < userRating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                    onClick={() => setUserRating(i + 1)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Share your thoughts about this book..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="border-pink-200 focus:border-pink-400"
              />
              <Button
                onClick={handleSubmitReview}
                className="bg-pink-500 hover:bg-pink-600 text-white"
                disabled={!newReview.trim() || userRating === 0}
              >
                Submit Review
              </Button>
            </div> */}

            <Separator />

            {/* Reviews List */}
            {/* <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-800">
                        {review.user}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 ml-12">{review.comment}</p>
                </div>
              ))}
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
