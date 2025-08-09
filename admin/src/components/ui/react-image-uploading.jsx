import React from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Badge } from 'primereact/badge';
import { booksAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import './react-image-upload.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const SimpleImageUpload = ({ value = [], onChange, disabled = false, maxImages = 5 }) => {
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [dragActive, setDragActive] = React.useState(false);
  const fileUploadRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  const handleUpload = async (event) => {
    const files = event.files || Array.from(event.target?.files || []);
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    
    try {
      let uploadedUrls = [];

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 15, 90));
      }, 300);

      if (files.length === 1) {
        const response = await booksAPI.uploadImage(files[0]);
        if (response.data.success) {
          uploadedUrls = [response.data.data.image_url];
        }
      } else {
        const response = await booksAPI.uploadImages(files);
        if (response.data.success) {
          uploadedUrls = response.data.data.images.map(img => img.image_url);
        }
      }

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadedUrls.length > 0) {
        const existingUrls = value.filter(url => typeof url === 'string');
        const allUrls = [...existingUrls, ...uploadedUrls].slice(0, maxImages);
        onChange(allUrls);
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
        
        // Clear file inputs
        if (fileUploadRef.current) fileUploadRef.current.clear();
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = value.filter((_, index) => index !== indexToRemove);
    onChange(updatedImages);
    toast.success('✨ Image removed successfully');
  };

  const remainingSlots = maxImages - value.length;
  const isMaxReached = remainingSlots === 0;

  return (
    <div className="space-y-6">
      {/* Modern Upload Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Upload Header */}
        <div className={`bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-dashed border-blue-300 hover:border-blue-400 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg group ${dragActive ? 'drag-active border-blue-500 bg-blue-100' : ''}`}
             onClick={() => fileInputRef.current?.click()}
             onDragEnter={() => setDragActive(true)}
             onDragLeave={() => setDragActive(false)}
             onDragOver={(e) => e.preventDefault()}
             onDrop={(e) => {
               e.preventDefault();
               setDragActive(false);
               const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
               if (files.length > 0) {
                 handleUpload({ files });
               }
             }}>
          
          <div className="flex flex-col items-center space-y-6">
            {/* Upload Icon with Animation */}
            <div className="relative float-animation">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl transition-transform duration-300 ${uploading ? 'animate-pulse scale-110' : 'group-hover:scale-105'}`}>
                <i className={`pi ${uploading ? 'pi-spin pi-spinner' : 'pi-cloud-upload'} text-white text-3xl`}></i>
              </div>
              {value.length > 0 && (
                <div className="absolute -top-2 -right-2">
                  <Badge value={value.length} severity="success" className="pulse-glow"></Badge>
                </div>
              )}
            </div>

            {/* Header Text */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {uploading ? 'Uploading Images...' : 'Upload Your Images'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {uploading 
                  ? 'Please wait while we process your images' 
                  : 'Drag and drop your images here or click to browse files'
                }
              </p>
            </div>

            {/* Progress Bar */}
            {uploading && (
              <div className="w-full max-w-md space-y-2">
                <ProgressBar 
                  value={uploadProgress} 
                  className="h-3 bg-gray-200 rounded-full overflow-hidden shimmer-progress"
                />
                <p className="text-sm text-blue-600 font-medium">{uploadProgress}% Complete</p>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center text-gray-600">
                <i className="pi pi-images mr-2 text-blue-500"></i>
                <span className="font-medium">{value.length} / {maxImages}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <i className="pi pi-clock mr-2 text-green-500"></i>
                <span className="font-medium">{remainingSlots} remaining</span>
              </div>
              <div className="flex items-center text-gray-600">
                <i className="pi pi-file mr-2 text-purple-500"></i>
                <span className="font-medium">Max 5MB each</span>
              </div>
            </div>

            {/* Upload Button */}
            <div className="space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />

              {/* Supported formats */}
              <div className="flex justify-center space-x-2">
                {['JPG', 'PNG', 'GIF', 'WEBP'].map((format) => (
                  <Tag 
                    key={format} 
                    value={format} 
                    className="bg-gray-100 text-gray-600 text-xs border-gray-200"
                  />
                ))}
              </div>
            </div>

            {isMaxReached && (
              <div className="flex items-center justify-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <i className="pi pi-exclamation-triangle text-amber-500 mr-2"></i>
                <span className="text-amber-700 font-medium">Maximum upload limit reached</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern Image Gallery */}
      {value.length > 0 && (
        <div className="space-y-6">
          
          {/* Scrollable Image Grid */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {value.map((imageUrl, index) => (
                <div key={index} className="group relative image-grid-item image-upload-container">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-blue-300">
                    {/* Image Container */}
                    <div className="relative w-full h-full">
                      <img 
                        src={imageUrl} 
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.border = '2px dashed #cbd5e1';
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      
                      {/* Action Buttons Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex space-x-3">
                          <Button
                            icon="pi pi-trash"
                            className="p-button-rounded bg-red-500/80 hover:bg-red-600/90 border-0 text-white backdrop-blur-sm w-12 h-12 shadow-lg"
                            onClick={() => removeImage(index)}
                            disabled={disabled || uploading}
                            tooltip="Remove"
                            tooltipOptions={{ position: 'top' }}
                          />
                        </div>
                      </div>
                      
                      {/* Status Indicator */}
                      <div className="absolute top-3 right-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Info Footer */}
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-700">Image {index + 1}</p>
                    <p className="text-xs text-gray-500">Ready for upload</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleImageUpload;
