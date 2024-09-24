const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = require("../routes");



const signup = async (req, res) => {
    const { profileImage, username, email, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ success: false, message: "user already created!... Please login" });
        }
        const securePassword = await bcrypt.hash(password, 10);
        user = await User.create({ profileImage, username, email, password: securePassword });
        await user.save();
        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "not creaate a new account" });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({
            username
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "this account is not verified"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "invalid cradentials"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",

        })
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
        return res.status(200).json({
            success: true,
            message: "Login successfull",
            
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const checkAuth = async (req, res) => {
    console.log("req.id:", req.id); // Add this for debugging
    if (!req.id) {
      return res.status(401).json({ success: false, message: "Unauthorized, missing id" });
    }
  
    try {
      const user = await User.findById(req.id).select("-password");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
const logout = (req, res) => {
    try {
        // Clear the token cookie by setting its expiration date to a past date
        res.cookie("token", "", {
            expires: new Date(0), // Set the expiration date to a date in the past
            httpOnly: true,
            sameSite: 'None',
            secure: true, // Use secure if your application is running over HTTPS
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { signup, login, checkAuth, logout };