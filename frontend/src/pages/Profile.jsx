import MyReview from "@/components/MyReview";
import OrderHistory from "@/components/Orderhistory";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useShopContext } from "@/hooks/UseShopContext";
import { authAPI } from '../service/api';
import { MessageSquare, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Profile() {
  const { token } = useShopContext()
  const [userData, setUserData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "orders"; // default tab

  const handleTabChange = (tab) => {
    searchParams.set("tab", tab);
    setSearchParams(searchParams);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await authAPI.getProfile();
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    }
  }, [token])

  return (
    <div className="container mx-2 lg:mx-auto px-4 py-8 grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Profile Header */}
        <div className="mb-8 md:col-span-1">
          <Card className="border-pink-100">
            <CardContent className="p-4">
              <div className="flex flex-col justify-center items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={userData.avatar || "/avatar.svg"} />
                  <AvatarFallback className="text-2xl bg-pink-100 text-pink-600">
                    {userData?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center">
                  <h1 className="text-2xl xl:text-3xl font-bold text-gray-800 mb-2">{userData.fullName}</h1>
                  <p className="text-sm xl:text-md text-gray-600 mb-3">{userData.email}</p>
                  <Badge className="bg-pink-100 text-pink-700">Member since {new Date(userData.joinDate).toLocaleDateString()}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-xl xl:text-2xl font-bold text-pink-600">{userData.totalOrders}</div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                  <div>
                    <div className="text-xl xl:text-2xl font-bold text-pink-600">${userData.totalSpent}</div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <nav className="space-y-2 flex flex-col xl:flex-row justify-center gap-4">
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className={` ${
                    activeTab === "orders"
                      ? "bg-pink-500 hover:bg-pink-600 text-white"
                      : "hover:bg-pink-50 text-gray-700"
                  }`}
                  onClick={() => handleTabChange("orders")}
                >
                  <Package className="h-4 w-4 mr-3" />
                  My Orders
                </Button>
                <Button
                  variant={activeTab === "reviews" ? "default" : "ghost"}
                  className={`${
                    activeTab === "reviews"
                      ? "bg-pink-500 hover:bg-pink-600 text-white"
                      : "hover:bg-pink-50 text-gray-700"
                  }`}
                  onClick={() => handleTabChange("reviews")}
                >
                  <MessageSquare className="h-4 w-4 mr-3" />
                  My Reviews
                </Button>
              </nav>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          {activeTab === "orders" && (<OrderHistory />)}
          {activeTab === "reviews" && (<MyReview />)}
        </div>
    </div>
  )
}