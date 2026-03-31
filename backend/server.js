import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import mongoose from "mongoose";
import Booking from "./models/Booking.js";
import Tour from "./models/Tour.js";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import tourRoutes from "./routes/tours.js";

dotenv.config();

const app = express();

/* =============================
   CONFIGURATION & MIDDLEWARE
============================= */
const PORT = 5000;
// Use environment variable for frontend URL, default to localhost for dev
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);

/* =============================
   MongoDB Connection
============================= */
const dbUrl = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wanderlust";

mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =============================
   CREATE CHECKOUT SESSION
============================= */

app.get("/", (req, res) => {
  res.send("Wanderlust API is running...");
});


app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { tourId, guests, userId, startDate, endDate, amount, applyPoints, itemName, itemImage } = req.body;

    let tour = null;
    if (mongoose.Types.ObjectId.isValid(tourId)) {
      tour = await Tour.findById(tourId);
    }

    let name = "Wanderlust Adventure";
    let image = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80";

    if (itemName) {
      name = itemName;
    } else if (tourId.startsWith("FLIGHT-")) {
      name = `Flight Booking (${tourId})`;
      image = "https://images.unsplash.com/photo-1436491865332-7a615061c443?auto=format&fit=crop&q=80";
    } else if (tourId.startsWith("HOTEL-")) {
      name = `Hotel Booking (${tourId})`;
      image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80";
    } else if (tour) {
      name = tour.name;
      image = tour.image;
    }

    if (itemImage) image = itemImage;
    
    let totalPrice = amount;
    let discount = 0;
    let usedPoints = 0;
    const earnedPoints = Math.floor(totalPrice * 0.05);

    if (applyPoints && userId) {
      const user = await User.findById(userId);
      if (user && user.wanderlustPoints > 0) {
        const maxDiscount = Math.floor(totalPrice * 0.5);
        usedPoints = Math.min(user.wanderlustPoints, maxDiscount);
        discount = usedPoints; 
      }
    }

    const finalAmountPerGuest = (totalPrice - discount) / guests;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: name,
              images: [image],
              description: discount > 0 ? `Includes ₹${discount} Wanderlust Rewards discount` : undefined
            },
            unit_amount: Math.round(finalAmountPerGuest * 100),
          },
          quantity: guests,
        },
      ],
      mode: "payment",
      metadata: {
        userId: userId.toString(),
        tourId: tourId.toString(),
        guests: guests.toString(),
        startDate: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : new Date().toISOString(),
        usedPoints: usedPoints.toString(),
        earnedPoints: earnedPoints.toString(),
        itemName: itemName || name
      },
      // Dynamic URLs for production
      success_url: `${FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

/* =============================
   SAVE BOOKING AFTER SUCCESS
============================= */
app.post("/save-booking", async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const existing = await Booking.findOne({ sessionId });
    if (existing) return res.json({ success: true, message: "Already saved" });

    const metadataTourId = session.metadata.tourId;
    let tourId = undefined;
    let flightId = undefined;
    let hotelId = undefined;
    let hotelName = undefined;

    if (metadataTourId && mongoose.Types.ObjectId.isValid(metadataTourId)) {
      tourId = metadataTourId;
    } else if (metadataTourId && metadataTourId.startsWith("FLIGHT-")) {
      flightId = metadataTourId;
    } else if (metadataTourId && metadataTourId.startsWith("HOTEL-")) {
      hotelId = metadataTourId;
      hotelName = session.metadata.itemName || undefined;
    }

    await Booking.create({
      sessionId,
      userId: session.metadata.userId,
      tourId,
      flightId,
      hotelId,
      hotelName,
      guests: Number(session.metadata.guests),
      startDate: new Date(session.metadata.startDate),
      endDate: new Date(session.metadata.endDate),
      amount: session.amount_total / 100,
      email: session.customer_details?.email,
      status: 'paid'
    });

    const usedPoints = parseInt(session.metadata.usedPoints || "0");
    const earnedPoints = parseInt(session.metadata.earnedPoints || "0");
    const userId = session.metadata.userId;

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.wanderlustPoints = Math.max(0, user.wanderlustPoints - usedPoints + earnedPoints);
        if (user.wanderlustPoints >= 5000) user.loyaltyTier = 'Voyager';
        else if (user.wanderlustPoints >= 2000) user.loyaltyTier = 'Adventurer';
        else user.loyaltyTier = 'Explorer';
        await user.save();
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Save Booking Error:", err);
    res.status(500).json({ error: "Booking save failed" });
  }
});

/* =============================
   BOOKING RETRIEVAL
============================= */
app.get("/bookings/:userId", async(req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('tourId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('tourId')
      .populate('userId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/* =============================
   MOCK SEARCH APIS (FLIGHTS/HOTELS)
============================= */
app.get("/api/flights/search", (req, res) => {
  const { origin, destination, date } = req.query;
  if (!origin || !destination) return res.status(400).json({ error: "Origin and destination required" });

  const airlines = ["Air India", "IndiGo", "SpiceJet", "Vistara", "Akasa Air"];
  const flights = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => {
    const d = new Date(date || new Date());
    d.setHours(Math.floor(Math.random() * 14) + 6);
    const a = new Date(d);
    const durationHours = Math.floor(Math.random() * 3) + 2;
    a.setHours(d.getHours() + durationHours);
    
    return {
      id: `FL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      origin, destination,
      departureTime: d.toISOString(),
      arrivalTime: a.toISOString(),
      duration: `${durationHours}h`,
      price: Math.floor(Math.random() * 10000) + 3000
    };
  });

  res.json(flights.sort((a, b) => a.price - b.price));
});

app.get("/api/hotels/search", (req, res) => {
  const { destination } = req.query;
  if (!destination) return res.status(400).json({ error: "Destination required" });

  const hotelNames = ["Grand Palace", "Oceanview Resort", "City Center Stay", "Heritage Inn"];
  const hotels = Array.from({ length: 4 }, (_, i) => ({
    id: `HOTEL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    name: `${hotelNames[i % hotelNames.length]} ${destination}`,
    rating: Math.floor(Math.random() * 2) + 3,
    pricePerNight: Math.floor(Math.random() * 8000) + 3000,
    image: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80`
  }));

  res.json(hotels);
});

/* =============================
   SERVER START
============================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});