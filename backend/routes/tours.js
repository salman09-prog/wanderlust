import express from "express";
import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

const router = express.Router();

// Get all tours
router.get("/", async (req, res) => {
    try {
        const tours = await Tour.find({});
        res.json(tours);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get single tour
router.get("/search/results", async (req, res) => {
    try {
        const { location, destination } = req.query;
        let query = {};

        // We'll search both name and location for a wider match
        const searchRegex = new RegExp(location || destination || "", "i");
        query.$or = [
            { location: searchRegex },
            { name: searchRegex }
        ];

        const tours = await Tour.find(query);
        res.json(tours);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const mongoose = await import("mongoose");
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Tour not found" });
        }
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ message: "Tour not found" });
        res.json(tour);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// Add review
router.post("/:id/reviews", async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;
        const review = await Review.create({
            tourId: req.params.id,
            userId,
            rating,
            comment
        });
        res.status(201).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get reviews
router.get("/:id/reviews", async (req, res) => {
    try {
        const mongoose = await import("mongoose");
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json([]);
        }
        const reviews = await Review.find({ tourId: req.params.id }).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
