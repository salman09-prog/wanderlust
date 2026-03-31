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
app.use(cors({ origin: 'https://your-frontend-url.vercel.app' }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);

/* =============================
   MongoDB Connection
============================= */
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51PxyZ1PxyZ");

/* =============================
   CREATE CHECKOUT SESSION
============================= */
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
    
    // Total price requested
    let totalPrice = amount;
    
    // Points Logic
    let discount = 0;
    let usedPoints = 0;
    const earnedPoints = Math.floor(totalPrice * 0.05); // Earn 5% back

    if (applyPoints && userId) {
      const user = await User.findById(userId);
      if (user && user.wanderlustPoints > 0) {
        // Max discount is 50% of the trip value
        const maxDiscount = Math.floor(totalPrice * 0.5);
        usedPoints = Math.min(user.wanderlustPoints, maxDiscount);
        discount = usedPoints; // 1 point = 1 INR discount
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
            unit_amount: Math.round(finalAmountPerGuest * 100), // INR paise
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

      success_url:
        "http://localhost:8080/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:8080/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
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

    const newBooking = await Booking.create({
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

    // Update User Points and Tier
    const usedPoints = parseInt(session.metadata.usedPoints || "0");
    const earnedPoints = parseInt(session.metadata.earnedPoints || "0");
    const userId = session.metadata.userId;

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.wanderlustPoints = Math.max(0, user.wanderlustPoints - usedPoints + earnedPoints);
        
        // Recalculate Tier
        if (user.wanderlustPoints >= 5000) user.loyaltyTier = 'Voyager';
        else if (user.wanderlustPoints >= 2000) user.loyaltyTier = 'Adventurer';
        else user.loyaltyTier = 'Explorer';

        await user.save();
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking save failed" });
  }
});

/* =============================
   GET BOOKINGS BY USER
============================= */
app.get("/bookings/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('tourId').sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/* =============================
   GET ALL BOOKINGS
============================= */
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('tourId').populate('userId').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/* =============================
   FLIGHT SEARCH MOCK API
============================= */
app.get("/api/flights/search", (req, res) => {
  const { origin, destination, date } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required" });
  }

  const airlines = ["Air India", "IndiGo", "SpiceJet", "Vistara", "Akasa Air"];
  const flights = [];
  const numFlights = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const price = Math.floor(Math.random() * 10000) + 3000;

    const d = new Date(date || new Date());
    d.setHours(Math.floor(Math.random() * 14) + 6);

    const durationHours = Math.floor(Math.random() * 3) + 2;
    const a = new Date(d);
    a.setHours(d.getHours() + durationHours);
    const addedMins = Math.floor(Math.random() * 60);
    a.setMinutes(d.getMinutes() + addedMins);

    flights.push({
      id: `FL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      airline,
      origin,
      destination,
      departureTime: d.toISOString(),
      arrivalTime: a.toISOString(),
      duration: `${durationHours}h ${addedMins}m`,
      price
    });
  }

  flights.sort((a, b) => a.price - b.price);

  setTimeout(() => {
    res.json(flights);
  }, 1000);
});

/* =============================
   HOTEL SEARCH MOCK API
============================= */
app.get("/api/hotels/search", (req, res) => {
  const { destination, checkIn, checkOut } = req.query;

  if (!destination) {
    return res.status(400).json({ error: "Destination is required" });
  }

  const basePrice = Math.floor(Math.random() * 8000) + 3000;
  const numHotels = Math.floor(Math.random() * 4) + 3;
  const hotels = [];
  
  const hotelNames = ["Grand Palace", "Oceanview Resort", "City Center Stay", "Heritage Inn", "Paradise Heights", "Sunset Lodge"];
  const facilities = [
    { name: "Pool", icon: "Waves" },
    { name: "Spa", icon: "Leaf" },
    { name: "Gym", icon: "Dumbbell" },
    { name: "Free WiFi", icon: "Wifi" },
    { name: "Restaurant", icon: "Utensils" },
  ];

  const hotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40eb591394?w=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&fit=crop&q=80",
  ];
  // Fisher-Yates shuffle so every hotel gets a unique image
  for (let s = hotelImages.length - 1; s > 0; s--) {
    const j = Math.floor(Math.random() * (s + 1));
    [hotelImages[s], hotelImages[j]] = [hotelImages[j], hotelImages[s]];
  }

  for(let i=0; i<numHotels; i++) {
    const isPremium = Math.random() > 0.5;
    const rating = isPremium ? Math.floor(Math.random() * 2) + 4 : Math.floor(Math.random() * 2) + 3;
    const p = isPremium ? basePrice * 1.5 : basePrice * 0.8;
    
    const shuffled = facilities.sort(() => 0.5 - Math.random());
    const amenities = shuffled.slice(0, Math.floor(Math.random() * 3) + 2);

    hotels.push({
      id: `HOTEL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name: `${hotelNames[Math.floor(Math.random() * hotelNames.length)]} ${destination}`,
      rating,
      pricePerNight: Math.floor(p),
      amenities,
      image: hotelImages[i]   // every hotel gets a distinct shuffled image
    });
  }

  setTimeout(() => {
    res.json(hotels);
  }, 1000);
});


app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});