import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useShopContext } from "@/hooks/UseShopContext";

export default function Authentication() {
  const { token, setToken, backendUrl, navigate } = useShopContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentState, setCurrentState] = useState("register"); 
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentState == "login") {
      try {
        setIsLoading(true);
        const success = await axios.post(
          backendUrl + "/api/users/login",
          { email, password }
        );

        if (success) {
          toast("Login successful", {
            description: <span className="text-gray-500">Welcome back to BookShop!</span>,
          });
          setToken(success.data.token);
          localStorage.setItem("token", success.data.token);
          navigate('/')
        } 
      } catch (error) {
        console.error("Login error:", error);
        toast("Login failed", {
          description: <span className="text-gray-500">{error.response?.data?.message}</span> || <span className="text-gray-500">An error occurred during login.</span>,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      if (formData.password !== confirmPassword) {
        toast("Passwords do not match", {
          description: <span className="text-gray-500">Please make sure your passwords match.</span>,
        });
        return;
      }
      try {
        setIsLoading(true);
        const response = await axios.post(backendUrl + "/api/users/register", {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          password: formData.password,
        });

        if (response) {
          toast("Registration successful", {
            description: <span className="text-gray-500">Welcome to BookShop!</span>,
          });
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate('/');
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast("Registration failed", {
          description: <span className="text-gray-500">{error.response?.data?.message}</span> || <span className="text-gray-500">An error occurred during registration.</span>,
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-pink-600">
            BookShop
          </Link>
          <p className="text-gray-600 mt-2">
            Welcome back to your reading journey
          </p>
        </div>

        {(currentState === 'login') ? (
        <Card className="border-pink-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-800">
              Log In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-pink-200 focus:border-pink-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-pink-200 focus:border-pink-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-pink-600 hover:text-pink-700"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "logging in..." : "Log In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center items-center gap-4">
            <div className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
            </div>
            <div
              onClick={() => setCurrentState("register")}
              className="text-pink-600 hover:text-pink-700 font-medium cursor-pointer"
            >
              Sign up
            </div>
          </CardFooter>
        </Card>
        ) : (
        <Card className="border-pink-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-800">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-pink-200 focus:border-pink-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="phoneNumber"
                  placeholder="0987654321"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="border-pink-200 focus:border-pink-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="border-pink-200 focus:border-pink-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="border-pink-200 focus:border-pink-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  className="border-pink-300 data-[state=checked]:bg-pink-500"
                />
                <Label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms" className="text-pink-600 hover:text-pink-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-pink-600 hover:text-pink-700">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
            </div>
            <div onClick={() => setCurrentState('login')} className="text-pink-600 hover:text-pink-700 font-medium">
              Log in
            </div>
          </CardFooter>
        </Card>
        )}
      </div>
    </div>
  );
}
