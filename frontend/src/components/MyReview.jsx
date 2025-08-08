import { useShopContext } from "@/hooks/UseShopContext";
import { reviewsAPI } from '../service/api';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText, MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function MyReview() {
  const { token } = useShopContext();
  const [userReviews, setUserReviews] = useState([]);

  const fetchUserReviews = async () => {
    try {
      const response = await reviewsAPI.getMyReviews();
      setUserReviews(response.data.data);
      console.log("User reviews fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserReviews();
    }
  }, [token]);

   const EmptyReviewsState = () => (
    <div className="text-center py-12">
      <FileText className="h-24 w-24 text-pink-300 mx-auto mb-6" />
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Reviews Yet</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You haven't written any reviews yet. Share your thoughts about the books you've read to help other readers!
      </p>
      <div className="space-y-4">
        <Link to="/books">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 mr-4">Find Books to Review</Button>
        </Link>
        <Link to="/">
          <Button variant="outline" className="border-pink-200 hover:bg-pink-50 bg-transparent px-8 py-3">
            Explore Homepage
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <Card className="border-pink-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-pink-600" />
          <span>My Reviews</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {userReviews.map((review) => (
            <div
              key={review.id}
              className="border border-pink-100 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.bookTitle}
                </h3>
                <span className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {review.rating} out of 5 stars
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
          {userReviews.length === 0 && <EmptyReviewsState />}
        </div>
      </CardContent>
    </Card>
  );
}
