import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  sessionId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: false },
  flightId: String,
  hotelId: String,
  hotelName: String,
  guests: { type: Number, required: true, default: 1 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amount: Number,
  email: String,
  status: { type: String, default: 'pending', enum: ['pending', 'paid', 'cancelled'] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Booking", bookingSchema);
