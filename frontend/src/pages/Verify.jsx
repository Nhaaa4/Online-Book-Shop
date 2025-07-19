import { useShopContext } from "@/hooks/UseShopContext";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Verify() {
  const { navigate, token, setCartItems, backendUrl } = useShopContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + `/api/orders/verify-payment?orderId=${orderId}&success=${success}`, {}, { headers: { token } })
      if (response.data.success) {
        toast("Payment verified successfully!", {
          description: <span className="text-gray-500">Your payment has been successfully verified.</span>,
        });
        setCartItems({});
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
  };

  useEffect(() => {
    verifyPayment();
  }, [token, orderId, success, navigate, setCartItems, backendUrl]);

  return <div></div>;
}
