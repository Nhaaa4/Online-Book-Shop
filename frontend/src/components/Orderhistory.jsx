import { Package, ShoppingBag, CheckCircle, Truck, Clock, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useShopContext } from "@/hooks/UseShopContext";
import { useEffect, useState } from "react";
import { ordersAPI } from '../service/api';
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function OrderHistory() {
  const { token } = useShopContext();
  const [orderHistory, setOrderHistory] = useState([]);

  // Status styling function for modern appearance with icons
  const getStatusStyle = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200 hover:scale-105 shadow-sm flex items-center gap-1";
    
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          className: `${baseClasses} bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-200`,
          icon: <CheckCircle className="h-3 w-3" />
        };
      case "shipped":
        return {
          className: `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200`,
          icon: <Truck className="h-3 w-3" />
        };
      case "processing":
        return {
          className: `${baseClasses} bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-yellow-200`,
          icon: <Clock className="h-3 w-3" />
        };
      case "pending":
        return {
          className: `${baseClasses} bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-gray-200`,
          icon: <AlertCircle className="h-3 w-3" />
        };
      case "cancelled":
        return {
          className: `${baseClasses} bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200`,
          icon: <XCircle className="h-3 w-3" />
        };
      default:
        return {
          className: `${baseClasses} bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-200`,
          icon: <Package className="h-3 w-3" />
        };
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await ordersAPI.getHistory();
      setOrderHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrderHistory();
    }
  }, [token])

  const EmptyOrdersState = () => (
    <div className="text-center py-12">
      <ShoppingBag className="h-24 w-24 text-pink-300 mx-auto mb-6" />
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Orders Yet</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You haven't placed any orders yet. Start exploring our amazing collection of books and place your first order!
      </p>
      <Link to="/books">
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3">Browse Books</Button>
      </Link>
    </div>
  )

  return (
    <Card className="border-pink-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-pink-600" />
          <span>Order History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orderHistory.map((order) => (
            <div
              key={order.id}
              className="border border-pink-100 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order: ORD-{order.id}
                  </h3>
                  <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className={getStatusStyle(order.status).className}>
                    {getStatusStyle(order.status).icon}
                    {order.status}
                  </div>
                  <p className="text-xl font-bold text-pink-600 mt-2">
                    ${order?.total}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Items:</h4>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-600">by {item.author}</p>
                    </div>
                    <span className="font-medium text-gray-800">
                      ${item?.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {orderHistory.length === 0 && <EmptyOrdersState />}
        </div>
      </CardContent>
    </Card>
  );
}
