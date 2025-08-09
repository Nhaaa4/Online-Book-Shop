import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'book-covers', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      {
        width: 500,
        height: 750,
        crop: 'fill',
        quality: 'auto'
        // Removed format: 'webp' to let browser handle the original format
      }
    ],
    public_id: (req, file) => {
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return `book-${uniqueSuffix}`;
    }
  },
});

// Configure multer with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 5, // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Helper function to delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

// Helper function to extract public_id from Cloudinary URL
const extractPublicId = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return null;
  }
  
  try {
    // Extract public_id from Cloudinary URL
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.extension
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    
    if (uploadIndex === -1) return null;
    
    // Get everything after 'upload' and version (if present)
    let pathAfterUpload = urlParts.slice(uploadIndex + 1);
    
    // Remove version if present (starts with 'v' followed by numbers)
    if (pathAfterUpload[0] && pathAfterUpload[0].match(/^v\d+$/)) {
      pathAfterUpload = pathAfterUpload.slice(1);
    }
    
    // Join the remaining parts and remove file extension
    const publicIdWithExtension = pathAfterUpload.join('/');
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
};

export {
  cloudinary,
  upload,
  deleteImage,
  extractPublicId
};
