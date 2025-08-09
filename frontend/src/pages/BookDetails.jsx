import { booksAPI, reviewsAPI } from "@/service/api";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Star, ShoppingCart, Heart, Share2, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [selectedImage, setSelectedImage] = useState(""); // Add this for main image
  const { addToCart, setIsLoading } = useShopContext();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Get all images inline to avoid dependency issues
      let allImages = [];
      if (book.images && Array.isArray(book.images)) {
        allImages = [...book.images];
      }
      if (book.image_url && !allImages.includes(book.image_url)) {
        allImages.unshift(book.image_url);
      }
      allImages = [...new Set(allImages)].filter(img => img && img.trim());
      
      if (allImages.length <= 1) return;

      const currentIndex = allImages.indexOf(selectedImage);
      
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
        setSelectedImage(allImages[prevIndex]);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        const nextIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(allImages[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, book.images, book.image_url]);

  const defaultDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    total: 0,
    percentage: 0
  }));

  const apiDistribution = book?.ratingDistribution || [];

  const mergedDistribution = defaultDistribution.map(defaultItem => {
    const match = apiDistribution.find(item => item.rating === defaultItem.rating);
    return match ? match : defaultItem;
  });



  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  const fetchBook = useCallback(async () => {
    try {
      const response = await booksAPI.getById(id);
      if (!response.data.success) {
        toast.error(response.data.message || 'Failed to fetch book details');
        return;
      }
      const bookData = response.data.data;
      setBook(bookData);
      
      // Set initial selected image (prioritize images array, fallback to image_url)
      if (bookData.images && Array.isArray(bookData.images) && bookData.images.length > 0) {
        setSelectedImage(bookData.images[0]);
      } else if (bookData.image_url) {
        setSelectedImage(bookData.image_url);
      } else {
        setSelectedImage("/placeholder.svg");
      }
    } catch (err) {
      console.error("Error fetching book details:", err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch book details. Please try again.';
      toast.error(errorMessage);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await reviewsAPI.getByBookId(id);
      if (response.data.success) {
        setReviews(response.data.data);
      } else {
        toast.error(response.data.message || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch reviews. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [id, setIsLoading]);

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id, fetchBook, fetchReviews]);

  const handleSubmitReview = async () => {
    if (!userReview.trim() || userRating === 0) {
      toast.error('Please provide both a rating and a comment');
      return;
    }

    try {
      const response = await reviewsAPI.create({
        bookId: id,
        rating: userRating,
        comment: userReview
      });

      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setUserRating(0);
        setUserReview("");
        fetchReviews();
        fetchBook();  
      } else {
        toast.error(response.data.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      const errorMessage = err.response?.data?.message || 'Failed to submit review. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2">
        {/* Book Image Gallery */}
        <div className="space-y-4">
          {/* Image Gallery Layout */}
          <div className="flex justify-center items-center">
            <div className="flex gap-4 items-start">
              {/* Thumbnail Gallery - Left Side */}
              {(() => {
                // Get all available images
                let allImages = [];
                
                // Add images from images array
                if (book.images && Array.isArray(book.images)) {
                  allImages = [...book.images];
                }
                
                // Add image_url if it exists and is not already in the array
                if (book.image_url && !allImages.includes(book.image_url)) {
                  allImages.unshift(book.image_url); // Add to beginning
                }
                
                // Remove duplicates and filter out empty values
                allImages = [...new Set(allImages)].filter(img => img && img.trim());
                
                // Only show thumbnails if there are multiple images
                if (allImages.length > 1) {
                  return (
                    <div className="flex flex-col gap-2 pr-2">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(image)}
                          className={`flex-shrink-0 relative overflow-hidden rounded-md border-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${
                            selectedImage === image 
                              ? 'border-pink-500 shadow-lg ring-2 ring-pink-200' 
                              : 'border-gray-200 hover:border-pink-300'
                          }`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${book.title} - Image ${index + 1}`}
                            className="w-16 h-20 object-cover"
                          />
                          {/* Active indicator */}
                          {selectedImage === image && (
                            <div className="absolute inset-0 bg-pink-500/20"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  );
                }
                return null;
              })()}

              {/* Main Image */}
              <div className="max-w-96 relative overflow-hidden rounded-lg bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
                
                {/* Navigation Arrows */}
                {(() => {
                  let allImages = [];
                  if (book.images && Array.isArray(book.images)) {
                    allImages = [...book.images];
                  }
                  if (book.image_url && !allImages.includes(book.image_url)) {
                    allImages.unshift(book.image_url);
                  }
                  allImages = [...new Set(allImages)].filter(img => img && img.trim());
                  
                  if (allImages.length > 1) {
                    const currentIndex = allImages.indexOf(selectedImage);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
                    const nextIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
                    
                    return (
                      <>
                        {/* Previous Button */}
                        <button
                          onClick={() => setSelectedImage(allImages[prevIndex])}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        {/* Next Button */}
                        <button
                          onClick={() => setSelectedImage(allImages[nextIndex])}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    );
                  }
                  return null;
                })()}
                
                {/* Image number indicator */}
                {(() => {
                  let allImages = [];
                  if (book.images && Array.isArray(book.images)) {
                    allImages = [...book.images];
                  }
                  if (book.image_url && !allImages.includes(book.image_url)) {
                    allImages.unshift(book.image_url);
                  }
                  allImages = [...new Set(allImages)].filter(img => img && img.trim());
                  
                  if (allImages.length > 1) {
                    const currentIndex = allImages.indexOf(selectedImage) + 1;
                    return (
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                        {currentIndex} / {allImages.length}
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>

          {/* Keyboard navigation hint - Only show if multiple images */}
          {(() => {
            let allImages = [];
            if (book.images && Array.isArray(book.images)) {
              allImages = [...book.images];
            }
            if (book.image_url && !allImages.includes(book.image_url)) {
              allImages.unshift(book.image_url);
            }
            allImages = [...new Set(allImages)].filter(img => img && img.trim());
            
            if (allImages.length > 1) {
              return (
                <div className="flex justify-center">
                  <p className="text-xs text-gray-500 text-center">
                    Use ← → arrow keys to navigate images
                  </p>
                </div>
              );
            }
            return null;
          })()}
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
                    fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating)
                        ? "text-yellow-400"
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
                      fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{book.totalReviews} reviews</p>
              </div>
              <div className="space-y-2">
                {mergedDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{item.rating}★</span>
                    <Progress value={parseInt(item.percentage)} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-8">
                      {item.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Write Review */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Write a Review</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Your Rating:</span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill={i < userRating ? "currentColor" : "none"}
                    className={`h-5 w-5 cursor-pointer ${
                      i < userRating
                        ? "text-yellow-400"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                    onClick={() => setUserRating(i + 1)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Share your thoughts about this book..."
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                className="border-pink-200 focus:border-pink-400"
              />
              <Button
                onClick={handleSubmitReview}
                className="bg-pink-500 hover:bg-pink-600 text-white"
                disabled={!userReview.trim() || userRating === 0}
              >
                Submit Review
              </Button>
            </div>

            <Separator />

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-pink-200 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-12 w-12 ring-2 ring-pink-100">
                        <AvatarImage src={review.User.avatar || "/avatar.svg"} />
                        <AvatarFallback className="bg-pink-100 text-pink-600 font-medium text-lg">
                          {review.User.first_name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">
                          {review.User.first_name} {review.User.last_name}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                fill={i < review.rating ? "currentColor" : "none"}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-15">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-1">No reviews yet</h3>
                  <p className="text-sm text-gray-500">Be the first to review this book!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
