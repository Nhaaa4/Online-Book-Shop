import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useShopContext } from "@/hooks/UseShopContext";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CartItems() {
  const { updateQuantity, removeFromCart, navigate, token, cartData, totalPrice } = useShopContext();
  

  const proceedToCheckout = () => {
    if (token) {
      navigate('/place-order')
    } else {
      toast('Please log in to proceed with checkout.', {
        description: <span className="text-gray-500">You need to be logged in to place an order.</span>,
      });
    }
  }

  if (cartData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center h-120">
        <ShoppingBag className="h-24 w-24 text-pink-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any books to your cart yet.</p>
        <Link to="/books">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">Continue Shopping</Button>
        </Link>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-pink-100">
              <CardHeader>
                <CardTitle>Your Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cartData.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex space-x-4">
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.title}
                          width={80}
                          height={120}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item?.Author?.first_name} {item?.Author?.last_name}</p>
                          <p className="text-lg font-bold text-pink-600 mb-3">${item.price}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 border-pink-200"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 border-pink-200"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      {index < cartData.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-pink-100 sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shpping Fee</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-pink-600">${totalPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={proceedToCheckout}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                <Link to="/books" className="block">
                  <Button variant="outline" className="w-full border-pink-200 hover:bg-pink-50 bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}