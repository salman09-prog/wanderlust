import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    category: { type: String, required: true },
    detailDescription: String,
    highlights: [String],
    bestTimeToVisit: String,
    thingsToDo: [String],
    howToReach: String,
    latitude: Number,
    longitude: Number,
    suitableFor: String,
});

export default mongoose.model("Tour", tourSchema);
