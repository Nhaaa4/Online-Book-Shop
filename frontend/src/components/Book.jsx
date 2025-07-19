import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

export default function Book({ book }) {
  return (
    <Card
      key={book.id}
      className="group hover:shadow-lg transition-shadow border-pink-100 py-0 gap-0"
    >
      <CardContent className="p-4 pb-2">
        <Link to={`/books/${book.id}`}>
          <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-lg">
            <img
              src={book.image_url || "/placeholder.svg"}
              alt={book.title}
              fill
              className="h-full w-full group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>
        <Link to={`/books/${book.id}`}>
          <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">
          {book.Author.first_name} {book.Author.last_name}
        </p>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(book.averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({book.totalReviews})
          </span>
        </div>
        <Badge variant="secondary" className="mb-2 bg-pink-100 text-pink-700">
          {book.Category.category_name}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xl font-bold text-pink-500">${book.price}</span>
      </CardFooter>
    </Card>
  );
}
