// Error handling middleware for the application
export const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);
  
  // Default error response
  let error = {
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error.message = 'File size too large. Maximum size allowed is 5MB';
    return res.status(400).json(error);
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error.message = 'Unexpected file field. Only avatar field is allowed';
    return res.status(400).json(error);
  }

  // Multer file type errors
  if (err.message === 'Only image files are allowed!') {
    error.message = 'Invalid file type. Only image files (JPG, PNG, GIF, WEBP) are allowed';
    return res.status(400).json(error);
  }

  // Cloudinary errors
  if (err.name === 'CloudinaryError') {
    error.message = 'Image upload failed. Please try again with a different image';
    return res.status(400).json(error);
  }

  // Database validation errors
  if (err.name === 'SequelizeValidationError') {
    error.message = 'Validation error';
    error.details = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(error);
  }

  // Database unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    error.message = 'Resource already exists';
    error.details = err.errors.map(e => ({
      field: e.path,
      message: `${e.path} already exists`
    }));
    return res.status(409).json(error);
  }

  // Database foreign key constraint errors
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error.message = 'Invalid reference to related resource';
    return res.status(400).json(error);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid authentication token';
    return res.status(401).json(error);
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Authentication token has expired';
    return res.status(401).json(error);
  }

  // Bcrypt errors
  if (err.message.includes('bcrypt')) {
    error.message = 'Password processing error';
    return res.status(500).json(error);
  }

  // Network/Connection errors
  if (err.code === 'ECONNREFUSED') {
    error.message = 'Database connection failed';
    return res.status(503).json(error);
  }

  // Default server errors
  const statusCode = err.statusCode || err.status || 500;
  
  // Don't expose internal server errors in production
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    error.message = 'Something went wrong. Please try again later';
  }

  res.status(statusCode).json(error);
};

// Async error wrapper to catch async errors
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler for routes that don't exist
export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};
