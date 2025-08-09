import MyReview from "@/components/MyReview";
import OrderHistory from "@/components/Orderhistory";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShopContext } from "@/hooks/UseShopContext";
import { authAPI, addressAPI } from '../service/api';
import { MessageSquare, Package, Camera, Upload, X, Edit3, User, Mail, Phone, Save, Info, MapPin } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Profile() {
  const { token } = useShopContext()
  const [userData, setUserData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "orders"; // default tab
  
  // Image upload states
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Edit profile states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });

  // Address states
  const [userAddress, setUserAddress] = useState({});
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isAddressUpdating, setIsAddressUpdating] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const handleTabChange = (tab) => {
    searchParams.set("tab", tab);
    setSearchParams(searchParams);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', selectedImage);
      
      // You'll need to implement this API endpoint
      const response = await authAPI.updateProfileImage(formData);
      
      if (response.data.success) {
        setUserData(prev => ({
          ...prev,
          avatar: response.data.data.avatar
        }));
        setIsImageDialogOpen(false);
        setSelectedImage(null);
        setImagePreview(null);
        toast.success('Profile image updated successfully!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await authAPI.getProfile();
      setUserData(response.data.data);
      
      // Populate edit form with current data
      const names = response.data.data.fullName?.split(' ') || ['', ''];
      setEditFormData({
        first_name: names[0] || '',
        last_name: names.slice(1).join(' ') || '',
        email: response.data.data.email || '',
        phone_number: response.data.data.phone_number || ''
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const response = await addressAPI.getUserAddress();
      setUserAddress(response.data.data);
    } catch (error) {
      console.error('Error fetching user address:', error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await addressAPI.getProvinces();
      setProvinces(response.data.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const handleProvinceChange = async (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict('');
    setSelectedCommune('');
    setSelectedVillage('');
    setDistricts([]);
    setCommunes([]);
    setVillages([]);

    if (provinceId) {
      try {
        const response = await addressAPI.getDistricts(provinceId);
        setDistricts(response.data.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    }
  };

  const handleDistrictChange = async (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedCommune('');
    setSelectedVillage('');
    setCommunes([]);
    setVillages([]);

    if (districtId) {
      try {
        const response = await addressAPI.getCommunes(districtId);
        setCommunes(response.data.data);
      } catch (error) {
        console.error('Error fetching communes:', error);
      }
    }
  };

  const handleCommuneChange = async (communeId) => {
    setSelectedCommune(communeId);
    setSelectedVillage('');
    setVillages([]);

    if (communeId) {
      try {
        const response = await addressAPI.getVillages(communeId);
        setVillages(response.data.data);
      } catch (error) {
        console.error('Error fetching villages:', error);
      }
    }
  };

  const handleVillageChange = (villageId) => {
    setSelectedVillage(villageId);
  };

  const handleUpdateAddress = async () => {
    if (!selectedVillage) {
      toast.error('Please select a village');
      return;
    }

    setIsAddressUpdating(true);
    try {
      const response = await addressAPI.updateUserAddress({
        village_id: selectedVillage
      });

      if (response.data.success) {
        toast.success('Address updated successfully!');
        setIsAddressDialogOpen(false);
        fetchUserAddress(); // Refresh address data
      } else {
        toast.error(response.data.message || 'Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update address. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsAddressUpdating(false);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditProfile = async () => {
    setIsUpdating(true);
    try {
      const response = await authAPI.updateProfile(editFormData);
      
      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setIsEditDialogOpen(false);
        // Refresh user data
        fetchUserInfo();
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserInfo();
      fetchUserAddress();
    }
  }, [token])

  useEffect(() => {
    if (isAddressDialogOpen) {
      fetchProvinces();
    }
  }, [isAddressDialogOpen])

  return (
    <div className="container mx-2 lg:mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side - Profile Information */}
        <div className="lg:col-span-1">
          <Card className="border-pink-100 sticky top-4">
            <CardContent className="p-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative group mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userData.avatar || "/avatar.svg"} />
                    <AvatarFallback className="text-3xl bg-pink-100 text-pink-600">
                      {userData?.fullName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Image Upload Overlay */}
                  <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                    <DialogTrigger asChild>
                      <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Edit3 className="h-5 w-5 text-pink-600" />
                          Update Profile Picture
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {/* Image Preview */}
                        <div className="flex justify-center">
                          <div className="relative">
                            <Avatar className="w-32 h-32">
                              <AvatarImage src={imagePreview || userData.avatar || "/avatar.svg"} />
                              <AvatarFallback className="text-4xl bg-pink-100 text-pink-600">
                                {userData?.fullName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {selectedImage && (
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                onClick={removeSelectedImage}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* File Input */}
                        <div className="space-y-2">
                          <Label htmlFor="avatar-upload">Choose new image</Label>
                          <Input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            ref={fileInputRef}
                            className="cursor-pointer"
                          />
                          <p className="text-xs text-gray-500">
                            Supported formats: JPG, PNG, GIF. Max size: 5MB
                          </p>
                        </div>

                        {/* Upload Button */}
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsImageDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                            onClick={uploadProfileImage}
                            disabled={!selectedImage || isUploading}
                          >
                            {isUploading ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Uploading...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                Update
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* User Name with Edit Button */}
                <div className="flex items-center gap-2 mb-4">
                  <h1 className="text-2xl font-bold text-gray-800">{userData.fullName}</h1>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-pink-50">
                        <Edit3 className="h-4 w-4 text-pink-600" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-pink-600" />
                          Edit Profile
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {/* First Name */}
                        <div className="space-y-2">
                          <Label htmlFor="first_name">First Name</Label>
                          <Input
                            id="first_name"
                            name="first_name"
                            value={editFormData.first_name}
                            onChange={handleEditFormChange}
                            placeholder="Enter your first name"
                          />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input
                            id="last_name"
                            name="last_name"
                            value={editFormData.last_name}
                            onChange={handleEditFormChange}
                            placeholder="Enter your last name"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={editFormData.email}
                              onChange={handleEditFormChange}
                              placeholder="Enter your email"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                          <Label htmlFor="phone_number">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone_number"
                              name="phone_number"
                              value={editFormData.phone_number}
                              onChange={handleEditFormChange}
                              placeholder="Enter your phone number"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsEditDialogOpen(false)}
                            disabled={isUpdating}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                            onClick={handleEditProfile}
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Updating...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Save Changes
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <Badge className="bg-pink-100 text-pink-700 mb-4">
                  Member since {new Date(userData.joinDate).toLocaleDateString()}
                </Badge>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Email</div>
                    <div className="text-sm text-gray-800">{userData.email}</div>
                  </div>
                </div>
                {userData.phone_number && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-pink-600" />
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Phone</div>
                      <div className="text-sm text-gray-800">{userData.phone_number}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Tabs Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            {/* Tabs Navigation */}
            <div className="flex justify-start mb-6">
              <TabsList className="bg-gray-100/80 backdrop-blur-sm border border-gray-200/50 h-14 p-1 rounded-xl">
                <TabsTrigger 
                  value="orders" 
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg h-12 px-6 text-base font-medium rounded-lg transition-all duration-200"
                >
                  <Package className="h-5 w-5 mr-3" />
                  My Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg h-12 px-6 text-base font-medium rounded-lg transition-all duration-200"
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  My Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="information"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg h-12 px-6 text-base font-medium rounded-lg transition-all duration-200"
                >
                  <Info className="h-5 w-5 mr-3" />
                  Information
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <TabsContent value="orders" className="mt-0">
              <OrderHistory />
            </TabsContent>
            <TabsContent value="reviews" className="mt-0">
              <MyReview />
            </TabsContent>
            <TabsContent value="information" className="mt-0">
              <div className="space-y-6">
                {/* Personal Information Card */}
                <Card className="border-pink-100">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-pink-600" />
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          <p className="text-gray-800">{userData.fullName || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Email Address</Label>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          <p className="text-gray-800">{userData.email || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Phone Number</Label>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          <p className="text-gray-800">{userData.phone_number || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Member Since</Label>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          <p className="text-gray-800">
                            {userData.joinDate ? new Date(userData.joinDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 'Not available'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address Information Card */}
                <Card className="border-pink-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-pink-600" />
                        Address Information
                      </h3>
                      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-pink-50">
                            <Edit3 className="h-4 w-4 text-pink-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-pink-600" />
                              Update Address
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            {/* Province Selection */}
                            <div className="space-y-2">
                              <Label htmlFor="province">Province</Label>
                              <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select province" />
                                </SelectTrigger>
                                <SelectContent>
                                  {provinces.map((province) => (
                                    <SelectItem key={province.id} value={province.id.toString()}>
                                      {province.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* District Selection */}
                            <div className="space-y-2">
                              <Label htmlFor="district">District</Label>
                              <Select 
                                value={selectedDistrict} 
                                onValueChange={handleDistrictChange}
                                disabled={!selectedProvince}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select district" />
                                </SelectTrigger>
                                <SelectContent>
                                  {districts.map((district) => (
                                    <SelectItem key={district.id} value={district.id.toString()}>
                                      {district.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Commune Selection */}
                            <div className="space-y-2">
                              <Label htmlFor="commune">Commune</Label>
                              <Select 
                                value={selectedCommune} 
                                onValueChange={handleCommuneChange}
                                disabled={!selectedDistrict}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select commune" />
                                </SelectTrigger>
                                <SelectContent>
                                  {communes.map((commune) => (
                                    <SelectItem key={commune.id} value={commune.id.toString()}>
                                      {commune.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Village Selection */}
                            <div className="space-y-2">
                              <Label htmlFor="village">Village</Label>
                              <Select 
                                value={selectedVillage} 
                                onValueChange={handleVillageChange}
                                disabled={!selectedCommune}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select village" />
                                </SelectTrigger>
                                <SelectContent>
                                  {villages.map((village) => (
                                    <SelectItem key={village.id} value={village.id.toString()}>
                                      {village.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsAddressDialogOpen(false)}
                                disabled={isAddressUpdating}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                onClick={handleUpdateAddress}
                                disabled={isAddressUpdating || !selectedVillage}
                              >
                                {isAddressUpdating ? (
                                  <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Updating...
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Update Address
                                  </div>
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="space-y-3">
                      {userAddress.province ? (
                        <>
                          <div className="p-3 bg-gray-50 rounded-lg border">
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Province</div>
                            <div className="text-sm text-gray-800">{userAddress.province}</div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">District</div>
                              <div className="text-sm text-gray-800">{userAddress.district}</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Commune</div>
                              <div className="text-sm text-gray-800">{userAddress.commune}</div>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg border">
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Village</div>
                            <div className="text-sm text-gray-800">{userAddress.village}</div>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 bg-gray-50 rounded-lg border border-dashed text-center">
                          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 mb-2">No address information provided</p>
                          <p className="text-sm text-gray-500">Click the edit button to add your address</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}