import db from '../db/models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { col, fn } from 'sequelize'
import role from '../db/models/role.js'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { asyncHandler } from '../middleware/errorHandler.js'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const { User, Order } = db

const createToken  = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bookshop/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      { quality: 'auto', fetch_format: 'auto' }
    ],
    public_id: (req, file) => {
      // Create unique filename with user ID and timestamp
      return `avatar-${req.user.id}-${Date.now()}`;
    }
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

export const uploadAvatar = upload.single('avatar');

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid password" });
    } else {
        return res.status(200).json({ success: true, message: "Login successful", token: createToken(user.id) });
    }
});

export const register = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, phone_number } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUserEmail = await User.findOne({ where: { email } });
    const existingUserPhone = await User.findOne({ where: { phone_number } });
    if (existingUserEmail || existingUserPhone) {
        return res.status(409).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email!"})
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ first_name, last_name, email, password: hashedPassword, phone_number, role_id: 2 });
    const token = createToken(newUser.id);
    res.status(201).json({ success: true, message: "User registered successfully", token });
});

// controllers/userController.js

export const getUserData = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const user = await User.findByPk(userId)
  
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" })
  }

  const totalOrders = await Order.count({ where: { user_id: userId } })

  const totalSpentResult = await Order.findAll({
    where: { user_id: userId },
    attributes: [[fn("SUM", col("total_amount")), "totalSpent"]],
    raw: true,
  })

  const totalSpent = parseFloat(totalSpentResult[0]?.totalSpent || 0)

  const userData = {
    fullName: `${user.first_name} ${user.last_name}`,
    email: user.email,
    phone_number: user.phone_number,
    avatar: user.avatar,
    joinDate: user.createdAt,
    totalOrders,
    totalSpent,
  }
  res.json({ success: true, data: userData })
});

export const getNumberOfCustomer = asyncHandler(async (req, res) => {
  const count = await User.count({
    where: {
      role_id: 2
    }
  });

  res.json({ success: true, data: { count } });
});

// Get all users (admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: db.Role,
        attributes: ['id', 'role']
      }
    ],
    attributes: { exclude: ['password'] }
  });
  
  res.status(200).json({ success: true, data: users });
});

// Get user by ID (admin)
export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: db.Role,
          attributes: ['id', 'role']
        }
      ],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message });
  }
}

// Create user (admin)
export async function createUser(req, res) {
  try {
    const { first_name, last_name, email, password, phone_number, role_id } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
      role_id: role_id || 2 // Default to customer role
    });

    // Return user without password
    const userResponse = await User.findByPk(newUser.id, {
      include: [
        {
          model: db.Role,
          attributes: ['id', 'role']
        }
      ],
      attributes: { exclude: ['password'] }
    });

    res.status(201).json({ success: true, data: userResponse, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
  }
}

// Update user (admin)
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // If password is being updated, hash it
    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    await user.update(updateData);

    // Return updated user without password
    const updatedUser = await User.findByPk(id, {
      include: [
        {
          model: db.Role,
          attributes: ['id', 'role']
        }
      ],
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({ success: true, data: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
  }
}

// Delete user (admin)
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user', error: error.message });
  }
}

// Upload avatar image to Cloudinary
export const uploadAvatarImage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided' });
  }

  // Get current user to check for existing avatar
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Delete old avatar from Cloudinary if it exists
  if (user.avatar && user.avatar.includes('cloudinary.com')) {
    try {
      // Extract public_id from Cloudinary URL
      const urlParts = user.avatar.split('/');
      const fileWithExtension = urlParts[urlParts.length - 1];
      const publicId = `bookshop/avatars/${fileWithExtension.split('.')[0]}`;
      await cloudinary.uploader.destroy(publicId);
    } catch (deleteError) {
      console.log('Error deleting old avatar from Cloudinary:', deleteError);
      // Continue with upload even if delete fails
    }
  }

  // Get the Cloudinary URL from the uploaded file
  const avatarUrl = req.file.path;

  // Update user's avatar in database
  await user.update({ avatar: avatarUrl });

  res.status(200).json({
    success: true,
    message: 'Avatar uploaded successfully',
    data: {
      avatar: avatarUrl
    }
  });
});

// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name, email, phone_number } = req.body;

  // Validate input
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ 
      success: false, 
      message: "First name, last name, and email are required" 
    });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Please enter a valid email" 
    });
  }

  // Check if user exists
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      message: "User not found" 
    });
  }

  // Check if email is already taken by another user
  if (email !== user.email) {
    const existingUser = await User.findOne({ 
      where: { 
        email,
        id: { [db.Sequelize.Op.ne]: userId } // Exclude current user
      } 
    });
    
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: "Email is already in use by another account" 
      });
    }
  }

  // Check if phone number is already taken by another user (if provided)
  if (phone_number && phone_number !== user.phone_number) {
    const existingUserPhone = await User.findOne({ 
      where: { 
        phone_number,
        id: { [db.Sequelize.Op.ne]: userId } // Exclude current user
      } 
    });
    
    if (existingUserPhone) {
      return res.status(409).json({ 
        success: false, 
        message: "Phone number is already in use by another account" 
      });
    }
  }

  // Update user profile
  await user.update({
    first_name,
    last_name,
    email,
    phone_number
  });

  // Return updated user data (excluding password)
  const updatedUser = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser
  });
});