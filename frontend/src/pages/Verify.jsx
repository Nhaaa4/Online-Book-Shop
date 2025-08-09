import { useShopContext } from "@/hooks/UseShopContext";
import { ordersAPI } from '../service/api';
import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Verify() {
  const { navigate, token, setCartItems } = useShopContext();
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = useCallback(async () => {
    try {
      if (!token) {
        return null
      }
      const response = await ordersAPI.verifyPayment(orderId, success)
      if (response.data.success) {
        toast("Payment verified successfully!", {
          description: <span className="text-gray-500">Your payment has been successfully verified.</span>,
        });
        setCartItems({});
        localStorage.removeItem('bookshop_cart');
        navigate("/profile?tab=orders");
      } else {
        toast("Payment verification failed.", {
          description: <span className="text-gray-500">There was an issue verifying your payment. Please try again later.</span>,
        });
        navigate('/cart')
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast("Payment verification failed. Please try again.", {
        description: <span className="text-gray-500">There was an issue verifying your payment. Please try again later.</span>,
      });
    }
  }, [token, orderId, success, setCartItems, navigate]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return <div></div>;
}
