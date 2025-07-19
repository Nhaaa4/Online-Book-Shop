import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useShopContext } from "@/hooks/UseShopContext";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { CreditCard, Shield, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PlaceOrder() {
  const { navigate, isLoading, setIsLoading, backendUrl, token, totalPrice, cartItems, setCartItems } = useShopContext();
  const [method, setMethod] = useState('stripe');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    village: '',
    commune: '',
    district: '',
    province: '',
  });
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [communes, setCommunes] = useState([])
  const [villages, setVillages] = useState([])

  const [selected, setSelected] = useState({
    provinceId: "",
    districtId: "",
    communeId: "",
    villageId: null
  }); 

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/address/provinces');
        setProvinces(response.data.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, [])

  const onProvinceChange = async (value) => {
    const provinceId = value
    setSelected(prev => ({ ...prev, provinceId, districtId: "", communeId: "", villageId: "" }))
    const res = await axios.get(backendUrl + `/api/address/districts?province_id=${provinceId}`)
    setDistricts(res.data.data)
    setCommunes([])
    setVillages([])
  }

  const onDistrictChange = async (value) => {
    setSelected((prev) => ({ ...prev, districtId: value, communeId: "", villageId: "" }))
    const res = await axios.get(backendUrl + `/api/address/communes?district_id=${value}`)
    setCommunes(res.data.data)
    setVillages([])
  }

  const onCommuneChange = async (value) => {
    setSelected((prev) => ({ ...prev, communeId: value, villageId: "" }))
    const res = await axios.get(backendUrl + `/api/address/villages?commune_id=${value}`)
    setVillages(res.data.data)
  }

  const onVillageChange = (value) => {
    setSelected((prev) => ({ ...prev, villageId: value }))
  }

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(backendUrl + '/api/address/user', { headers: { token } });
      setShippingInfo({
        firstName: response.data.data.first_name || '',
        lastName: response.data.data.last_name || '',
        email: response.data.data.email || '',
        phoneNumber: response.data.data.phone_number || '',
        village: response.data.data.village || '',
        commune: response.data.data.commune || '',
        district: response.data.data.district || '',
        province: response.data.data.province || '',
      });
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  const handlePlaceOrder = async () => {
    if (!token) {
      toast('Please log in to place an order.', {
        description: <span className="text-gray-500">You need to be logged in to place an order.</span>,
        action: {
          label: 'Login',
          onClick: () => navigate('/authentication'),
        },
      })
      return;
    }

    try {
      setIsLoading(true);
      switch (method) {
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/orders/place-order', {items: cartItems, totalAmount: totalPrice, village_id: selected.villageId}, { headers: { token } });
          if (response.data.success) {
            toast('Order placed successfully!', {
              description: <span className="text-gray-500">Your order has been placed successfully.</span>,
            });
            setCartItems({});
            navigate('/profile?tab=orders');
          } else {
            toast('Failed to place order. Please try again.');
          }
        break;
        }
        case 'stripe': {
          const response = await axios.post(backendUrl + '/api/orders/place-order-stripe', {items: cartItems, totalAmount: totalPrice, village_id: selected.villageId}, { headers: { token } });
          if (response.data.success) {
            const { session_url } = response.data
            window.location.replace(session_url)
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast(error.response?.data?.message || 'An error occurred while placing the order.', {
        description: <span className="text-gray-500">Please try again later.</span>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card className="border-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-pink-600" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        required
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, email: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      required
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={shippingInfo.phoneNumber}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      required
                      disabled
                    />
                  </div>
                  {(shippingInfo.village) ? (
                  <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <Input
                        id="province"
                        value={shippingInfo.province}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, province: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        required
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        value={shippingInfo.district}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, district: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commune">Commune</Label>
                      <Input
                        id="commune"
                        value={shippingInfo.commune}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, commune: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        required
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="village">Village</Label>
                      <Input
                        id="village"
                        value={shippingInfo.village}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, village: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        required
                        disabled
                      />
                    </div>
                  </div>
                  </>
                  ) : (
                  <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <Select onValueChange={onProvinceChange} value={selected.provinceId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((p) => (
                            <SelectItem key={p.id} value={p.id.toString()}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Select
                        onValueChange={onDistrictChange}
                        value={selected.districtId}
                        disabled={!districts.length}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((d) => (
                            <SelectItem key={d.id} value={d.id.toString()}>
                              {d.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commune">Commune</Label>
                      <Select
                        onValueChange={onCommuneChange}
                        value={selected.communeId}
                        disabled={!communes.length}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Commune" />
                        </SelectTrigger>
                        <SelectContent>
                          {communes.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="village">Village</Label>
                      <Select
                        onValueChange={onVillageChange}
                        value={selected.villageId}
                        disabled={!villages.length}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Village" />
                        </SelectTrigger>
                        <SelectContent>
                          {villages.map((v) => (
                            <SelectItem key={v.id} value={v.id.toString()}>
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  </>
                  )}
                </form>
              </CardContent>
            </Card>

            </div>
            <div>
              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-pink-600" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3 flex-col lg:flex-row">
                    <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                      <img className="h-5 mx-4" src={"/stripe_logo.png"} alt="" />
                    </div>
                    <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                      <p className="text-gray-700 text-sm font-medium mx-4">Cash On Delivery</p>
                    </div>
                  </div>
                  <Separator/>
                  <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Shipping 
                    </span>
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

                <div className="bg-pink-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-pink-600" />
                    <span className="text-sm font-medium text-pink-700">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-pink-600">Your payment information is encrypted and secure.</p>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Place Order"}
                </Button>

                </CardContent>
              </Card>
           </div>
        </div>
    </div>
  )
}