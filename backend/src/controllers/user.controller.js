import db from '../db/models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { col, fn } from 'sequelize'

const { User, Order } = db

const createToken  = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

export async function login(req, res) {
    try {
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
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }

}

export async function register(req, res) {
    const { first_name, last_name, email, password, phone_number } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
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
    
        const newUser = await User.create({ first_name, last_name, email, password: hashedPassword, phone_number });
        const token = createToken(newUser.id);
        res.status(201).json({ success: true, message: "User registered successfully", token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Registration failed", error: error.message });
    }
}

// controllers/userController.js

export const getUserData = async (req, res) => {
  try {
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
      joinDate: user.createdAt,
      totalOrders,
      totalSpent,
    }
    res.json({ success: true, data: userData })
  } catch (error) {
    console.error("Failed to fetch user data:", error)
    res.status(500).json({ success: false, message: "Failed to fetch user data", error: error.message })
  }
}