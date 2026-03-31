import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "wanderlust123", {
      expiresIn: "30d",
    });

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        wanderlustPoints: user.wanderlustPoints,
        loyaltyTier: user.loyaltyTier
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Initialize points for old users
    if (user.wanderlustPoints == null) {
      user.wanderlustPoints = 500;
      user.loyaltyTier = 'Explorer';
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "wanderlust123", {
      expiresIn: "30d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        wanderlustPoints: user.wanderlustPoints,
        loyaltyTier: user.loyaltyTier
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* TOGGLE WISHLIST */
router.post("/wishlist/toggle", async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "wanderlust123");
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { tourId } = req.body;
      if (!user.wishlist) {
         user.wishlist = [];
      }
      
      const index = user.wishlist.indexOf(tourId);
      if (index === -1) {
         user.wishlist.push(tourId); // add to wishlist
      } else {
         user.wishlist.splice(index, 1); // remove from wishlist
      }
      await user.save();
      
      res.json({ wishlist: user.wishlist });
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
});

/* GET CURRENT USER */
router.get("/me", async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "wanderlust123");
      let user = await User.findById(decoded.id).select("-password");
      
      if (user && user.wanderlustPoints == null) {
        user.wanderlustPoints = 500;
        user.loyaltyTier = 'Explorer';
        await user.save();
      }

      res.json(user);
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
});

/* UPDATE PROFILE */
router.put("/profile", async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({ message: "Not authorized" });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "wanderlust123");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, currentPassword, newPassword } = req.body;

    // Validate email uniqueness if changed
    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email already in use" });
      user.email = email;
    }

    if (name) user.name = name;

    // Password change
    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: "Current password required" });
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) return res.status(400).json({ message: "Current password is incorrect" });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        wanderlustPoints: user.wanderlustPoints,
        loyaltyTier: user.loyaltyTier,
        wishlist: user.wishlist,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
